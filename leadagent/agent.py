"""The AI receptionist: answers questions, qualifies leads, books appointments, hands off to a human.

One agent serves many businesses ("tenants"). Each tenant's business knowledge lives in its
JSON config, so onboarding a new paying client is filling in one file, not writing code.
"""
import os
from datetime import datetime, timedelta
from typing import Callable
from zoneinfo import ZoneInfo

import anthropic

from db import Store

MODEL = os.environ.get("LEADAGENT_MODEL", "claude-opus-5-5")
EFFORT = os.environ.get("LEADAGENT_EFFORT", "low")  # chat replies: low effort keeps cost and latency down
MAX_TOOL_ROUNDS = 6
HISTORY_LIMIT = 40  # messages kept per conversation to bound cost
DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

FALLBACK_REPLY = "Sorry, I can't help with that here. Our team will get back to you shortly."

TOOLS = [
    {
        "name": "save_lead",
        "description": (
            "Save or update what you have learned about this customer. Call it as soon as you learn "
            "their name or phone number, and again whenever you learn more. Use an empty string for "
            "anything you don't know yet. score: 'hot' = ready to buy/book soon, 'warm' = interested, "
            "'cold' = just browsing."
        ),
        "strict": True,
        "input_schema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["name", "phone", "email", "interest", "budget", "timeline", "score", "notes"],
            "properties": {
                "name": {"type": "string"},
                "phone": {"type": "string"},
                "email": {"type": "string"},
                "interest": {"type": "string", "description": "What product/service they want"},
                "budget": {"type": "string"},
                "timeline": {"type": "string", "description": "When they want it"},
                "score": {"type": "string", "enum": ["hot", "warm", "cold"]},
                "notes": {"type": "string", "description": "Anything the owner should know before calling"},
            },
        },
    },
    {
        "name": "check_availability",
        "description": "List free appointment slots on a date (YYYY-MM-DD, business local time).",
        "strict": True,
        "input_schema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["date"],
            "properties": {"date": {"type": "string", "description": "YYYY-MM-DD"}},
        },
    },
    {
        "name": "book_appointment",
        "description": (
            "Book a slot returned by check_availability. Only call after the customer has confirmed "
            "the slot and given their name and phone number."
        ),
        "strict": True,
        "input_schema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["name", "phone", "slot", "service"],
            "properties": {
                "name": {"type": "string"},
                "phone": {"type": "string"},
                "slot": {"type": "string", "description": "Exactly as returned, e.g. 2026-11-21 10:30"},
                "service": {"type": "string"},
            },
        },
    },
    {
        "name": "handoff_to_human",
        "description": (
            "Alert the business owner to take over. Use when the customer asks for a human, is upset, "
            "has a complaint, asks something you cannot answer from the business info, or wants a "
            "custom price/discount."
        ),
        "strict": True,
        "input_schema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["reason"],
            "properties": {"reason": {"type": "string"}},
        },
    },
]


def build_system_prompt(cfg: dict) -> str:
    """Stable per tenant, so it is cached across every conversation for that business."""
    faq = "\n".join(f"Q: {f['q']}\nA: {f['a']}" for f in cfg.get("faqs", []))
    services = "\n".join(
        f"- {s['name']}: {s.get('price', 'ask')}" + (f" ({s['details']})" if s.get("details") else "")
        for s in cfg.get("services", [])
    )
    hours = ", ".join(f"{d.title()} {h[0]}-{h[1]}" for d, h in cfg.get("hours", {}).items() if h) or "not set"
    return f"""You are {cfg.get('assistant_name', 'the assistant')}, the front-desk assistant for {cfg['business_name']}, a {cfg.get('business_type', 'business')} in {cfg.get('city', 'India')}.
You chat with customers on WhatsApp and the website. Your goals, in order:
1. Answer their questions accurately using only the business information below.
2. Learn their name, phone number, what they need, budget and timeline, naturally over the conversation - never as an interrogation. Save it with save_lead.
3. When they are interested, offer a booking: check_availability, let them pick, then book_appointment.
4. Hand off to a human (handoff_to_human) when the rules below say so.

Style: warm, short messages (1-3 sentences, chat style, no markdown headings). Reply in the language the customer uses (English, Hindi, Hinglish, Malayalam, Tamil, etc.). Use Indian formats (₹, DD Mon).
Never invent prices, offers, medical/legal/financial advice or facts not in the business information. If unsure, say a team member will confirm and hand off.
{cfg.get('extra_instructions', '')}

## Business information
Name: {cfg['business_name']}
Address: {cfg.get('address', 'ask the team')}
Phone: {cfg.get('owner_phone_public', 'ask the team')}
Hours: {hours}
Appointment length: {cfg.get('slot_minutes', 30)} minutes

Services and prices:
{services or '- ask the team'}

FAQs:
{faq or '(none)'}
"""


def free_slots(cfg: dict, booked: set[str], date_str: str, now: datetime) -> list[str]:
    try:
        day = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return []
    hours = cfg.get("hours", {}).get(DAYS[day.weekday()])
    if not hours:
        return []
    tz = ZoneInfo(cfg.get("timezone", "Asia/Kolkata"))
    step = timedelta(minutes=int(cfg.get("slot_minutes", 30)))
    start = datetime.strptime(f"{date_str} {hours[0]}", "%Y-%m-%d %H:%M").replace(tzinfo=tz)
    end = datetime.strptime(f"{date_str} {hours[1]}", "%Y-%m-%d %H:%M").replace(tzinfo=tz)
    slots, t = [], start
    while t + step <= end:
        label = t.strftime("%Y-%m-%d %H:%M")
        if t > now and label not in booked:
            slots.append(label)
        t += step
    return slots


