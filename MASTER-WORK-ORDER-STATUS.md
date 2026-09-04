# Master Work Order — Developer Status Report

**Re:** CAA Digital Presence Master Work Order
**Date:** 17 August 2026
**Scope of this report:** Part A (Website) in full, plus the developer-side
items inside Parts B–D. Marketing-owned workstreams are listed with what the
code now supports, not marked complete.

**Verification:** `tsc --noEmit` clean · ESLint clean · production build
compiles · every route below checked with `curl` against `next start`, not
against source.

**Legend** ✅ done & verified · 🔧 partial, blocked on an input · ⏳ blocked
· 👤 not developer-owned

---

## Summary

| WS | Item | Status |
|---|---|---|
| 1.1 | Placeholder GSTIN | ✅ REMOVED 4 Sep 2026 — fails GSTIN checksum, provably not real. Not replaced; awaiting the firm's GST certificate |
| 1.2 | CIN verification | ⏳ Principal — retained (required on official publications; unverified not disproven). Flagged for MCA Master Data lookup: decodes MH/2015 vs a Delhi firm, IndiaMart says est. 2024 |
| 1.3 | Pages with incorrect law offline | ✅ 410 Gone, both |
| 1.4 | Dead reviews link | ✅ now `/reviews` |
| 2 | Legacy redirects | 🔧 all known URLs live as 301; full inventory blocked |
| 3 | Analytics & events | ✅ all 8 events · 🔧 call tracking not built (by design) |
| 4 | Structured data | ✅ `ProfessionalService` + Person, single NAP source |
| 5.1 | Reviews destination | ✅ built, live Google data |
| 5.2 | Homepage testimonials | ✅ fabricated fallback deleted |
| 5.3 | Trust claims | ✅ experience reworded · 🔧 client count pending |
| 5.4 | Stock imagery | 🔧 misleading alt text fixed; photos needed |
| 5.5 | Internal linking & blog filters | ✅ both |
| 6 | Data protection | ✅ §6.1 disclosure delivered · ⏳ build blocked |
| 7.1 | Tax Year 2026-27 calculator | 🔧 signposted · ⏳ rates blocked |
| 7.2 | Location page template | ✅ slots built, render only when filled |
| 8 | GBP build-out | 👤 Marketing |
| 9 | Social programme | ✅ footer defect fixed · 👤 rest is Marketing |
| 10 | NAP reconciliation | ✅ canonical record centralised · ⏳ values blocked |

---

## WS-1 — Emergency content corrections

### 1.1 — GSTIN ✅ REMOVED (4 Sep 2026)
`07AABCC1234D1Z5` **fails the GSTIN check-digit algorithm** — computed 15th
character is `D`, not `5`; two independent implementations agree. It cannot be a
real GSTIN (it embeds `AABCC1234D`, the specimen PAN from sample documentation),
so displaying it was an affirmative false statement by a regulated firm — on the
site of a firm that sells GST registration, a few clicks from its own GST
Verification tool. The 31 Aug sign-off that called it "correct as-is"
(`dev-task-instructions.md` T1) was mistaken.

It has been **removed, not replaced.** GST law requires the GSTIN on invoices and
at the principal place of business, not in a website footer, so omitting it costs
nothing and needs no input from the Principal. `07AAVCS4279H1ZM` (IndiaMart) has
a valid checksum but is **not** confirmed as CAA's — adopting it would repeat the
error. `src/lib/nap.ts` `gstin` is now `null`; `Footer.tsx` renders the GSTIN
line only when it is set. Supplying the real value from the GST certificate is a
one-string edit.

### 1.2 — CIN ⏳ RETAINED, but now suspect
Unverified, not disproven — a CIN has no check digit — and the Companies Act
requires it on official publications, so it stays. But it decodes as Maharashtra
(`MH`) / 2015 / private company: wrong ROC state for a Delhi firm, and the year
conflicts with the firm's own IndiaMart profile (year established 2024). It also
shares the discredited 31 Aug sign-off, and it appears in `/privacy` (DPDP
data-fiduciary disclosure) and `/terms` (contract) — legal documents that name
the legal entity. **The MCA Company/LLP Master Data lookup (mca.gov.in) is now a
priority**, alongside asking Jatin for the GST certificate.

