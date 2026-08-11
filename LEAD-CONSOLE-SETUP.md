# Lead Console — Setup & Usage

Role-based lead management at `/admin`, plus an instant WhatsApp alert the
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

## 2. WhatsApp alerts — what you need to give me

Set `WHATSAPP_PROVIDER` to pick how messages are sent.

### Option A — CallMeBot (default: free, no Meta account, ~2 minutes)

This is the "no complication and free" route. It is a personal-use service, so
**each recipient authorises it once from their own phone**:

1. On the phone that should receive alerts, save **+34 623 80 11 90** as a contact.
   (CallMeBot has changed this number before — if it stops replying, check the
   current one at <https://www.callmebot.com/blog/free-api-whatsapp-messages/>
   before assuming anything is broken.)
2. WhatsApp that number the exact text:
   `I allow callmebot to send me messages`
3. It replies with a personal **API key** (a 6–7 digit number), usually within
   2 minutes. If nothing arrives in 2 minutes, CallMeBot's own instructions say
   to wait 24 hours before retrying.
4. Put the phone number and that key in `.env.local`:

```
WHATSAPP_PROVIDER=callmebot
WHATSAPP_BOSS_PHONE=919953719111     # boss's number, country code, no +
WHATSAPP_BOSS_APIKEY=123456          # the key CallMeBot replied with
```

**So all I need from you is: the boss's WhatsApp number, and the API key that
bot sends back.** That is the whole setup.

Optional — ping an employee automatically when a lead is assigned to them
(each employee repeats steps 1–3 on their own phone):

```
WHATSAPP_EMP1_PHONE=91XXXXXXXXXX
WHATSAPP_EMP1_APIKEY=......
WHATSAPP_EMP2_PHONE=91XXXXXXXXXX
WHATSAPP_EMP2_APIKEY=......
```

Optional — alert both employees on *every* new lead, not just their own:

```
WHATSAPP_NOTIFY_EMPLOYEES=true
```

**Honest limits of CallMeBot:** it is a free third-party hobby service, rate
limited to roughly one message every few seconds, with no delivery guarantee or
support. Fine for a handful of leads a day. It only sends to numbers that
authorised it, so it can never message customers — only your team.

### Option B — Official WhatsApp Cloud API (when you outgrow the above)

Meta's own API. Free tier covers a generous monthly volume, but it needs a Meta
Business account, a verified number, and — for business-initiated messages
outside a 24-hour window — an approved message template.

```
WHATSAPP_PROVIDER=meta
WHATSAPP_META_TOKEN=EAAG...          # permanent access token
WHATSAPP_META_PHONE_ID=1234567890    # phone number ID from the dashboard
WHATSAPP_META_TEMPLATE=new_lead_alert # approved template name (leave blank to send plain text)
WHATSAPP_META_TEMPLATE_LANG=en
```

The recipient variables (`WHATSAPP_BOSS_PHONE`, `WHATSAPP_EMP*_PHONE`) are the
same, so switching providers is a one-line change. API keys are ignored here.

### Option C — off

```
WHATSAPP_PROVIDER=none
```

### Safety guarantee

Every WhatsApp send is best-effort and wrapped in its own error handling. If
WhatsApp is down, the key is wrong, or nothing is configured at all, the lead is
**still saved to MongoDB and the form still returns success to the visitor**.
This is tested — a broken WhatsApp config produces a logged error and an
`HTTP 200` on the form.

---

## 3. How the team uses it

### Admin — `/admin/leads`

- Five counters across the top, including **"Going cold (2h+)"** — leads nobody
  has been assigned for over two hours. Click through to see exactly those.
- Search by name / phone / service, filter by status or by who owns it.
- The **assign dropdown on each row** is the admin-only control: pick Employee 1
  or Employee 2 and the lead moves to their console instantly. Picking
  "— Assign to —" un-assigns it again.
- Assigning fires the WhatsApp ping to that employee (if their number is set)
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
| [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) | Provider abstraction + message templates |
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
WHATSAPP_PROVIDER, WHATSAPP_BOSS_PHONE, WHATSAPP_BOSS_APIKEY
(+ the optional WHATSAPP_EMP* and WHATSAPP_META_* ones you use)
```

`.env.local` is for local development only — Vercel never reads it.
