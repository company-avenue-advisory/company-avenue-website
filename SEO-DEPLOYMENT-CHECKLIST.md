# SEO Deployment & Google Search Console Playbook

What's **left to do**. (Setup already completed — GTM/GA4 created, site deployed, sitemap
live, old sitemaps cleared, domain verified — has been removed from this file.)

---

## ▶ WHERE YOU ARE NOW

**Done ✅:** site deployed · sitemap live (130 pages, Google re-read it) · old sitemaps gone ·
domain verified · GA4 created & collecting (`G-P3LQECEJ5L`) · analytics code live on site.

**Your remaining actions, in order:**
1. **Fix the env to GA4-direct** — in Vercel keep `NEXT_PUBLIC_GA_ID=G-P3LQECEJ5L`, make
   `NEXT_PUBLIC_GTM_ID` **blank**, Redeploy. *(Section 1 — avoids double-counting.)*
2. **Request indexing** for your ~15 money pages. *(Section 3B — the main task right now.)*
3. **Check what's indexed** weekly. *(Section 3A.)*
4. **Mark conversions** as key events once they appear in GA4. *(Section 2.)*
5. **Google Business Profile** + reviews — biggest lever for "CA near me". *(Section 6.)*

---

## 1. Fix your analytics env (GA4-direct)

**Decision: use GA4 directly, not through GTM (for now).** Your lead events
(`generate_lead`, `whatsapp_click`, `call_click`) reach GA4 **automatically** with GA4-direct.
Through GTM each event needs extra manual tag setup — unnecessary for a solo owner. GTM stays
parked; switch to it later only when you run Google Ads.

**Correct env values (Vercel — Settings → Environment Variables):**
```
NEXT_PUBLIC_GA_ID=G-P3LQECEJ5L
NEXT_PUBLIC_GTM_ID=            ← leave BLANK / delete it
```
> ⚠️ Do **not** set both. GTM (with GA4 inside it) *and* GA4-direct = every visitor counted twice.

Then **Save → Redeploy** (env changes only take effect on a fresh deploy).

**Confirm:** live site → right-click → View Page Source → Ctrl+F for `G-P3LQECEJ5L`.
Present = tracking is live. (Your GA4 screen already says "Data collection active" ✅.)

---

## 2. Mark your conversions in GA4

The site already *sends* these events — you just tell GA4 which ones are "key events".

In **GA4 → Admin → Events** (wait ~24–48h after launch so they appear in the list first),
toggle **"Mark as key event"** on:

| Event | Fires when |
|---|---|
| `generate_lead` | Contact form submitted (fires on `/thank-you`) |
| `whatsapp_click` | Someone tapped any WhatsApp button |
| `call_click` | Someone tapped your phone number |

**To test an event right now:** open **GA4 → Reports → Realtime**, then on your live site tap
the WhatsApp button. Within ~30 seconds you should see `whatsapp_click` appear in the Realtime
"Event count by Event name" card. That's how you confirm tracking end-to-end.

Once these are key events, you can later import them into **Google Ads** as conversions — that's
what lets Ads optimise for *leads* instead of *clicks*.

---

## 3. Indexing — how to CHECK what's indexed, and how to REQUEST it

- **Crawled** = Google's bot visited the page.
- **Indexed** = Google saved it in its database. **Only indexed pages can appear in search.**
- **Requesting indexing** = asking Google to look at a page *now* instead of waiting.

You do **not** need to request indexing for all 130 pages — the sitemap handles bulk discovery
automatically over 1–3 weeks. You only *fast-track* your top money pages.

### 3A. How to CHECK which pages are already indexed (3 ways)

**Way 1 — 10-second check (Google search).** In normal Google, type:
```
site:companyavenueadvisory.com
```
It lists (roughly) every indexed page; the result count ≈ how many are indexed. For one page:
```
site:companyavenueadvisory.com/services/gst-registration-delhi
```
Shows up → indexed. "No results" → not indexed yet.