### 1.3 — Pages carrying incorrect statements of law ✅
Both now return **410 Gone**, at both URL forms:

| URL | Status |
|---|---|
| `/sole-proprietorship-to-private-limited-company/` | 410 ✓ |
| `/shares-transfer/` | 410 ✓ |

410 rather than 301 was chosen deliberately, and the order permits either. A 301
would pass the incorrect page's accumulated ranking signals to a live commercial
page; a 410 retires the statement, which is what the defect calls for. It is one
edit to switch — see the note in `src/lib/legacy-redirects.ts`.

They serve a real page, not a bare status: a human who followed an old bookmark
is told the guidance was withdrawn and offered `/services` and `/contact`, while
crawlers read the 410 and drop the URL.

**Separately verified:** neither incorrect statement of law is repeated anywhere
in the current Next.js build. The ₹1 lakh minimum capital claim and the
DIN-for-share-transfer claim exist nowhere in this codebase. The modern
equivalents (`/services/proprietorship-to-pvtltd`, `/services/share-transfer`)
are clean.

### 1.4 — Dead reviews link ✅
The homepage "Read All Reviews →" button had `href="#"` whenever the Places API
was unconfigured — which was the live state. It now links to `/reviews`
unconditionally. **Zero `href="#"` anchors remain on the homepage.**

---

## WS-2 — Legacy decommissioning and redirects 🔧

All ten known legacy URLs return a **single-hop 301** (or 410), verified by
`curl`. Query strings are preserved, so a legacy URL arriving with UTMs keeps
its attribution.

### Two defects found in the starter map itself

**1. `/services/annual-filing` does not exist.** The order's starter map sends
`/private-limited-compliance/` there. Retargeted to `/services/roc-compliance`,
which covers AOC-4/MGT-7 annual filing for companies. (`/services/llp-annual-filing`
exists but is the wrong entity type.)

**2. Every legacy URL would have failed the WS-2.4 acceptance test.** This is
the substantive finding. Implemented the obvious way — `next.config.ts`
`redirects()` — the result was measurably wrong on two counts:

- `permanent: true` emits **HTTP 308, not 301**. Next's `redirects()` cannot
  emit 301 at all; it only offers 307/308. WS-2.2 says 301 and your approval
  spreadsheet has a 301 column.
- Every legacy WordPress URL ends in a trailing slash, and this build sets
  `trailingSlash: false`. Next's own normalisation redirect runs *before*
  `redirects()`, so `/books-keeping-outsourcing/` returned
  **308 → `/books-keeping-outsourcing` → 308 → destination**. A two-hop chain on
  **every single legacy URL**, against an acceptance criterion of "every legacy
  URL reaches its destination in one hop… no chains, verified with a crawler."

Both were confirmed by `curl` before and after. The fix moves the map into
middleware with `skipTrailingSlashRedirect: true`, so one handler matches both
slash forms and answers with a single explicit 301. Middleware now also owns
trailing-slash normalisation for the rest of the site — `/about/` → 308 →
`/about` — which is documented at both files and must not be removed.

While doing this I also scoped the admin auth gate to `/admin` and `/api/admin`.
The matcher is now site-wide, and the gate's "auth not configured" **HTTP 503
would otherwise have been served for every public page** if the admin
environment variables were ever missing.

### What is still outstanding — and cannot be finished here
- **The complete URL inventory.** WS-2.2 requires it from four sources: the
  `wp_posts` table, the legacy sitemap, the Search Console Pages report over 16
  months, and a Screaming Frog crawl of the live legacy instance. I have access
  to none of them. The map implemented covers the publicly visible sample only.
- **Legacy blog slugs, individually.** A blanket `/blog/*` rule is deliberately
  **not** implemented — it would discard the accumulated authority of every
  post. Each needs its own row.
