# DPDP Data Inventory — Developer Disclosure

**Deliverable for:** WS-6.1 of the CAA Digital Presence Master Work Order
**Prepared:** 17 August 2026
**Prepared by:** Development
**For:** Principal (CA Jatin Aggarwal), to inform the firm's position under the
Digital Personal Data Protection Act, 2023

---

## Purpose and status of this document

WS-6 instructs that no data-collection flow is to be built or amended until the
Principal issues the firm's DPDP position, and that implementation must follow
that specification rather than a general interpretation. This document is the
disclosure WS-6.1 requires within 7 days so that position can be written
against facts.

**Nothing in this document is a legal opinion, and no flow described here was
changed to comply with the Act.** One item was changed for a different reason
and is flagged inline: the footer newsletter form previously had no submit
handler at all, so `newsletter_signup` (a WS-3.2 required event) could not fire.
It now posts to an endpoint. It captures an email address and nothing else.

---

## 1. Every point where personal data is collected

| # | Collection point | Route | Trigger | Stored? |
|---|---|---|---|---|
| 1 | Book Consultation form | `/contact` → `POST /api/consultation` | Visitor submits | **Yes** — MongoDB |
| 2 | Newsletter subscribe | Footer, all pages → `POST /api/newsletter` | Visitor submits | **Yes** — MongoDB |
| 3 | PAN verification tool | `/verify/pan-verification` → `POST /api/verify/pan` | Visitor submits | **No** |
| 4 | GST verification tool | `/verify/gst-verification` → `POST /api/verify/gst` | Visitor submits | **No** |
| 5 | Company/director verification | `/verify/company-verification` → `POST /api/verify/company` | Visitor submits | **No** |
| 6 | Company name search | `/verify/company-name-search` → `POST /api/verify/company-name` | Visitor submits | **No** |
| 7 | Avenue AI chat widget | Floating widget, all pages → `POST /api/avenue-ai` | Visitor sends a message | **Browser only** — `localStorage` |
| 8 | WhatsApp handoff | `wa.me` links + floating button | Visitor taps through | **No** — leaves our systems |
| 9 | Analytics / GTM | All pages | Page load and events | **Third party** — Google |
| 10 | Admin console session | `/admin/login` | Staff sign-in | **Cookie** — signed session |

Calculators (all 27) are **client-side only**. They post nothing to the server
and store nothing. They are not a collection point.

---

## 2. Exactly what fields are captured at each point

### 2.1 Book Consultation form — the primary lead flow
Validated server-side in `src/app/api/consultation/route.ts`:

| Field | Type | Required |
|---|---|---|
| `name` | 2–100 chars | Yes |
| `email` | email, ≤200 chars | Yes |
| `phone` | 10–20 chars | Yes |
| `service` | service name, ≤100 chars | Yes |
| `message` | 10–2000 chars, free text | Yes |

Also written to the record without being asked for:

| Field | Source | Note |
|---|---|---|
| `userAgent` | request header | Browser/device string |
| `createdAt` | server clock | |
| `status`, `assignedTo`, `assignedAt`, `completedAt`, `tasks`, `notes` | lead-management workflow | `notes` is staff free text about the lead |

**Point for the Principal:** `message` is free text and `notes` is staff free
text. Either can contain far more sensitive personal data than the form asks
for — a visitor may paste a PAN, an Aadhaar number, a dispute, or health or
financial detail into "message". Any retention period and access rule needs to
be set on the assumption that it will happen, because nothing prevents it.

### 2.2 Newsletter subscribe
| Field | Type |
|---|---|
| `email` | email, ≤200 chars, lowercased |
| `source` | which page the form was on |
| `status`, `createdAt`, `updatedAt` | subscription state |

### 2.3 PAN verification — the most sensitive flow on the site
| Field | Notes |
|---|---|
| `pan` | 10-character PAN |
| `name` | name as printed on the PAN card |
| `dob` | date of birth, DD/MM/YYYY |
| `consent` | must equal `"Y"` or the request is rejected (HTTP 400) |

The response returns PAN category and status, name-match and DOB-match
booleans, and **Aadhaar seeding status**.

**Three points for the Principal:**
1. This is the flow WS-6 singles out. It handles a PAN, a name, a date of birth
   and returns an Aadhaar-link status — for a **third party**, not necessarily
   the person using the tool. Nothing establishes that the visitor is the data
   principal or has their authority.