class ReceptionistAgent:
    def __init__(self, store: Store, client: anthropic.Anthropic | None = None,
                 notify_owner: Callable[[dict, str], None] | None = None):
        self.store = store
        self.client = client or anthropic.Anthropic()
        self.notify_owner = notify_owner or (lambda cfg, text: print(f"[owner alert] {text}"))

    # ---- tools -------------------------------------------------------------
    def _run_tool(self, tenant_id: str, cfg: dict, session_id: str, name: str, args: dict) -> tuple[str, bool]:
        tz = ZoneInfo(cfg.get("timezone", "Asia/Kolkata"))
        if name == "save_lead":
            self.store.save_lead(tenant_id, session_id, **args)
            if args.get("score") == "hot":
                self.notify_owner(cfg, f"🔥 Hot lead: {args.get('name') or 'unknown'} {args.get('phone')} - "
                                       f"{args.get('interest')} ({args.get('timeline')}). {args.get('notes')}")
            return "saved", False
        if name == "check_availability":
            slots = free_slots(cfg, self.store.booked_slots(tenant_id), args["date"], datetime.now(tz))
            return ("Free slots: " + ", ".join(slots)) if slots else "No free slots that day (closed or full).", False
        if name == "book_appointment":
            date_part = args["slot"][:10]
            if args["slot"] not in free_slots(cfg, self.store.booked_slots(tenant_id), date_part, datetime.now(tz)):
                return "That slot is not available. Check availability again.", True
            if not self.store.book(tenant_id, session_id, args["name"], args["phone"], args["slot"], args["service"]):
                return "That slot was just taken. Check availability again.", True
            self.store.save_lead(tenant_id, session_id, name=args["name"], phone=args["phone"],
                                 interest=args["service"], score="hot")
            self.notify_owner(cfg, f"📅 New booking: {args['name']} {args['phone']} - {args['service']} at {args['slot']}")
            return f"Booked {args['service']} at {args['slot']}.", False
        if name == "handoff_to_human":
            self.notify_owner(cfg, f"🙋 Customer needs you (chat {session_id}): {args['reason']}")
            return "Owner alerted. Tell the customer a team member will reply shortly.", False
        return f"Unknown tool {name}", True

    # ---- main entry --------------------------------------------------------
    def reply(self, tenant_id: str, session_id: str, text: str, channel: str = "web") -> str:
        cfg = self.store.get_tenant(tenant_id)
        if cfg is None:
            raise KeyError(tenant_id)

        history, handoff = self.store.get_conversation(tenant_id, session_id)
        limit = cfg.get("monthly_reply_limit")
        if limit and self.store.replies_this_month(tenant_id) >= limit:
            return cfg.get("over_limit_message", "Thanks! Our team will reply to you shortly.")

        tz = ZoneInfo(cfg.get("timezone", "Asia/Kolkata"))
        stamp = datetime.now(tz).strftime("%A %d %b %Y, %H:%M")
        messages = _trim(history) + [{
            "role": "user",
            "content": [
                {"type": "text", "text": f"[{channel} message, local time {stamp}]"},
                {"type": "text", "text": text},
            ],
        }]
        system = [{"type": "text", "text": build_system_prompt(cfg), "cache_control": {"type": "ephemeral"}}]

        reply_text = FALLBACK_REPLY
        in_tok = out_tok = 0
        for _ in range(MAX_TOOL_ROUNDS):
            try:
                response = self.client.beta.messages.create(
                    model=MODEL,
                    max_tokens=4000,
                    system=system,
                    tools=TOOLS,
                    messages=messages,
                    output_config={"effort": EFFORT},
                    cache_control={"type": "ephemeral"},  # also cache the growing conversation between tool rounds
                    betas=["server-side-fallback-2026-07-01"],
                    fallbacks="default",  # if a safety classifier declines, the API retries on a fallback model
                )
            except anthropic.APIStatusError as e:
                print(f"Claude API error {e.status_code}: {e.message}")
                break
            except anthropic.APIConnectionError as e:
                print(f"Claude API connection error: {e}")
                break

            in_tok += response.usage.input_tokens + (response.usage.cache_read_input_tokens or 0)
            out_tok += response.usage.output_tokens

            if response.stop_reason == "refusal":
                break  # don't keep the refused turn in history; send the safe fallback reply

            messages.append({"role": "assistant", "content": [b.to_dict() for b in response.content]})

            if response.stop_reason == "tool_use":
                results = []
                for block in response.content:
                    if block.type == "tool_use":
                        out, is_err = self._run_tool(tenant_id, cfg, session_id, block.name, block.input)
                        if block.name == "handoff_to_human":
                            handoff = True
                        results.append({"type": "tool_result", "tool_use_id": block.id,
                                        "content": out, "is_error": is_err})
                messages.append({"role": "user", "content": results})
                continue
            if response.stop_reason == "pause_turn":
                continue

            reply_text = "\n".join(b.text for b in response.content if b.type == "text").strip() or reply_text
            break

        self.store.save_conversation(tenant_id, session_id, channel, messages, handoff)
        self.store.add_usage(tenant_id, in_tok, out_tok)
        return reply_text


def _trim(history: list) -> list:
    """Keep the last HISTORY_LIMIT messages, starting on a plain user turn (not a tool result)."""
    if len(history) <= HISTORY_LIMIT:
        return history
    tail = history[-HISTORY_LIMIT:]
    for i, m in enumerate(tail):
        c = m.get("content")
        if m["role"] == "user" and not (isinstance(c, list) and c and c[0].get("type") == "tool_result"):
            return tail[i:]
    return []