- **WordPress backup, decommissioning, and Search Console submission** — server
  and console access, not code.

**Deliverable:** `LEGACY-REDIRECT-MAP.csv` — the approval spreadsheet, with the
blocked rows named as blocked.

---

## WS-3 — Analytics, events and call tracking ✅ / 🔧

**All eight specified events are implemented**, with the specified parameter
names. Full spec, GTM notes and testing instructions:
**`ANALYTICS-SPEC.md`**.

| Event | Where it fires from |
|---|---|
| `click_to_call` | delegated listener — every `tel:` link |
| `whatsapp_click` | delegated listener — every `wa.me` link |
| `contact_form_submit` | consultation form success |
| `newsletter_signup` | subscribe success |
| `calculator_complete` | a rendered result, all 27 calculators |
| `verify_tool_use` | all 5 verification tools |
| `service_page_scroll_75` | 75% depth on `/services/*` |
| `social_referral_landing` | landing session from a social source |

Three implementation points worth your attention:

**Calls and WhatsApp are tracked by one delegated listener, not per-link
handlers.** There are 136 `tel:` links and 50 `wa.me` links, and every new
service page adds more. Per-link handlers guarantee that a page eventually ships
untracked. `link_position` (`header` / `footer` / `sticky` / `floating_fab` /
`hero` / `body`) is derived from the DOM, so it works on markup added later.

**The footer newsletter form was decorative.** It had no submit handler and no
endpoint — the email address was discarded. `newsletter_signup` could not have
fired. It now posts to `/api/newsletter` and upserts to MongoDB, so
re-subscribing is idempotent.

**`calculator_complete` means a result, not a click.** It fires when a result
element actually renders, and only after a first interaction — several
calculators show a result from their default state on mount, and counting that
would make the event report 100% completion and measure nothing.

### Call tracking — not built, deliberately 🔧
WS-3.3 specifies four tracked numbers. None is implemented, because the order's
own NAP CONFLICT WARNING says dynamic number insertion must not alter the NAP
number in structured data or on the contact page, and requires the approach to
be agreed with you first. WS-10 is simultaneously trying to reconcile a
confirmed address and hours conflict; introducing swapped phone numbers into
that, before the canonical record is even confirmed, would create a second
consistency problem while solving an attribution one.

`ANALYTICS-SPEC.md` §4 sets out the safe shape for when you have agreed it.
Meanwhile `click_to_call` with `link_position` already answers which CTA and
which page produce calls.

### Still needs you
- `NEXT_PUBLIC_GTM_ID` in Vercel, then redeploy.
- **Publish the GTM container at least once** — unpublished, it loads empty and
  nothing fires however correct this code is.
- Mark `click_to_call`, `whatsapp_click`, `contact_form_submit` as key events.
- Verify in GA4 DebugView on desktop **and mobile separately** — the sticky bar
  is mobile-only and is the highest-intent call surface on the site.
- Search Console canonical property; confirm no legacy WordPress tags still fire.

---

## WS-4 — Structured data ✅

`ProfessionalService` is now the leading `@type`, as specified, alongside
`AccountingService`, `LocalBusiness` and `Organization`. Verified in the built
HTML, not the source.

Also added: **`Person` node for the Principal** at `/about#principal`
(`knowsAbout` limited to practice areas the site actually publishes on), and
blog posts now credit that Person as `author` with the firm as `publisher` —
WS-4's author-credibility requirement for regulated content. `foundingDate: 2015`.

### Three defects found and fixed while doing this

**1. The site disagreed with its own schema about its address.** The footer said
"…District Centre, Professor Joginder Singh Marg, Janakpuri…" while the
Organization node said "209, Jaina Tower 1, District Center, Janakpuri" — two
different strings for one address, and schema is the copy Google reads. Both now
derive from one record.

**2. `sameAs` pointed at a LinkedIn page that is not the firm's.** It listed
`/company/company-avenue-advisory`, missing the `-pvt-ltd` suffix of the actual
page.

