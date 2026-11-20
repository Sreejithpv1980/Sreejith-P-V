"""Offline tests: a fake Claude client drives the agent through a lead capture + booking flow."""
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from anthropic.types.beta import BetaMessage  # noqa: E402

from agent import ReceptionistAgent, free_slots  # noqa: E402
from db import Store  # noqa: E402

CFG = json.loads((Path(__file__).resolve().parent.parent / "tenants" / "demo-clinic.json").read_text())


def msg(stop, blocks):
    return BetaMessage.model_validate({
        "id": "msg_x", "type": "message", "role": "assistant", "model": "claude-opus-5-5",
        "stop_reason": stop, "stop_sequence": None, "content": blocks,
        "usage": {"input_tokens": 100, "output_tokens": 20, "cache_read_input_tokens": 900},
    })


class FakeMessages:
    def __init__(self, script):
        self.script, self.calls = list(script), []

    def create(self, **kw):
        self.calls.append(kw)
        return self.script.pop(0)


class FakeClient:
    def __init__(self, script):
        self.beta = type("B", (), {})()
        self.beta.messages = FakeMessages(script)


def next_open_day():
    tz = ZoneInfo("Asia/Kolkata")
    d = datetime.now(tz).date() + timedelta(days=1)
    while d.weekday() == 6:  # clinic closed Sunday
        d += timedelta(days=1)
    return d.isoformat()


def make(tmp_path, script):
    store = Store(str(tmp_path / "t.db"))
    store.upsert_tenant("demo", CFG)
    alerts = []
    agent = ReceptionistAgent(store, FakeClient(script), notify_owner=lambda c, t: alerts.append(t))
    return store, agent, alerts


def test_free_slots_respects_hours_and_bookings():
    day = next_open_day()
    now = datetime.now(ZoneInfo("Asia/Kolkata"))
    slots = free_slots(CFG, set(), day, now)
    assert slots[0] == f"{day} 10:00"
    assert f"{day} 10:30" not in free_slots(CFG, {f"{day} 10:30"}, day, now)
    sunday = datetime.now().date()
    while sunday.weekday() != 6:
        sunday += timedelta(days=1)
    assert free_slots(CFG, set(), sunday.isoformat(), now) == []


def test_lead_and_booking_flow(tmp_path):
    day = next_open_day()
    slot = f"{day} 11:00"
    script = [
        msg("tool_use", [
            {"type": "text", "text": "Let me check."},
            {"type": "tool_use", "id": "t1", "name": "save_lead", "input": {
                "name": "Ravi", "phone": "9876543210", "email": "", "interest": "root canal",
                "budget": "", "timeline": "this week", "score": "warm", "notes": ""}},
            {"type": "tool_use", "id": "t2", "name": "check_availability", "input": {"date": day}},
        ]),
        msg("end_turn", [{"type": "text", "text": "11:00 tomorrow is free. Shall I book it?"}]),
        msg("tool_use", [{"type": "tool_use", "id": "t3", "name": "book_appointment", "input": {
            "name": "Ravi", "phone": "9876543210", "slot": slot, "service": "Root canal consultation"}}]),
        msg("end_turn", [{"type": "text", "text": "Done! See you at 11:00."}]),
    ]
    store, agent, alerts = make(tmp_path, script)

    r1 = agent.reply("demo", "web:abc123", "Hi I'm Ravi 9876543210, need root canal this week")
    assert "11:00" in r1
    r2 = agent.reply("demo", "web:abc123", "yes book it")
    assert r2 == "Done! See you at 11:00."

    leads = store.leads("demo")
    assert len(leads) == 1 and leads[0]["name"] == "Ravi" and leads[0]["score"] == "hot"
    assert [b["slot"] for b in store.bookings("demo")] == [slot]
    assert any("New booking" in a for a in alerts)

    # second turn replayed the full history, tool results paired with tool_use ids
    calls = agent.client.beta.messages.calls
    sent = calls[2]["messages"]
    assert sent[0]["role"] == "user" and sent[1]["role"] == "assistant"
    assert {b["tool_use_id"] for b in sent[2]["content"]} == {"t1", "t2"}
    # system prompt is cached and carries business knowledge
    assert calls[0]["system"][0]["cache_control"] == {"type": "ephemeral"}
    assert "SmileCare" in calls[0]["system"][0]["text"]
    assert store.usage("demo")[0]["replies"] == 2


def test_double_booking_rejected(tmp_path):
    day = next_open_day()
    slot = f"{day} 12:00"
    book = {"type": "tool_use", "id": "b", "name": "book_appointment",
            "input": {"name": "A", "phone": "1", "slot": slot, "service": "x"}}
    script = [msg("tool_use", [book]), msg("end_turn", [{"type": "text", "text": "ok"}]),
              msg("tool_use", [book]), msg("end_turn", [{"type": "text", "text": "taken"}])]
    store, agent, _ = make(tmp_path, script)
    agent.reply("demo", "web:s1aaaa", "book")
    agent.reply("demo", "web:s2bbbb", "book")
    assert len(store.bookings("demo")) == 1
    last_results = agent.client.beta.messages.calls[3]["messages"][-2]["content"]
    assert last_results[0]["is_error"] is True


def test_handoff_and_refusal(tmp_path):
    script = [
        msg("tool_use", [{"type": "tool_use", "id": "h", "name": "handoff_to_human", "input": {"reason": "angry"}}]),
        msg("end_turn", [{"type": "text", "text": "Our team will call you."}]),
        msg("refusal", []),
    ]
    store, agent, alerts = make(tmp_path, script)
    agent.reply("demo", "wa:9199", "I want to talk to a person!")
    assert store.get_conversation("demo", "wa:9199")[1] is True
    assert any("needs you" in a for a in alerts)
    assert "team" in agent.reply("demo", "wa:9200", "something")


def test_monthly_limit(tmp_path):
    store, agent, _ = make(tmp_path, [])
    cfg = dict(CFG, monthly_reply_limit=1)
    store.upsert_tenant("demo", cfg)
    store.add_usage("demo", 1, 1)
    assert "team" in agent.reply("demo", "web:zzzzzz", "hi").lower()
