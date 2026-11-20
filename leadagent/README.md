# LeadDesk AI: a 24/7 AI receptionist you can sell to Indian businesses

LeadDesk AI answers a business's customers on **WhatsApp and the website**, any hour of the day. It:

- **Answers questions** about services, prices, timings and location, using only facts the business gave you
- **Captures leads**: name, phone, what they want, budget and timeline, each scored hot, warm or cold
- **Books appointments** into free slots and never double-books
- **Alerts the owner on WhatsApp** about hot leads, bookings and chats that need a human
- **Hands off to a human** when a customer is upset or asks for one, and the AI stays quiet until the owner releases the chat
- **Replies in the customer's language**: English, Hindi, Hinglish, Malayalam, Tamil and more
- Gives each client a **private dashboard** with leads, bookings, transcripts and a CSV export

One server runs every client you sign up. Adding a client means filling in one JSON file. You don't write any code.

The business plan, pricing and sales scripts for reaching ₹1 lakh a month are in **[BUSINESS_PLAN.md](BUSINESS_PLAN.md)**.

---

## 1. Run it locally (10 minutes)

```bash
cd leadagent
pip install -r requirements.txt
cp .env.example .env            # put your Anthropic API key and an ADMIN_KEY in it
export $(grep -v '^#' .env | xargs)
uvicorn app:app --reload --port 8000
```

Then open:

- `http://localhost:8000/demo/demo-clinic` has the sample dental clinic. Click the chat bubble.
- `http://localhost:8000/dashboard/demo-clinic?key=demo-key-change-me` is that clinic's dashboard.

Run the offline tests, which need no API key:

```bash
python -m pytest -q tests
```

## 2. Add a paying client

1. Copy `tenants/demo-clinic.json` to `tenants/<client-id>.json`.
2. Fill it in from the client's website, Google Business listing and a 15-minute call: services, prices, hours, FAQs and the owner's WhatsApp number.
3. Load it. Either restart the server (new files load on start) or call the admin API:

   ```bash
   curl -X POST https://YOUR-SERVER/api/admin/tenants/<client-id> \
        -H "x-admin-key: $ADMIN_KEY" -H "Content-Type: application/json" \
        -d @tenants/<client-id>.json
   ```

   The response gives the client's private dashboard link.
4. Put the widget on their website with one line, just before `</body>`:

   ```html
   <script src="https://YOUR-SERVER/widget.js" data-tenant="<client-id>"
           data-title="Chat with us" data-color="#0f766e"></script>
   ```

   This works on WordPress, Wix and Shopify, or any site where you can paste HTML.

To pause a client who hasn't paid: `POST /api/admin/tenants/<id>/active/false`. Use `/active/true` to turn them back on.

## 3. Connect WhatsApp (per client)

The agent uses Meta's official **WhatsApp Cloud API**. Unofficial WhatsApp Web bots get numbers banned, so don't use them.

1. On developers.facebook.com, create a Meta app of type Business and add the **WhatsApp** product.
2. Add the client's business phone number. It must not be in use on the normal WhatsApp app. Many clients buy a second SIM for this.
3. Complete **Business Verification** in the client's Meta Business Manager. You need their GST certificate or Udyam certificate plus a utility bill.
4. Under **Configuration → Webhook**, set:
   - Callback URL: `https://YOUR-SERVER/webhook/whatsapp`
   - Verify token: the same value as `WHATSAPP_VERIFY_TOKEN`
   - Subscribe to `messages`
5. Create a **permanent System User token** and put it in an env var such as `WA_TOKEN_SMILECARE`. Then set the client's JSON to:
   `"whatsapp": {"phone_number_id": "<id from Meta>", "access_token_env": "WA_TOKEN_SMILECARE"}`
6. Set `WHATSAPP_APP_SECRET` so the server can verify that webhooks really come from Meta.

Owner alerts are sent from the bot's number to `owner_whatsapp`. WhatsApp only lets a business message someone freely within 24 hours of their last message to it. To keep alerts flowing, ask owners to message the bot number daily, or create an approved template message for alerts.

If an owner wants the AI to take back a chat that was handed to them, they can click **AI can resume** in the dashboard or text `bot` from the customer's chat.

## 4. Deploy

Any server that runs Docker will do: a ₹500–₹1,500/month VPS from DigitalOcean (Bangalore), AWS Lightsail (Mumbai) or Hostinger, or Railway or Render.

```bash
docker build -t leaddesk .
docker run -d --restart always -p 8000:8000 --env-file .env -v leaddesk-data:/data leaddesk
```

Put HTTPS in front of it, which WhatsApp requires. The simplest option is Caddy: `caddy reverse-proxy --from yourdomain.in --to localhost:8000`. Back up `/data/leadagent.db` daily.

## 5. Costs and limits

- **Claude model.** The default is `claude-opus-5-5` at low effort, which gives the best answer quality. Each reply costs a few rupees at most, depending on conversation length, and the business information is prompt-cached to keep that down. For high-volume, low-price plans you can set `LEADAGENT_MODEL=claude-sonnet-5-5` or `claude-haiku-5-5` to cut the cost. Test a client's real questions before you switch.
- **Monthly cap per client.** `monthly_reply_limit` in each client's JSON caps the replies so one busy client can't wreck your margin. Above the cap, customers get a polite "our team will reply" message. The dashboard shows each month's usage.
- **Refusals.** If Claude's safety system declines a request, server-side fallback retries it on another model automatically. If that also declines, the customer gets a safe "our team will get back to you" reply.

## Files

| File | What it is |
|---|---|
| `agent.py` | The Claude agent: system prompt, the four tools (save lead, check slots, book, hand off) and the tool loop |
| `app.py` | Web server: chat API, widget, WhatsApp webhook, dashboards, admin API |
| `db.py` | SQLite storage for clients, conversations, leads, bookings and usage |
| `static/widget.js` | The chat bubble you embed on client websites |
| `static/dashboard.html` | The client's leads dashboard |
| `tenants/*.json` | One file per client, holding their business knowledge |
| `tests/` | Offline tests that use a fake Claude client |