**Way 2 — accurate report (Search Console → Pages).** Left menu → **Indexing → Pages**. Two numbers:
- **Indexed** (green) — pages that CAN appear in search.
- **Not indexed** (grey) — with reasons like "Discovered – currently not indexed" (Google knows
  about it, hasn't gotten to it — normal for new sites) or "Crawled – currently not indexed"
  (seen but not chosen yet — usually just needs time). Click a reason to see which URLs.

**Way 3 — check ONE URL precisely (URL Inspection).** Paste any URL into the **"Inspect any URL"**
bar at the top of Search Console → "URL is on Google" (indexed ✅) or "URL is not on Google".

> New-site reality: right after launch most pages sit in "Discovered – not indexed" for days to
> a couple of weeks. That's normal, not a bug. Don't panic at low numbers early on.

### 3B. How to REQUEST indexing (fast-track your money pages)

1. Paste the full URL (e.g. `https://companyavenueadvisory.com/services/gst-registration-delhi`)
   into the **"Inspect any URL"** bar at the top of Search Console.
2. Wait ~30 sec for the check.
3. Click **"Request Indexing"** → wait for "Indexing requested".
4. Next URL. (Google allows ~10–15/day — spread the list over 2 days.)

Requesting does **not** index instantly — it moves the URL to the front of Google's queue (hours
to a few days). Request each URL **once**; re-requesting the same URL daily does nothing.

**Priority order (do these first):**

- `https://companyavenueadvisory.com/` (home)
- `https://companyavenueadvisory.com/services/private-limited-company`
- `https://companyavenueadvisory.com/services/gst-registration`
- `https://companyavenueadvisory.com/services/trademark-registration`
- `https://companyavenueadvisory.com/services/income-tax-return`
- `https://companyavenueadvisory.com/services/llp-registration`
- `https://companyavenueadvisory.com/services/one-person-company`
- `https://companyavenueadvisory.com/services/roc-compliance`
- The 7 city pages:
  - `https://companyavenueadvisory.com/services/private-limited-company-registration-delhi`
  - `https://companyavenueadvisory.com/services/gst-registration-delhi`
  - `https://companyavenueadvisory.com/services/trademark-registration-delhi`
  - `https://companyavenueadvisory.com/services/company-registration-janakpuri`
  - `https://companyavenueadvisory.com/services/gst-registration-dwarka`
  - `https://companyavenueadvisory.com/services/company-registration-gurgaon`
  - `https://companyavenueadvisory.com/services/company-registration-noida`

The remaining ~115 pages get found automatically via the sitemap — no action needed.
**Then monitor:** check **Indexing → Pages** weekly and watch the Indexed count grow.

---

## 4. Handle old URLs that no longer exist (avoid 404 spikes)

The old site had 556 indexed pages. Any that don't exist on the new site will 404. Two options:

- **Best:** 301-redirect old URLs to the closest new page (host/CDN level — e.g. Vercel
  `redirects` in `next.config`). Removed service URLs → the matching new `/services/...` page,
  everything else → `/`.
- **Acceptable:** let them 404. The custom 404 page links back to services, and Google drops dead
  URLs over a few weeks.

