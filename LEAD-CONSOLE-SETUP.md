# Lead Console — Setup & Usage

Role-based lead management at `/admin`, plus an instant Telegram alert the
moment a lead comes in. Everything below is configured with environment
variables — no code changes needed to add people or rotate passwords.

---

## 1. Logins

Three accounts, all defined in `.env.local` (and in Vercel → Settings →
Environment Variables for production). **An account with a blank password
simply does not exist** — that is how you disable someone.

| Role | Username var | Password var | Display name var | Lands on |
| --- | --- | --- | --- | --- |
| Admin | `ADMIN_USER` | `ADMIN_PASSWORD` | `ADMIN_NAME` | `/admin/leads` |
| Employee 1 | `EMP1_USER` | `EMP1_PASSWORD` | `EMP1_NAME` | `/admin/my-leads` |
| Employee 2 | `EMP2_USER` | `EMP2_PASSWORD` | `EMP2_NAME` | `/admin/my-leads` |

Current values are already in `.env.local`:

```
ADMIN_USER=ca_admin      ADMIN_PASSWORD=MxeYqyrku7ycclQOxX7K
EMP1_USER=emp1           EMP1_PASSWORD=Emp1@15e0c8e8
EMP2_USER=emp2           EMP2_PASSWORD=Emp2@801e25dc
```

> **Change the two employee passwords before handing them out**, and set
> `EMP1_NAME` / `EMP2_NAME` to the real staff names — those names show up on
> the assign dropdown and against every note they write.

Everyone signs in at **`/admin/login`**. Whoever you are, `/admin` sends you to
the right screen and the other role's screen is closed to you.

**Sessions:** an HMAC-signed, httpOnly `ca_session` cookie, valid 12 hours.
Set `ADMIN_SESSION_SECRET` to a long random string (already done). Leave it
blank and it is derived from the passwords instead — which means changing any
password instantly signs everybody out.

---

## 2. Telegram alerts — what you need to do

Telegram was chosen over WhatsApp deliberately: it is free with no per-message
cost, official, needs no message-template approval, no business verification,
and no Meta Business account. (WhatsApp Cloud API onboarding was blocked by an
advertising restriction on the business portfolio; CallMeBot, the free
third-party route, stopped responding.)

### Setup

1. **Create the bot.** On Telegram, search **@BotFather** → send `/newbot` →
   give it a name (e.g. `Company Avenue Leads`) and a username ending in `bot`
   (e.g. `company_avenue_leads_bot`).
2. **Copy the token** it replies with into `.env.local`:

   ```
   TELEGRAM_BOT_TOKEN=123456789:AAE...
   ```

3. **Everyone who should get alerts** opens that bot on Telegram and presses
   **START**. Nothing happens visibly — that is expected.
4. **Discover the chat IDs:**

   ```
   npm run telegram:chat-id
   ```

   It prints every chat that has messaged the bot, with the env line to paste.

5. **Paste them in:**

   ```
   TELEGRAM_BOSS_CHAT_ID=123456789     # required
   TELEGRAM_EMP1_CHAT_ID=              # optional
   TELEGRAM_EMP2_CHAT_ID=              # optional
   TELEGRAM_NOTIFY_EMPLOYEES=false     # true = employees alerted on every lead
   ```

6. Restart the dev server. Submit the contact form. The boss's Telegram pings.

> Telegram only retains ~24 hours of updates, so run `telegram:chat-id`
> reasonably soon after pressing START. If it finds nothing, press START again
> (or send any message to the bot) and re-run.

> A bot cannot start a conversation. Each recipient **must** press START once
> or Telegram rejects every send to them with "chat not found".

### What the alert looks like

Name, phone, email, service and the enquiry text, with two tap buttons:
**💬 Message lead** (opens WhatsApp to the lead, greeting pre-filled) and
**📋 Open console**. Assigning a lead pings that employee the same way.

### Safety guarantee

Every send is best-effort and individually wrapped. If Telegram is down, the
token is wrong, or nothing is configured at all, the lead is **still saved to
MongoDB and the form still returns success to the visitor**. This is tested —
an unconfigured bot logs a warning and the form still returns `HTTP 200`.

---

## 3. How the team uses it

### Admin — `/admin/leads`

- Five counters across the top, including **"Going cold (2h+)"** — leads nobody
  has been assigned for over two hours. Click through to see exactly those.
- Search by name / phone / service, filter by status or by who owns it.
- The **assign dropdown on each row** is the admin-only control: pick Employee 1
  or Employee 2 and the lead moves to their console instantly. Picking
  "— Assign to —" un-assigns it again.
- Assigning fires the Telegram ping to that employee (if their chat id is set)
  and logs "Assigned to …" in the lead's activity trail.
- Admin can do everything an employee can: tick tasks, add notes, change status.

### Employee — `/admin/my-leads`

- Sees **only** leads assigned to them. Other leads are invisible, and the API
  rejects any attempt to touch one (`403`).
- Three tabs: **To do**, **Completed**, **All**. Open items are expanded by
  default so the checklist is right there.
- Each lead has a **follow-up checklist** — Call the lead → Understand
  requirement → Share quotation → Collect documents → Close / convert. Tick the
  boxes as you go; the progress bar and the lead's status update themselves
  (first tick flips it to *In progress*).
- Add your own checklist items, log call notes, and hit **Mark completed** when
  the lead is closed. **Not interested** parks it as *Dropped*.
- **WhatsApp** and **Call** buttons on every card open the lead's chat or dialler
  directly — the WhatsApp one is pre-filled with a greeting naming their service.

Statuses: `new → assigned → in_progress → completed`, plus `dropped`.

---

## 4. Where the code lives

| File | Role |
| --- | --- |
| [`src/lib/auth.ts`](src/lib/auth.ts) | Accounts, password check, signed session cookie (Edge-safe) |
| [`src/lib/session.ts`](src/lib/session.ts) | Server-side session reader for routes/pages |
| [`src/middleware.ts`](src/middleware.ts) | Auth gate + role-based page routing |
| [`src/lib/telegram.ts`](src/lib/telegram.ts) | Bot sends, recipients, message building |
| [`src/lib/leads.ts`](src/lib/leads.ts) | Shared lead types, statuses, checklist, formatters |
| [`src/lib/leads-db.ts`](src/lib/leads-db.ts) | Mongo document → `Lead` mapping |
| [`src/app/api/admin/login`](src/app/api/admin/login/route.ts) | Login + per-IP brute-force throttle |
| [`src/app/api/admin/leads`](src/app/api/admin/leads/route.ts) | Role-scoped lead list |
| [`src/app/api/admin/leads/[id]`](src/app/api/admin/leads/[id]/route.ts) | assign / status / tasks / notes, with permission checks |
| [`src/components/admin/`](src/components/admin/) | Shell, lead card, data hook |

Leads are the existing **`consultations`** collection — no migration was needed.
Rows created before this feature have no checklist; they get one the moment an
admin assigns them. New submissions arrive with the checklist pre-seeded.

---

## 5. Deploying

Copy every new variable into **Vercel → Settings → Environment Variables**, then
redeploy:

```
ADMIN_NAME, EMP1_USER, EMP1_PASSWORD, EMP1_NAME,
EMP2_USER, EMP2_PASSWORD, EMP2_NAME, ADMIN_SESSION_SECRET,
NEXT_PUBLIC_SITE_URL,
TELEGRAM_BOT_TOKEN, TELEGRAM_BOSS_CHAT_ID
(+ the optional TELEGRAM_EMP1_CHAT_ID / TELEGRAM_EMP2_CHAT_ID)
```

`.env.local` is for local development only — Vercel never reads it.
