"""HTTP server: website chat widget, WhatsApp Cloud API webhook, client dashboards and admin API.

Run:  uvicorn app:app --host 0.0.0.0 --port 8000
"""
import csv
import hashlib
import hmac
import io
import json
import os
import secrets
import urllib.request
from pathlib import Path

from fastapi import BackgroundTasks, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, PlainTextResponse, Response
from pydantic import BaseModel, Field

from agent import ReceptionistAgent
from db import Store

HERE = Path(__file__).parent
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")
WA_VERIFY_TOKEN = os.environ.get("WHATSAPP_VERIFY_TOKEN", "")
WA_APP_SECRET = os.environ.get("WHATSAPP_APP_SECRET", "")
GRAPH = "https://graph.facebook.com/v21.0"

store = Store()


def send_whatsapp(cfg: dict, to: str, body: str) -> None:
    wa = cfg.get("whatsapp") or {}
    token = os.environ.get(wa.get("access_token_env", ""), "")
    if not (wa.get("phone_number_id") and token and to):
        print(f"[whatsapp disabled for {cfg.get('business_name')}] to {to}: {body}")
        return
    req = urllib.request.Request(
        f"{GRAPH}/{wa['phone_number_id']}/messages",
        data=json.dumps({"messaging_product": "whatsapp", "to": to, "type": "text",
                         "text": {"body": body[:4000]}}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        urllib.request.urlopen(req, timeout=15).read()
    except Exception as e:  # never crash the chat because a notification failed
        print(f"WhatsApp send failed: {e}")


def notify_owner(cfg: dict, text: str) -> None:
    print(f"[owner alert] {cfg.get('business_name')}: {text}")
    if cfg.get("owner_whatsapp"):
        send_whatsapp(cfg, cfg["owner_whatsapp"], text)


agent = ReceptionistAgent(store, notify_owner=notify_owner)

app = FastAPI(title="LeadDesk AI")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["GET", "POST"], allow_headers=["*"])


def _load_sample_tenants() -> None:
    for f in (HERE / "tenants").glob("*.json"):
        if store.get_tenant(f.stem) is None:
            store.upsert_tenant(f.stem, json.loads(f.read_text()))


_load_sample_tenants()


# ---- website chat ------------------------------------------------------------
class ChatIn(BaseModel):
    session_id: str = Field(min_length=6, max_length=64)
    message: str = Field(min_length=1, max_length=2000)


@app.post("/api/chat/{tenant_id}")
def chat(tenant_id: str, body: ChatIn):
    cfg = store.get_tenant(tenant_id)
    if cfg is None:
        raise HTTPException(404, "Unknown business")
    _, handoff = store.get_conversation(tenant_id, "web:" + body.session_id)
    reply = agent.reply(tenant_id, "web:" + body.session_id, body.message, channel="web")
    return {"reply": reply, "handoff": handoff}


@app.get("/widget.js")
def widget_js():
    return Response((HERE / "static" / "widget.js").read_text(), media_type="application/javascript")


@app.get("/demo/{tenant_id}", response_class=HTMLResponse)
def demo_page(tenant_id: str):
    cfg = store.get_tenant(tenant_id)
    if cfg is None:
        raise HTTPException(404)
    return f"""<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{cfg['business_name']} - demo</title></head>
<body style="font-family:system-ui;max-width:640px;margin:40px auto;padding:0 16px">
<h1>{cfg['business_name']}</h1><p>This is a demo page. Click the chat bubble in the corner and talk to the AI receptionist.</p>
<script src="/widget.js" data-tenant="{tenant_id}" data-title="{cfg.get('assistant_name', 'Chat with us')}"
 data-color="{cfg.get('brand_color', '#0f766e')}" data-greeting="{cfg.get('greeting', 'Hi! How can I help you today?')}"></script>
</body></html>"""


# ---- WhatsApp Cloud API ---------------------------------------------------------
@app.get("/webhook/whatsapp")
def wa_verify(request: Request):
    q = request.query_params
    if WA_VERIFY_TOKEN and q.get("hub.mode") == "subscribe" and q.get("hub.verify_token") == WA_VERIFY_TOKEN:
        return PlainTextResponse(q.get("hub.challenge", ""))
    raise HTTPException(403)


def _handle_wa_message(phone_number_id: str, sender: str, text: str) -> None:
    found = store.find_tenant_by_whatsapp(phone_number_id)
    if not found:
        print(f"No tenant for WhatsApp number {phone_number_id}")
        return
    tenant_id, cfg = found
    session = "wa:" + sender
    _, handoff = store.get_conversation(tenant_id, session)
    if handoff and text.strip().lower() not in ("bot", "restart"):
        return  # a human has taken over this chat; stay quiet
    if handoff:
        history, _ = store.get_conversation(tenant_id, session)
        store.save_conversation(tenant_id, session, "whatsapp", history, handoff=False)
    reply = agent.reply(tenant_id, session, text, channel="whatsapp")
    send_whatsapp(cfg, sender, reply)


@app.post("/webhook/whatsapp")
async def wa_incoming(request: Request, background: BackgroundTasks,
                      x_hub_signature_256: str | None = Header(default=None)):
    raw = await request.body()
    if WA_APP_SECRET:
        expected = "sha256=" + hmac.new(WA_APP_SECRET.encode(), raw, hashlib.sha256).hexdigest()
        if not x_hub_signature_256 or not hmac.compare_digest(expected, x_hub_signature_256):
            raise HTTPException(401)
    payload = json.loads(raw or b"{}")
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            pnid = value.get("metadata", {}).get("phone_number_id", "")
            for msg in value.get("messages", []):
                if msg.get("type") == "text":
                    background.add_task(_handle_wa_message, pnid, msg["from"], msg["text"]["body"])
                else:
                    background.add_task(_handle_wa_message, pnid, msg["from"],
                                        f"[customer sent a {msg.get('type')} message that you cannot view]")
    return {"ok": True}


# ---- client dashboard (each paying business sees only its own data) ------------------
def _auth_tenant(tenant_id: str, key: str) -> dict:
    cfg = store.get_tenant(tenant_id)
    ok = cfg is not None and (
        (cfg.get("dashboard_key") and hmac.compare_digest(key, cfg["dashboard_key"]))
        or (ADMIN_KEY and hmac.compare_digest(key, ADMIN_KEY)))
    if not ok:
        raise HTTPException(403, "Wrong key")
    return cfg


@app.get("/dashboard/{tenant_id}", response_class=HTMLResponse)
def dashboard(tenant_id: str):
    return (HERE / "static" / "dashboard.html").read_text()


@app.get("/api/dashboard/{tenant_id}")
def dashboard_data(tenant_id: str, key: str):
    cfg = _auth_tenant(tenant_id, key)
    return {
        "business_name": cfg["business_name"],
        "leads": store.leads(tenant_id),
        "bookings": store.bookings(tenant_id),
        "conversations": store.recent_conversations(tenant_id),
        "usage": store.usage(tenant_id),
    }


@app.get("/api/dashboard/{tenant_id}/leads.csv")
def leads_csv(tenant_id: str, key: str):
    _auth_tenant(tenant_id, key)
    rows = store.leads(tenant_id)
    buf = io.StringIO()
    cols = ["created_at", "name", "phone", "email", "interest", "budget", "timeline", "score", "notes"]
    w = csv.DictWriter(buf, fieldnames=cols, extrasaction="ignore")
    w.writeheader()
    w.writerows(rows)
    return Response(buf.getvalue(), media_type="text/csv",
                    headers={"Content-Disposition": f'attachment; filename="{tenant_id}-leads.csv"'})


@app.post("/api/dashboard/{tenant_id}/release/{session_id}")
def release_handoff(tenant_id: str, session_id: str, key: str):
    """Owner finished talking to the customer; let the AI take the chat back."""
    _auth_tenant(tenant_id, key)
    history, _ = store.get_conversation(tenant_id, session_id)
    store.save_conversation(tenant_id, session_id, session_id.split(":")[0], history, handoff=False)
    return {"ok": True}


# ---- admin API (you, the seller) ------------------------------------------------
def _admin(key: str | None):
    if not ADMIN_KEY or not key or not hmac.compare_digest(key, ADMIN_KEY):
        raise HTTPException(403)


@app.get("/api/admin/tenants")
def admin_list(x_admin_key: str | None = Header(default=None)):
    _admin(x_admin_key)
    return [{**t, "replies_this_month": store.replies_this_month(t["id"])} for t in store.list_tenants()]


@app.post("/api/admin/tenants/{tenant_id}")
def admin_upsert(tenant_id: str, config: dict, x_admin_key: str | None = Header(default=None)):
    _admin(x_admin_key)
    if "business_name" not in config:
        raise HTTPException(400, "business_name is required")
    config.setdefault("dashboard_key", secrets.token_urlsafe(16))
    store.upsert_tenant(tenant_id, config)
    return {"ok": True, "dashboard": f"/dashboard/{tenant_id}?key={config['dashboard_key']}",
            "demo": f"/demo/{tenant_id}"}


@app.post("/api/admin/tenants/{tenant_id}/active/{active}")
def admin_active(tenant_id: str, active: bool, x_admin_key: str | None = Header(default=None)):
    """Pause a client who hasn't paid (active=false) and resume them later."""
    _admin(x_admin_key)
    store.set_active(tenant_id, active)
    return {"ok": True}


@app.get("/health")
def health():
    return {"ok": True}