Check **Search Console → Pages (Indexing report)** weekly for "Not found (404)" and add redirects
for any high-value old URLs. *(Tell me your hosting + a list of old URLs and I'll write the redirects.)*

---

## 5. Validate structured data (schema)

Test 3–4 page types in Google's **Rich Results Test** (search.google.com/test/rich-results):

- Home → should detect **Organization / LocalBusiness**
- Any service page → **Service** + **BreadcrumbList**
- Any city page → **Service** + **BreadcrumbList** + **FAQPage** (FAQs can show in search results)

Fix nothing unless it reports an error — "warnings" are usually fine.

---

## 6. Google Business Profile (biggest local-SEO lever for "CA near me")

This is what makes you show up in the **map pack** for "CA services near me / in Delhi":

1. Claim/verify **Company Avenue Advisory Pvt. Ltd.** at business.google.com.
2. **Primary category:** Chartered Accountant. Add: Business Management Consultant, Accounting
   Firm, Tax Consultant.
3. Name / Address / Phone must match the website footer **exactly**:
   `209, Jaina Tower 1, District Center, Janakpuri, New Delhi, Delhi 110058` · `+91 99537 19111`.
4. Add every service, upload 8–10 photos (office, team, logo), set hours Mon–Sat 9–7.
5. Post weekly, and **ask every happy client for a Google review** — review count + recency is the
   #1 ranking factor for the map pack.

---

## 7. Before running Google Ads

- Confirm GA4 conversions are firing (Section 2) so you can optimise for leads, not clicks.
- Use the city landing pages as ad destinations for local campaigns.
- UTM format: `?utm_source=google&utm_medium=cpc&utm_campaign=gst-delhi`

---

## Reference — analytics events wired in the code

With `NEXT_PUBLIC_GA_ID` set (GA4-direct), these fire automatically. Mark ★ as key events (Section 2):

| Event | Fires when | Key event |
|---|---|---|
| `generate_lead` | `/thank-you` loads after form submit | ★ |
| `whatsapp_click` | Any WhatsApp button/float clicked | ★ |
| `call_click` | Any "Call Now" / tel: link tapped | ★ |

**Not wired yet** (needs the forms/calculators work below): `calculator_lead`,
`lead_magnet_download`, `consultation_booked`.

---

## Reference — what's NOT built yet (remaining scope from the CAPL spec)

The SEO **foundation** is complete. These lead-gen items are separate build tasks still pending:

- Contact form: exact field set + validation + reCAPTCHA v3 + redirect to `/thank-you` (Section G1).
- Calculator lead-capture gates on all calculators (Section G2).
- 3 gated lead-magnet PDFs (Section G3).
- Exit-intent popup (Section G4).
- 12 blog articles + `/blog/{slug}` detail pages (Section M).
- Core Web Vitals pass + image WebP/lazy-load audit (Section E).

Tell me when you want to tackle these and I'll do them next.

---

## Glossary — jargon in plain English

| Term | What it means |
|---|---|
| **Indexing** | Google saving your page into its search database. **Not indexed = cannot appear in search.** "Request indexing" = asking Google to look now instead of waiting weeks. |
| **Crawling** | Google's bot *visiting* your page. Crawling comes first, then indexing. |
| **Sitemap** (`sitemap.xml`) | A machine-readable list of every page, so Google doesn't guess. Auto-generated — add a service in code and it appears automatically. |
| **robots.txt** | Tells Google which pages it may/may not visit. Ours allows all except `/admin`, `/api/`, `/thank-you`. |
| **Canonical tag** | A hidden line: "this is the *official* URL for this page." Stops Google treating `/page`, `/page/`, `/page?x=1` as duplicates. Every page has one. |
| **Schema / structured data / JSON-LD** | Hidden machine-readable facts (address, hours, services, FAQs). How Google shows star ratings, FAQ dropdowns and business info in results. Added site-wide. |
| **Rich results** | Fancy listings with FAQs/stars/images instead of plain blue links. Powered by schema. |
| **301 redirect** | A permanent "this page moved here". Sends old dead URLs (and Google) to the right new page instead of a 404. |
| **404** | "Page not found." A few are harmless; hundreds signal a broken site. |
| **Meta title / description** | The blue headline + grey text in Google results. Only shows in search, not on the page. |
| **H1** | The single main headline of a page. Google weighs it heavily. One per page. |
| **Money page** | A page that sells a service (e.g. `/services/gst-registration`) vs a blog post. Prioritise these for indexing. |
| **Key event / conversion** | An action you care about (form submit, WhatsApp, call). Marking these lets Google Ads optimise for real leads. |
| **Environment variable** | A setting stored outside the code (like an ID). Set on the hosting dashboard, not in code. |
| **Domain property** (`sc-domain:`) | A Search Console setup covering http/https/www/non-www at once. You have this — the good option. |

---

## The realistic timeline (so you don't panic)

| When | What to expect |
|---|---|
| **Day 1–3** | Google re-crawls the sitemap. Analytics shows visitors. |
| **Week 1–2** | Money + city pages get indexed. Check `site:companyavenueadvisory.com`. |
| **Week 3–6** | You rank for long-tail / brand terms ("Company Avenue Advisory", "CA in Janakpuri"). |
| **Month 2–4** | Competitive terms ("GST registration in Delhi") begin to move — **GBP reviews matter most here**. |
| **Month 4–6+** | Top-3 for local terms is realistic *if* GBP is active and reviews keep coming. |

**Google Ads is the shortcut.** SEO builds the long-term asset; Ads buys leads *tomorrow*. Do both.