2. `consent: "Y"` is enforced, but consent is currently a **checkbox in the
   tool's UI**, not a recorded consent artefact. No timestamp, notice version
   or record of what was consented to is retained. WS-6.2 anticipates exactly
   this ("consent record retained with timestamp and notice version").
3. A fixed `reason` string is transmitted to the provider on every request:
   *"Verifying PAN details for Company Avenue Advisory onboarding/compliance
   service."* This is asserted for every lookup regardless of whether it is
   true of that lookup.

### 2.4 GST / company / director / name verification
Captures only the identifier being looked up — GSTIN, CIN/LLPIN, DIN, or a
proposed company name. A **DIN lookup returns a named individual's
directorship record**, which is personal data about that director even though
we collected only a number.

### 2.5 Avenue AI chat
The visitor's message text is captured. It is free text, so the same warning as
§2.1 applies with more force — a chat window invites disclosure. The transcript
is persisted in the visitor's **own browser** (`localStorage`, last 50
messages, `src/components/AvenueAI.tsx`). It is not written to our database.

---

## 3. Whether data is stored, where, for how long, under what access controls

| | Consultation leads | Newsletter | Verification tools | AI chat |
|---|---|---|---|---|
| **Stored** | Yes | Yes | No | Visitor's browser only |
| **Where** | MongoDB Atlas, `consultations` | MongoDB Atlas, `newsletter_subscribers` | — | `localStorage` |
| **Retention** | **Indefinite — no deletion exists** | **Indefinite — no deletion exists** | Not retained by us | Until the visitor clears it |
| **Access** | Admin console, role-gated | No UI — database only | — | The visitor |

### Retention — the gap that needs a decision
**There is no retention period and no deletion mechanism anywhere in this
system.** No TTL index, no scheduled purge, no archival. Every lead submitted
since launch is still stored in full, including free-text messages. WS-6.2
anticipates "automated deletion aligned to the retention period the Principal
sets" — that period is the input we do not have. Nothing can be built until it
is set, and the volume grows daily until it is.

### Access controls in place
- `/admin/*` and `/api/admin/*` are gated by a **signed session cookie**
  (`src/middleware.ts`, `src/lib/auth.ts`); Basic Auth was removed.
- Two roles: `admin` sees every lead and assigns work; `employee` sees only
  leads assigned to them (`/admin/my-leads`).
- Login throttling: 10 failures per IP per 15 minutes → HTTP 429.
- Credentials are environment variables, not in code or the database.
- **No audit log.** Who viewed or exported which lead is not recorded.
- MongoDB Atlas network access is IP-allowlist controlled; the allowlist itself
  is managed outside this codebase.

---

## 4. Every third-party API behind the tools, with provider and terms

| Provider | Used for | Receives | Terms |
|---|---|---|---|
| **Sandbox (sandbox.co.in / Quicko)** | PAN, GST, MCA company & director verification | The identifier, plus **name + DOB + consent flag + reason string** for PAN | Provider's own terms — `SANDBOX_API_KEY` / `SANDBOX_API_SECRET`. **Not reviewed by us.** |
| **Groq** or **OpenAI** | Avenue AI chat responses | The **full conversation**, including anything the visitor typed | `AI_PROVIDER` env selects one. Whichever is live receives visitor free text. |
| **Resend** | Lead notification email to the firm | Name, email, phone, service, message | |
| **CallMeBot** *or* **Meta WhatsApp Cloud API** | Instant WhatsApp lead alert to staff | Name, phone, service, message | `WHATSAPP_PROVIDER` env selects one. **See warning below.** |
| **MongoDB Atlas** | Lead and subscriber storage | Everything in §2.1 and §2.2 | Processor |
| **Google Analytics 4 via GTM** | Analytics | Page paths, events, IP-derived location, device | Container `GTM-KMKTTDKD` |
| **Google Places API** | Live reviews on `/reviews` and the homepage | Nothing about our visitors — outbound lookup of our own profile | |
| **Newsdata.io** | Industry news feed | Nothing about our visitors | |
| **Vercel** | Hosting | Request logs, IP addresses | Processor |

### Warning: the WhatsApp alert path
If `WHATSAPP_PROVIDER=callmebot`, every new lead's **name, phone number,
selected service and free-text message** are transmitted to CallMeBot, a free
third-party relay, to reach a staff handset. That is a full lead record leaving
our systems through an unvetted intermediary. The Meta WhatsApp Cloud API path
sends the same fields to Meta under a template. This is worth an explicit
decision rather than an inherited default — it is currently the fastest route
by which a complete lead record leaves our control.