**3. `sameAs` listed two profiles the WS-9.1 audit could not confirm** — a
Facebook and an Instagram URL. WS-4 forbids listing a dormant or unclaimed
profile. `sameAs` now contains only confirmed profiles, and an unconfirmed row in
`nap.ts` **cannot** reach it.

**Still gated on you:** `ADDRESS.confirmed` and `HOURS.confirmed` are both
`false`. The values published are the website's existing ones — this is not a new
claim, it is the existing claim stated once instead of twice. Confirm the
canonical NAP in writing and the flags flip in one file.

---

## WS-5 — Conversion and trust fixes

### 5.1 — Reviews destination ✅
`/reviews` built, pulling live from the Google Business Profile. Linked from the
homepage button, the main navigation, the footer, and included in the sitemap.

There is **no hardcoded review text, no seeded name and no fallback persona
anywhere in the file.** If Places is down, the page says so and sends the
visitor to the Google profile.

No `Review`/`AggregateRating` markup is emitted on the page: review markup a
business publishes about itself is self-serving under Google's policy and is not
rich-result eligible. The live rating already reaches Google through the
Organization node.

**Live data observed:** rating **5.0 across 145 reviews**, most recent ~9 months
old. This corrects the order's WS-9.5 observation that "the newest traceable
Google review dates to June 2024" — the profile is considerably healthier than
the audit found. The Places API returns 5 reviews per call, which the page states
plainly rather than implying it shows all 145.

### 5.2 — Homepage testimonials ✅
The five named testimonials (Arjun Sharma, Priya Mehta, Rohan Kapoor, Neha
Singh, Vikram Patel) are **deleted from the codebase**. They rendered whenever
Places was unconfigured or erroring, which was the live state of the site.

With no live reviews the section now renders a factual panel that makes no claim
about any individual client and links to `/reviews`. A comment in the file tells
the next developer not to reintroduce a hardcoded testimonial array.

**Verified:** none of the five names appears in the built homepage HTML.

**One more fabricated figure found and fixed:** the homepage hero hardcoded
"**4.9/5**" and a "4.9★ Google Rating" stat tile. A star rating is a checkable
factual claim, and the real figure is 5.0. Both now render only when the live
Google rating is available, from the same source as everything else.

### 5.3 — Trust claims ✅ / 🔧
Per your decision: experience reworded, client count left pending.

| Claim | Action |
|---|---|
| "15+ Years Experience" and variants, ~30 service pages | ✅ Reworded to attribute it to the Principal's practice, not the firm's age |
| "1000+ / 1,000+ Businesses Served" | 🔧 Left rendering; now reads from `TRUST_CLAIMS.clientsServed` — one edit changes it everywhere |
| "4.9/5" rating | ✅ Now live-data-only (see above) |
| "25,000+ world-class brands" | ✅ Does not exist in this build; dies with WordPress |
| ISO 9001:2015 / MSME accredited | 👤 Third-party listings only — not on this site. Wording note below |

Three further unsubstantiated figures found on `/about` that the order did not
list, all now consistent with the record:
- "**Founded in 2009**" — contradicted by the [VERIFIED] 2015 incorporation. Now
  "Incorporated in 2015".
- "**20 years of experience**" in the hero, the meta description and the
  Principal's bio — higher than any figure in evidence, including the 15+ the
  order attributes to your practice. Now 15+ years in practice.
- "**20+ Years of Experience**" badge — now states whose experience it is.

Eight personal-finance calculators also advertised "**investment advisory**" and
"**financial advisors**" in their CTAs — services this firm does not list
anywhere. Reworded to what it actually sells (see 5.5).

**For your wording decision:** on "MSME accredited" the order is right that
Udyam is a registration, not an accreditation. On ISO 9001:2015 — substantiate
with certificate number and issuing body, or remove it everywhere. Neither
appears on this website, so both are Marketing actions on third-party listings.

### 5.4 — Stock imagery 🔧
**Cannot complete — needs commissioned photography.** The order's brief is at
§9.6; I have no assets to substitute.

