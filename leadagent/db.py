"""SQLite storage for tenants (your paying clients), conversations, leads and bookings."""
import json
import os
import sqlite3
import threading
from datetime import datetime, timezone

DB_PATH = os.environ.get("LEADAGENT_DB", os.path.join(os.path.dirname(__file__), "leadagent.db"))
_lock = threading.Lock()


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def connect(path: str | None = None) -> sqlite3.Connection:
    conn = sqlite3.connect(path or DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS tenants (
            id TEXT PRIMARY KEY,
            config TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS conversations (
            tenant_id TEXT NOT NULL,
            session_id TEXT NOT NULL,
            channel TEXT NOT NULL,
            messages TEXT NOT NULL,
            handoff INTEGER NOT NULL DEFAULT 0,
            updated_at TEXT NOT NULL,
            PRIMARY KEY (tenant_id, session_id)
        );
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tenant_id TEXT NOT NULL,
            session_id TEXT NOT NULL,
            name TEXT, phone TEXT, email TEXT,
            interest TEXT, budget TEXT, timeline TEXT,
            score TEXT, notes TEXT,
            created_at TEXT NOT NULL,
            UNIQUE (tenant_id, session_id)
        );
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tenant_id TEXT NOT NULL,
            session_id TEXT NOT NULL,
            name TEXT, phone TEXT,
            slot TEXT NOT NULL, service TEXT,
            created_at TEXT NOT NULL,
            UNIQUE (tenant_id, slot)
        );
        CREATE TABLE IF NOT EXISTS usage (
            tenant_id TEXT NOT NULL,
            month TEXT NOT NULL,
            replies INTEGER NOT NULL DEFAULT 0,
            input_tokens INTEGER NOT NULL DEFAULT 0,
            output_tokens INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (tenant_id, month)
        );
        """
    )
    return conn


class Store:
    def __init__(self, path: str | None = None):
        self.conn = connect(path)

    # ---- tenants -------------------------------------------------------
    def upsert_tenant(self, tenant_id: str, config: dict) -> None:
        with _lock, self.conn:
            self.conn.execute(
                "INSERT INTO tenants (id, config, created_at) VALUES (?, ?, ?) "
                "ON CONFLICT(id) DO UPDATE SET config = excluded.config",
                (tenant_id, json.dumps(config), now()),
            )

    def get_tenant(self, tenant_id: str) -> dict | None:
        row = self.conn.execute(
            "SELECT config FROM tenants WHERE id = ? AND active = 1", (tenant_id,)
        ).fetchone()
        return json.loads(row["config"]) if row else None

    def find_tenant_by_whatsapp(self, phone_number_id: str) -> tuple[str, dict] | None:
        for row in self.conn.execute("SELECT id, config FROM tenants WHERE active = 1"):
            cfg = json.loads(row["config"])
            if cfg.get("whatsapp", {}).get("phone_number_id") == phone_number_id:
                return row["id"], cfg
        return None

    def list_tenants(self) -> list[dict]:
        return [
            {"id": r["id"], "name": json.loads(r["config"]).get("business_name"), "active": r["active"]}
            for r in self.conn.execute("SELECT id, config, active FROM tenants ORDER BY id")
        ]

    def set_active(self, tenant_id: str, active: bool) -> None:
        with _lock, self.conn:
            self.conn.execute("UPDATE tenants SET active = ? WHERE id = ?", (int(active), tenant_id))

    # ---- conversations ---------------------------------------------------
    def get_conversation(self, tenant_id: str, session_id: str) -> tuple[list, bool]:
        row = self.conn.execute(
            "SELECT messages, handoff FROM conversations WHERE tenant_id = ? AND session_id = ?",
            (tenant_id, session_id),
        ).fetchone()
        if not row:
            return [], False
        return json.loads(row["messages"]), bool(row["handoff"])

    def save_conversation(self, tenant_id, session_id, channel, messages, handoff=False) -> None:
        with _lock, self.conn:
            self.conn.execute(
                "INSERT INTO conversations (tenant_id, session_id, channel, messages, handoff, updated_at) "
                "VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(tenant_id, session_id) DO UPDATE SET "
                "messages = excluded.messages, handoff = excluded.handoff, updated_at = excluded.updated_at",
                (tenant_id, session_id, channel, json.dumps(messages), int(handoff), now()),
            )

    def recent_conversations(self, tenant_id: str, limit: int = 50) -> list[dict]:
        rows = self.conn.execute(
            "SELECT session_id, channel, messages, handoff, updated_at FROM conversations "
            "WHERE tenant_id = ? ORDER BY updated_at DESC LIMIT ?",
            (tenant_id, limit),
        ).fetchall()
        out = []
        for r in rows:
            transcript = []
            for m in json.loads(r["messages"]):
                text = _visible_text(m)
                if text:
                    transcript.append({"role": m["role"], "text": text})
            out.append({**{k: r[k] for k in ("session_id", "channel", "handoff", "updated_at")}, "transcript": transcript})
        return out

    # ---- leads & bookings -----------------------------------------------
    def save_lead(self, tenant_id: str, session_id: str, **fields) -> None:
        cols = ["name", "phone", "email", "interest", "budget", "timeline", "score", "notes"]
        vals = [fields.get(c) for c in cols]
        with _lock, self.conn:
            existing = self.conn.execute(
                "SELECT * FROM leads WHERE tenant_id = ? AND session_id = ?", (tenant_id, session_id)
            ).fetchone()
            if existing:
                # Merge: keep earlier values when the new call leaves a field empty.
                merged = [v if v not in (None, "") else existing[c] for c, v in zip(cols, vals)]
                self.conn.execute(
                    f"UPDATE leads SET {', '.join(c + ' = ?' for c in cols)} WHERE id = ?",
                    (*merged, existing["id"]),
                )
            else:
                self.conn.execute(
                    f"INSERT INTO leads (tenant_id, session_id, {', '.join(cols)}, created_at) "
                    f"VALUES (?, ?, {', '.join('?' * len(cols))}, ?)",
                    (tenant_id, session_id, *vals, now()),
                )

    def leads(self, tenant_id: str, since: str | None = None) -> list[dict]:
        q, args = "SELECT * FROM leads WHERE tenant_id = ?", [tenant_id]
        if since:
            q += " AND created_at >= ?"
            args.append(since)
        return [dict(r) for r in self.conn.execute(q + " ORDER BY created_at DESC", args)]

    def booked_slots(self, tenant_id: str) -> set[str]:
        return {r["slot"] for r in self.conn.execute("SELECT slot FROM bookings WHERE tenant_id = ?", (tenant_id,))}

    def book(self, tenant_id, session_id, name, phone, slot, service) -> bool:
        try:
            with _lock, self.conn:
                self.conn.execute(
                    "INSERT INTO bookings (tenant_id, session_id, name, phone, slot, service, created_at) "
                    "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (tenant_id, session_id, name, phone, slot, service, now()),
                )
            return True
        except sqlite3.IntegrityError:
            return False

    def bookings(self, tenant_id: str) -> list[dict]:
        return [dict(r) for r in self.conn.execute(
            "SELECT * FROM bookings WHERE tenant_id = ? ORDER BY slot", (tenant_id,))]

    # ---- usage (for billing / cost control) -------------------------------
    def add_usage(self, tenant_id: str, input_tokens: int, output_tokens: int) -> None:
        month = datetime.now(timezone.utc).strftime("%Y-%m")
        with _lock, self.conn:
            self.conn.execute(
                "INSERT INTO usage (tenant_id, month, replies, input_tokens, output_tokens) VALUES (?, ?, 1, ?, ?) "
                "ON CONFLICT(tenant_id, month) DO UPDATE SET replies = replies + 1, "
                "input_tokens = input_tokens + excluded.input_tokens, output_tokens = output_tokens + excluded.output_tokens",
                (tenant_id, month, input_tokens, output_tokens),
            )

    def usage(self, tenant_id: str) -> list[dict]:
        return [dict(r) for r in self.conn.execute(
            "SELECT * FROM usage WHERE tenant_id = ? ORDER BY month DESC", (tenant_id,))]

    def replies_this_month(self, tenant_id: str) -> int:
        month = datetime.now(timezone.utc).strftime("%Y-%m")
        row = self.conn.execute(
            "SELECT replies FROM usage WHERE tenant_id = ? AND month = ?", (tenant_id, month)).fetchone()
        return row["replies"] if row else 0


def _visible_text(message: dict) -> str:
    content = message.get("content")
    if isinstance(content, str):
        return content
    parts = [b.get("text", "") for b in content or [] if isinstance(b, dict) and b.get("type") == "text"]
    return "\n".join(p for p in parts if p)
