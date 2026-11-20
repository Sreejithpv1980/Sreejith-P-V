# Business plan: ₹1 lakh/month from LeadDesk AI

**The offer in one line:** *"Your WhatsApp and website answered in 1 minute, 24×7, in your customer's language. Every enquiry becomes a lead or a booking, and you get a WhatsApp alert for hot ones."*

**Why businesses pay for it:** most Indian small businesses lose enquiries that come in after hours, on Sundays, or while staff are busy. One extra customer a month usually pays for the subscription:

| Business | One missed customer is worth |
|---|---|
| Dental clinic (one root canal) | ₹6,000+ |
| Coaching institute (one admission) | ₹20,000+ |
| Real-estate broker (one deal) | ₹1 lakh+ |

That is the whole sales pitch.

> No plan guarantees income. Revenue depends on how many businesses you talk to each week. The numbers below are a realistic target, not a promise.

---

## 1. Pick ONE niche to start

Selling to one type of business means one demo, one script and referrals inside that community. Good niches:

| Niche | Why it works | Typical enquiries |
|---|---|---|
| **Dental, skin and hair clinics** | High ticket, lots of WhatsApp enquiries, appointment-based | Prices, timings, booking |
| **Coaching and tuition centres, study-abroad consultants** | Parents ask the same 20 questions; admission season rush | Fees, batches, demo class |
| **Real-estate brokers and builders** | Leads from 99acres and Facebook ads go cold within hours | Budget, location, site visit |
| **Interior designers, modular kitchens** | High ticket; qualifying budget saves hours | Budget, timeline, site visit |
| **Gyms, salons, spas** | Lower ticket but many outlets; booking-heavy | Packages, trial, booking |

**Recommendation:** start with clinics or coaching centres in your own city. The `tenants/demo-clinic.json` file is ready to adapt.

## 2. Pricing

| Plan | Price / month | Includes |
|---|---|---|
| **Website** | ₹2,999 | Website chat, lead capture, dashboard, up to 500 AI replies |
| **WhatsApp Growth** *(main plan)* | ₹5,999 | WhatsApp + website, bookings, owner alerts, up to 1,500 replies |
| **Pro** | ₹9,999 | Up to 3,000 replies, 2 branches, monthly review call, priority changes |
| Setup (one-time) | ₹4,999–₹9,999 | Meta verification, WhatsApp number, loading their information, website install |

- Offer **₹1,000 off for annual prepaid**, which helps cash flow and cuts churn.
- Collect payments with **Razorpay Subscriptions** or UPI AutoPay so renewals happen automatically.
- Set `monthly_reply_limit` in each client file to match their plan.

## 3. The ₹1 lakh math

**Target client mix (about 17 clients):**

| Plan | Clients | Monthly |
|---|---|---|
| Website | 4 | ₹11,996 |
| WhatsApp Growth | 10 | ₹59,990 |
| Pro | 3 | ₹29,997 |
| **Total recurring** | **17** | **≈ ₹1,02,000** |

Setup fees come on top. 17 clients × about ₹6,000 is **≈ ₹1 lakh one-time**, spread over the months you sign them.

**Monthly running costs (estimate, check against your real usage):**

| Item | Estimate |
|---|---|
| Claude API on `claude-opus-5-5` | ~₹1–3 per AI reply; ₹15,000–₹30,000 for 17 clients at typical volumes |
| Server (VPS) + domain + backups | ₹1,500 |
| WhatsApp Cloud API | Customer-started chats are free; template alerts cost paise each |
| Razorpay fees (~2%) | ₹2,000 |
| **Profit before tax** | **≈ ₹70,000–₹85,000** |

To push profit past ₹1 lakh, either sign 22–25 clients, or move high-volume, low-price clients to a cheaper model (`LEADAGENT_MODEL=claude-sonnet-5-5` or `claude-haiku-5-5`) after you've tested it on their real questions. The dashboard shows tokens used per client each month, so you can see exactly which clients cost what.

## 4. Getting clients: the 8-week plan

**Funnel math:** 20 demos a week → about 5 free trials → about 2–3 paying clients. **About 8 weeks to 17 clients.**