What I could do, I did: **ten alt texts across nine files described Unsplash
stock as this firm's own team or premises.** The order names one
("Company Avenue Advisory professional office environment"); the same defect
existed nine more times — "Company Avenue Advisory team", "…professional team"
(×2), "…drug license compliance team", "…transfer pricing team", "Company
Avenue Advisory team working in modern office", and three office/building
variants. Every one is now an accurate description of what the image actually
shows. Verified each was Unsplash before editing.

When photography arrives: convert to AVIF/WebP, serve via `next/image` with
descriptive alt text, then remove `images.unsplash.com` from `next.config.ts`.
Roughly 33 files still reference it.

### 5.5 — Internal linking and blog filters ✅
**The tools silo is broken.** All five verification tools now carry a "What to
do next" block with **contextual** service links — a GSTIN lookup offers GST
registration, filing and amendment; a company-name search offers incorporation
and trademark registration; and so on. A generic "see all services" link would
have defeated the purpose.

Eight personal-finance calculators dead-ended at `/contact` with a generic CTA.
Now they point at the service that genuinely follows — the tax treatment of the
instrument the visitor just modelled (ITR filing, Virtual CFO).

**Blog empty-category behaviour:** the filter row was built from all posts'
categories, but the grid renders every post *except* the featured one. Any
category whose only post happened to be featured produced a **dead button that
selected nothing**. Filters are now derived from the posts actually in the grid,
so an empty category cannot be offered. "Industry News" keeps its filter and
gained a useful empty state pointing back to the written articles, since its
live feed can be quiet or unavailable.

---

## WS-6 — Data protection ✅ (disclosure) / ⏳ (build)

**`DPDP-DATA-INVENTORY.md` delivered** — the §6.1 disclosure, inside the 7-day
window: all 10 collection points, exact fields at each, storage and access
controls, all 8 third-party providers, the analytics assessment, and the cookie
inventory.

No collection flow was built or amended to comply with the Act, per WS-6's
instruction. The single change is the newsletter endpoint, made for WS-3 (the
form was inert), and it is flagged as such in the document.

The findings that most need your position, in order of exposure:

1. **No retention period and no deletion mechanism exists anywhere.** No TTL, no
   purge, no archival. Every lead ever submitted is still stored in full,
   including free-text messages, and the set grows daily until you set a period.
2. **The PAN tool** takes a third party's PAN, name and date of birth and
   returns their **Aadhaar-seeding status**, with nothing establishing that the
   visitor has authority over that PAN. Consent is enforced as a flag but
   **retained as nothing** — no timestamp, no notice version.
3. **`consultation.message` and staff `notes` are free text.** Any retention rule
   must assume a visitor will paste a PAN, an Aadhaar number or a dispute into
   them, because nothing prevents it.
4. **The WhatsApp alert path** sends a complete lead record — name, phone,
   service, message — to **CallMeBot**, a free third-party relay, by default.
   Worth an explicit decision rather than an inherited one.
5. **No cookie consent.** GTM and GA4 load on first page load, before any
   interaction, on every route.
6. **No provider terms or DPAs reviewed or on file** for any of the eight.
7. **No audit log on lead access** — internal misuse would leave no trace.

---

## WS-7 — New build items

### 7.1 — Tax Year 2026-27 calculator 🔧 / ⏳
**The calculator cannot be built.** WS-7.1 requires it to follow your
specification only, and explicitly forbids sourcing rates, slabs or terminology
from any other reference including AI tools and competitor sites. I have no
specification sheet, so I have written no rates.

What is done:
- The FY 2025-26 calculator **stays at its current URL**, as required, now
  labelled unambiguously — title, meta description, H1 and hero all state
  FY 2025-26 / AY 2026-27.
- **Signposting added directly above the calculator**, stating that it covers
  FY 2025-26 and is for belated and revised returns for that period; that the
  Income-tax Act, 2025 took effect 1 April 2026 and replaces the previous
  year / assessment year pairing with a single Tax Year; and that the first Tax
  Year under it is 2026-27. It gives **no rates, slabs or thresholds** for
  TY 2026-27 and routes the visitor to a CA instead.