### What providers are permitted to do with it
**We cannot answer this.** No provider's terms have been reviewed against the
firm's obligations, and no data-processing agreement is on file with any of
them. Establishing what each is permitted to do with what it receives requires
a review of the contracted terms, which sits with the Principal. Flagging it as
an open item rather than guessing.

---

## 5. Whether any analytics or marketing tag can access submitted field values

**Assessment: no tag reads a submitted field value — but the container is the
control, not the code.**

- Events fired from this codebase carry only non-identifying parameters:
  `page_path`, `link_position`, `service_interest` (the service name from a
  dropdown, e.g. "GST Registration"), `calculator_name`, `tool_name`, `source`,
  `campaign`, `landing_page`. No name, email, phone, message, PAN or DOB is
  ever pushed to the dataLayer. Verified across every `trackEvent` call site.
- `contact_form_submit` fires **after** a successful submission and passes only
  `page_path` and `service_interest`.
- **The caveat that matters:** GTM can read the DOM. A container-side tag
  configured with a form-field variable or an auto-event listener could capture
  a field value without any code change here, and would not appear in this
  repository. The container is administered outside this codebase. WS-3
  requires GTM Preview verification after deployment — that pass should
  explicitly confirm no tag reads form fields.
- GA4 receives IP-derived location and device data as standard.

---

## 6. Current cookie inventory and consent mechanism

### Set by this application
| Name | Type | Purpose | Scope |
|---|---|---|---|
| Admin session cookie | HTTP-only, signed | Staff authentication | `/admin`, `/api/admin` — staff only, never public visitors |

### Browser storage set by this application
| Key | Type | Purpose |
|---|---|---|
| Avenue AI transcript | `localStorage` | Restores the chat on return; last 50 messages |
| `caa_social_referral_fired` | `sessionStorage` | Fires `social_referral_landing` once per session (WS-3.2) |

### Set by third parties
| Source | Cookies |
|---|---|
| Google Tag Manager / GA4 | `_ga`, `_ga_*` and related — analytics identifiers, ~2 years |
| Google Places profile photos | Served from Google domains on `/reviews` and the homepage |

### Consent mechanism
**There is no cookie consent banner and no consent management platform.** GTM
and GA4 load unconditionally on first page load, before any visitor
interaction, on every route.

There is a `/privacy` page, and the newsletter form now carries a one-line
plain-language statement of purpose next to the field with a link to it. That
is a statement of purpose, **not** a consent mechanism, and should not be
treated as one.

---

## 7. Summary of open items for the Principal

Ordered by how exposed each leaves the firm, not by effort:

1. **Retention period.** Nothing can be deleted until a period is set. Every
   lead ever submitted is still stored in full, and the set grows daily.
2. **The PAN verification tool.** Third-party PAN, name, DOB and Aadhaar-link
   status, with no recorded consent artefact and no check that the visitor has
   authority over the PAN. The tool that most needs the Principal's position.
3. **Consent records.** Enforced as a flag, retained as nothing. No timestamp,
   no notice version.
4. **Provider terms and DPAs.** None reviewed, none on file — for eight
   providers, two of which receive full lead records.
5. **The CallMeBot alert path.** Complete lead records through a free
   third-party relay, currently by default.
6. **Cookie consent.** Analytics load before any interaction, with no banner.
7. **Notice at the point of collection.** Wording, placement and version
   control for each of the four collection points.
8. **Access, correction and erasure requests.** No mechanism and no owner.
9. **Breach notification procedure.** Not documented.
10. **Audit logging on lead access.** Not recorded, so an internal misuse of
    the lead database would leave no trace.

---

## 8. Files referenced

| Concern | File |
|---|---|
| Consultation intake | `src/app/api/consultation/route.ts` |
| Newsletter intake | `src/app/api/newsletter/route.ts`, `src/components/forms/NewsletterForm.tsx` |
| PAN verification | `src/app/api/verify/pan/route.ts` |
| Other verification | `src/app/api/verify/{gst,company,company-name}/route.ts` |
| Third-party verification client | `src/lib/sandbox.ts` |
| AI chat | `src/app/api/avenue-ai/route.ts`, `src/components/AvenueAI.tsx` |
| WhatsApp alerts | `src/lib/whatsapp.ts` |
| Database access | `src/lib/mongodb.ts`, `src/lib/leads-db.ts` |
| Admin auth | `src/lib/auth.ts`, `src/middleware.ts` |
| Analytics events | `src/lib/gtag.ts`, `src/components/analytics/EventTracking.tsx` |