| Week | Do this |
|---|---|
| 0 | Deploy the server and buy a domain (e.g. `leaddesk.in`). Make 3 demo bots for real businesses in your niche from their Google listing (15 minutes each). |
| 1–2 | **Walk in or WhatsApp 10 businesses a day.** Show their own bot on your phone. Offer a 14-day free trial on the website widget (no Meta setup needed). |
| 2–4 | Convert trials. At the end of the trial, show their dashboard ("12 leads, 4 after 9 pm") and ask for the WhatsApp Growth plan + setup. |
| 4–8 | Ask every happy client for 2 referrals (offer one month free per signed referral). Join local association WhatsApp groups (IDA dental chapters, coaching associations, CREDAI/broker groups). |
| Ongoing | Post 30-second screen recordings of the bot replying in Malayalam/Hindi at 11 pm on Instagram Reels and LinkedIn. |

**The demo is your weapon.** Before contacting a business, copy `tenants/demo-clinic.json`, fill in *their* name, services and prices from their Google listing, load it, and send them `https://yourserver/demo/<their-id>`. Seeing their own business answered by AI sells it far better than any explanation.

### Outreach message (WhatsApp)

> Hi Dr. Meera, I'm Sreejith from Kochi. I built an AI assistant **for SmileCare specifically**: it answers patients on WhatsApp 24×7 with your prices and timings, books appointments and sends you hot leads. Try it here (takes 30 sec): https://leaddesk.in/demo/smilecare
> If you like it, I'll set it up free for 14 days. No commitment.

### Walk-in pitch (60 seconds)

1. "How many WhatsApp enquiries come after 8 pm or on Sunday? Who answers them?"
2. Show the demo on your phone and ask the bot a price question in Malayalam or Hindi.
3. "It never forgets to follow up, and you get a WhatsApp alert when someone is ready to book."
4. "Try it free for 14 days on your website. If it gets you even one patient, it has paid for itself."

### Handling objections

- **"Customers want a human."** The AI hands over the moment someone asks, and you see the whole chat.
- **"What if it says something wrong?"** It only uses the information you approve. Anything else goes to you.
- **"Too expensive."** One extra patient or admission a month covers it. Start on the ₹2,999 website plan.
- **"I already have a receptionist."** Great. This covers nights, Sundays and the rush hours, and she gets qualified leads instead of time-wasters.

## 5. Keeping clients (churn kills recurring income)

- Send each client a **monthly WhatsApp report**: leads, bookings, after-hours enquiries. Use numbers from their dashboard.
- Update their prices and FAQs whenever they ask, within 24 hours.
- Read 5 random transcripts per client every week and add any question the bot couldn't answer to their FAQs.
- With 5% monthly churn you lose about 1 client a month, so keep 2–3 new demos going every week even after you hit the target.

## 6. Legal and admin (India)

- **Business registration:** register as a sole proprietor with **Udyam (MSME)**. It is free and helps with Meta Business Verification.
- **GST:** mandatory above ₹20 lakh annual turnover (₹10 lakh in some special-category states). At ₹12–15 lakh a year you can stay unregistered, but many clinics prefer a GST invoice, so consider registering voluntarily and charging 18%.
- **Data protection (DPDP Act 2023):** you process your clients' customer data. Use a simple agreement that says you are a *data processor*: data is used only to run their assistant, deleted on request, and never sold. Add a line in the widget greeting or website privacy policy that chats are handled by an AI assistant.
- **Healthcare clients:** the bot must never diagnose. The sample prompt already says this. Keep `extra_instructions` strict for clinics.
- **WhatsApp:** use only the official Cloud API, which this project does. Follow Meta's commerce and messaging policies, and send no bulk promotional blasts from client numbers.
- **Income tax:** IT services income can use presumptive taxation under **Section 44ADA** if you qualify. Check with a CA.

## 7. Upsells once you have 10+ clients

- **Lead follow-up campaigns:** re-message cold leads after 3 days using approved templates. Charge ₹1,999/month extra.
- **Google review requests** after each booked visit.
- **Facebook/Instagram lead-ad integration** for real-estate and coaching clients.
- **White-label for agencies:** digital-marketing agencies resell it to their clients. Charge them ₹2,500/client/month wholesale.