The component carries an instruction not to "temporarily" add a slab table.
Send the specification sheet and the calculator follows, with every displayed
figure traceable to it.

### 7.2 — Location page template ✅
Four **optional, client-supplied** slots added, each rendering only when
populated — ROC jurisdiction and state-specific requirements; local turnaround;
genuine local client outcomes; and directions plus a lazy-loaded map.

Nothing fabricates a local detail and no heading renders above an empty slot. A
location page with no slots filled degrades to the shared service description,
which is the honest outcome rather than a doorway page dressed as a local one.
The five existing pages are unaffected until you supply content.

Same standard as WS-5.2 applies to the `outcomes` slot: anonymised is fine,
invented is not.

---

## Parts B–D — Marketing-owned

### WS-8 GBP build-out 👤
Entirely Marketing/owner-panel work. One code-side contribution: `/reviews` now
provides both the public reviews URL and the **"Write a review" short link** for
the WS-9.5 ask-at-certificate-handover flow, so nobody has to hand-build it.

### WS-9 Social programme — footer defect ✅, rest 👤
**The share-button defect is fixed.** The footer presented Facebook, LinkedIn
and X icons as profile links when two of the three were share-intent URLs
(`facebook.com/sharer`, `x.com/intent/tweet`) — a visitor clicking to check the
firm's social presence got a post composer for their own account. Both are gone.
**Zero share-intent URLs remain in the built HTML.**

Icons now render **only** for profiles marked confirmed in `src/lib/nap.ts` —
the same source as the schema `sameAs` array, so the two cannot disagree. Today
that is LinkedIn alone. Facebook is recorded as dormant pending your WS-9.2
ACTIVATE/CLOSE decision; Instagram, YouTube and X have no identified profile and
so render nothing rather than a broken promise.

To add one: fill in its `url` in `nap.ts` and set `confirmed: true`. It appears
in the footer and the schema simultaneously.

The audit table, channel decisions, content pillars, calendar and governance
gate are all Marketing deliverables.

### WS-10 NAP reconciliation — code side ✅, values ⏳
`src/lib/nap.ts` is now the canonical record WS-10.1 asks for, and it governs
every surface in the codebase: footer, contact page, city pages, `llms.txt`,
privacy and terms, and the structured data. Fields the order flags as disputed
carry `confirmed: false` with the reason recorded.

This is what makes the rest of WS-10 mechanical. Confirm the canonical values in
writing, change them in one file, and every website surface moves together —
after which directory listings can be reconciled against a record that no
longer contradicts itself.

Still yours: the canonical values, and the listing-by-listing reconciliation
(Justdial, IndiaMART, Bing Places, Apple Maps, Sulekha), the localo.site
authorisation question, and the duplicate-listing search.

---

## Deliverables in this repository

| File | Contents |
|---|---|
| `LEGACY-REDIRECT-MAP.csv` | WS-2 approval spreadsheet, blocked rows named |
| `ANALYTICS-SPEC.md` | WS-3 event spec, UTM convention, call-tracking position |
| `DPDP-DATA-INVENTORY.md` | WS-6.1 developer disclosure |
| `MASTER-WORK-ORDER-STATUS.md` | This report |

## The short list of what unblocks the most work

1. **Live GSTIN and CIN**, in writing → clears WS-1.1, WS-1.2.
2. **Canonical NAP** (address, hours), in writing → clears WS-4 deployment and
   unblocks all of WS-10.
3. **Retention period**, plus your DPDP position → unblocks WS-6.
4. **Tax Year 2026-27 specification sheet** → unblocks WS-7.1.
5. **Legacy WordPress + Search Console access** → completes WS-2.
6. **Commissioned photography** → completes WS-5.4.
7. **Confirmed client count**, or approval to drop the figure → closes WS-5.3.
8. **Publish the GTM container** → makes all eight events live.
