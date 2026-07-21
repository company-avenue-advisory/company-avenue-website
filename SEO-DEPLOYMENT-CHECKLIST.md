# SEO Deployment & Search Console Playbook

Last updated **21 Jul 2026** after a GSC data review + research pass on government-scheme APIs.

---

## ▶ WHERE YOU ARE NOW (read this first)

**GSC, last 3 months:** 27 clicks · 2,310 impressions · 1.2% CTR · avg position 28 · ~101 pages indexed of 130 in the sitemap.

**Honest reading of those numbers:**

| Metric | What it actually means |
|---|---|
| **27 clicks, 13 of them from "company avenue advisory private limited"** | ~14 non-brand clicks in 3 months. Commercially, you have **not started ranking yet**. Brand search finding you is table stakes. |
| **Avg position 28** | You're on page 3. Normal for a domain this young on terms as competitive as "GST registration Delhi". Nothing is broken. |
| **CTR 1.2%** | This is *exactly* what position 28 produces. **CTR is not your problem — position is.** Do not spend a single hour rewriting meta descriptions yet. That's the fix for position 5–15, not 28. |
| **2,310 impressions** | Good news, actually. Google is showing you for things. It means indexing and schema work — you just don't rank high enough to get the click. |
| **101 / 130 indexed (78%)** | Healthy. New sites rarely hit 100%. Don't obsess over the last 29. |

**The one-line diagnosis:** the technical foundation is done and working. What's missing is **indexable content volume, internal linking, and off-site trust signals**. Sections 1–4 below, in that order.

### 🔴 Priority order right now

1. ~~Ship `/blog/[slug]`, `/guides/[slug]`, `/templates/[slug]`~~ — **✅ DONE 21 Jul 2026.** *(Section 1.)*
2. ~~FAQ schema on all service pages~~ — **✅ DONE 21 Jul 2026, 86/86 covered.** *(Section 3.)*
3. **Deploy, then resubmit the sitemap in GSC** and request indexing for your 8–10 best articles. *(Section 7.)*
4. **Google Business Profile + reviews** — the only lever for "CA near me". *(Section 5.)*
5. **Directory citations + Bing Places + Foursquare** — see also `GEO-STRATEGY.md`. *(Section 6.)*
6. Finish requesting indexing for the remaining city pages. *(Section 7B.)*

---

## 1. ✅ DONE — 51 written pages are now indexable

**The problem (found 21 Jul 2026):** 51 pages of already-written content had no URLs at all.
`BlogHubClient.tsx` rendered each post as a `<button onClick={() => setExpanded(post)}` client-side
modal, so Googlebot never saw a word of it. `/blog/private-limited-vs-llp-vs-opc` returned **404**.
The only dynamic route in the app was `services/[slug]`.

**What was built:**

| Route | Count | Schema emitted |
|---|---|---|
| `src/app/blog/[slug]/page.tsx` | 30 posts | `BlogPosting` + `BreadcrumbList` |
| `src/app/guides/[slug]/page.tsx` | 9 guides | `HowTo` + `FAQPage` + `BreadcrumbList` |
| `src/app/templates/[slug]/page.tsx` | 12 templates | `CreativeWork` + `BreadcrumbList` |

Also:
- All three hubs now render real crawlable `<Link href>` cards; the modals were removed entirely
  (real URLs also mean real GA4 pageviews per article).
- Every detail page has a self-referencing canonical + OpenGraph/Twitter metadata.
- `src/lib/content-links.ts` — new category→service map. Every post/guide/template renders a
  contextual link down to its parent money page, plus 3 "continue reading" links sideways.
  That's the topic-cluster wiring from Section 4, done at the same time.
- `sitemap.ts` now generates these entries from the same data the routes use, so future
  posts appear automatically.
- Template bodies are server-rendered (crawlable); only the copy/download buttons are client-side.

**Result — verified against a production build:**

```
sitemap URLs      130 → 181      broken URLs: 0
static pages      147 → 199
```

**What to expect:** these target the *informational* long-tail ("private limited vs LLP") where a
young domain can genuinely rank — unlike "GST registration" where you're fighting IndiaFilings and
ClearTax. Give it 4–6 weeks after deploy.

---

## 2. What Search Console can and cannot do for you

You asked: *"how are queries optimised — if someone searches CA or GST does our site pop up? Or does it happen with time and traffic?"*

**Straight answer: Search Console has no ranking lever.** It is a *reporting* tool. There is no button that makes you rank for "GST registration". The only things in GSC that actually change anything:

| Lever | Effect |
|---|---|
| Submit sitemap | Faster discovery (done ✅) |
| Request indexing | Jumps a URL to the front of the crawl queue. Nothing more. |
| Removals | Temporarily hides a URL |
| Fix errors in Pages / Core Web Vitals / structured data reports | Removes *blockers* to ranking — doesn't create ranking |

Everything else in GSC is a **mirror**. It shows you what Google decided. Ranking itself is earned off-platform: content depth, internal linking, backlinks, GBP, reviews, and time.

**But GSC is the best free keyword-research tool you own** — because it shows queries where Google *already* considers you semi-relevant. That's warmer than any keyword tool. Use it like this:

### 2A. The striking-distance report (do this monthly)

**Performance → Search results → 3 months → open the QUERIES tab → sort by Impressions.**

Look for queries with **decent impressions but position 8–20**. Those are one content push from page one. At position 28 you have very few of these yet — but as the blog ships you'll get more.

Rules of thumb:
- **Position 8–20 + high impressions** → strengthen the ranking page (add depth, FAQs, internal links pointing at it). Highest ROI.
- **Position 1–7 + low CTR** → *now* rewrite the title/meta. Not before.
- **Position 20+** → needs a better page or more authority. Consider whether a dedicated page should exist for that query at all.

### 2B. Find your accidental rankings

In the QUERIES tab, look for queries you never targeted. If you're getting impressions for something like "form 11 LLP due date" and have no page for it — **that's a page you should write.** Google is telling you where the gap is.

### 2C. Use the PAGES tab as a content audit

**Performance → PAGES tab.** Any page with lots of impressions and near-zero clicks is either (a) ranking for the wrong intent, or (b) has a title that doesn't match what searchers want. Any money page with *zero* impressions after 8 weeks needs more content and more internal links.

### 2D. Filters worth knowing

- **+ Add filter → Query → doesn't contain → "avenue"** — strips your brand searches. This is your *real* SEO number. Right now it's ~14 clicks/3mo. Track this, not the headline 27.
- **+ Add filter → Search type → Web vs Image** — image search can be free traffic for calculators/infographics.
- **Compare → date range** — month over month is the only trend that matters at this stage.
- **Country filter → India** — filter out irrelevant international impressions.

### 2E. Break the 1,000-row limit

The GSC UI caps at 1,000 rows. Connect **Looker Studio** (free) → *Add data → Search Console* → point it at `sc-domain:companyavenueadvisory.com`. You get unlimited query rows and can build a "position 8–20" filtered view that updates itself. Worth 30 minutes, once.

### 2F. Other GSC things actually worth doing

- **Indexing → Pages → weekly.** Watch "Crawled – currently not indexed" (usually thin content — a real signal) vs "Discovered – currently not indexed" (just queue time — ignore).
- **Enhancements → Breadcrumbs / FAQ / Merchant listings.** These report on your schema. If FAQ items stop appearing, something broke.
- **Experience → Core Web Vitals.** Fix only if it reports "Poor" URLs. Yours is a static Next.js site so this is likely fine — verify once.
- **Settings → Crawl stats.** Rising crawl rate = Google finding the site more interesting. A useful health signal.
- **Sitemaps.** Should show 130 discovered. After Section 1 it should show ~183 — a good way to confirm the deploy worked.

---

## 3. ✅ DONE — FAQPage schema on every service page

**The problem:** `faqSchema` was used in exactly one file (`CityLandingPage.tsx`), so only the
7 city pages were eligible for FAQ rich results. Meanwhile **50 service components already had
well-written FAQ Q/A arrays rendered on-page** — the content existed, it just was never emitted
as structured data.

**What was done (21 Jul 2026):** pure wiring, no content invented.

- Extracted all 50 `faqs` arrays into plain modules under `src/lib/faqs/`. This was necessary
  because the section components are `"use client"` — a server page **cannot** import a value
  across that boundary (it silently gets a client-reference stub, which fails at prerender).
  Both sides now import the same plain data module.
- Every dedicated `/services/*` page emits `faqSchema(...)` alongside its existing schema.
- The generic `services/[slug]` route emits `Service` + `BreadcrumbList` + `FAQPage` from its own
  `serviceDetails` map — that one edit covered the remaining 30 pages, which previously had **no
  service or breadcrumb schema at all**.
- Homepage now emits FAQPage from its existing FAQ section.

`FAQPage` is emitted **only where FAQs are actually rendered on the page** — schema that doesn't
match visible content is a Google violation, so the generic route guards on `detail.faqs?.length`.

**Result — verified against a production build:**

```
service pages with FAQPage schema:   7 → 86  (86/86)
homepage FAQPage:                    yes
```

**Why it matters more in 2026:** FAQ blocks are the preferred extraction target for AI Overviews,
Perplexity and ChatGPT. A clean question→answer pair is the most quotable content format there is.
Ties directly into `GEO-STRATEGY.md`.

**Still to do:** after deploy, validate at **search.google.com/test/rich-results**:
- Home → Organization / LocalBusiness + FAQPage
- Service page → Service + BreadcrumbList + FAQPage
- Guide page → HowTo + FAQPage + BreadcrumbList
- Blog post → BlogPosting + BreadcrumbList

Fix errors only. Warnings are usually fine.

---

## 4. Internal linking — topic clusters (partly done)

**Done 21 Jul 2026:** `src/lib/content-links.ts` maps every content category to its parent money
page, and all blog/guide/template detail pages now link **up** to that service plus **sideways** to
3 sibling articles. That's the cluster→pillar half of the structure.

**Still to do:** the pillar→cluster half — service pages don't yet link *down* to their articles.

Google reads internal links as "which topics does this site actually specialise in". Clustered
content measurably outperforms isolated pages and holds rankings far longer.

**The structure to build:**

```
PILLAR: /services/gst-registration
   ├── /services/gst-filing            (sibling service)
   ├── /services/gst-amendment         (sibling service)
   ├── /services/gst-registration-delhi   (local cluster)
   ├── /services/gst-registration-dwarka  (local cluster)
   ├── /calculators/gst-calculator     (tool)
   ├── /verify/gst-verification        (tool)
   └── /blog/<gst posts>               ← once Section 1 ships
```

Rules:
- ✅ Every blog post links **up** to its parent service page, with descriptive anchor text
  ("GST registration" — never "click here"). Driven by `src/lib/content-links.ts`.
- ⬜ Every service page should link **down** to 2–3 relevant blog posts + its calculator + its city
  variants. Invert `content-links.ts` (category → posts) and render a "Related reading" block in
  the service page template — it then maintains itself as posts are added.
- ⬜ 2–5 contextual internal links per 1,000 words of body copy inside article text itself.
- ⬜ City pages cross-link to the parent national service page and to each other where sensible.

---

## 5. Google Business Profile (biggest local lever)

This is what puts you in the **map pack** for "CA near me / CA in Janakpuri". Unchanged from the previous version of this doc, still the #2 priority:

1. Claim/verify **Company Avenue Advisory Pvt. Ltd.** at business.google.com.
2. **Primary category:** Chartered Accountant. Secondary: Business Management Consultant, Accounting Firm, Tax Consultant.
3. NAP must match the website footer **character for character**: `209, Jaina Tower 1, District Center, Janakpuri, New Delhi, Delhi 110058` · `+91 99537 19111`.
4. All services listed, 8–10 photos (office, team, logo), hours Mon–Sat 9–7.
5. **Reviews are the ranking factor.** There's a meaningful jump at ~10 reviews, and after that *velocity* (reviews per month) matters more than lifetime total. Ask every happy client. Make it a habit, not a campaign.
6. Post weekly (a filing deadline reminder is enough — it's a freshness signal).

Note: proximity to the searcher is the #1 map-pack factor and you cannot change it. You can max out everything else.

---

## 6. Off-site trust signals (what actually moves position 28 → page 1)

Your on-page work is largely done. Position now moves on authority. In rough order of effort-to-value for an Indian CA firm:

- **Bing Places** — takes 10 minutes, and ChatGPT's web search runs on Bing. See `GEO-STRATEGY.md`.
- **Foursquare** — official OpenAI partner, supplies most of ChatGPT's local business answers.
- **Indian directories:** Justdial, Sulekha, IndiaMART, TradeIndia. NAP identical everywhere.
- **Professional listings:** ICAI member directory, local trade/chamber bodies, Janakpuri/Dwarka business associations.
- **Digital PR that's actually achievable:** quote-based contributions to Indian startup/SME publications on GST/compliance deadline stories. One genuine editorial link outweighs fifty directory listings.
- **LinkedIn**: publish the blog posts as LinkedIn articles with a link back. Not a ranking factor directly, but it's how these posts get discovered and cited.

Avoid paid link schemes. For a CA firm — a YMYL (Your Money Your Life) category — Google applies extra scrutiny and manual-action risk is real.

---

## 7. Operational — indexing

### 7A. Check what's indexed
- Quick: search `site:companyavenueadvisory.com` (approximate).
- Accurate: **Indexing → Pages**.
- Single URL: paste into the **Inspect any URL** bar.

### 7B. Request indexing (~10–15/day limit)

Money pages — mark off as you go:

- [x] `/` (home)
- [x] `/services/private-limited-company`
- [x] `/services/gst-registration`
- [x] `/services/trademark-registration`
- [x] `/services/income-tax-return`
- [x] `/services/llp-registration`
- [x] `/services/one-person-company`
- [x] `/services/roc-compliance`
- [x] `/services/private-limited-company-registration-delhi`
- [x] `/services/gst-registration-delhi`
- [ ] `/services/trademark-registration-delhi`  ← **resume here**
- [ ] `/services/company-registration-janakpuri`
- [ ] `/services/gst-registration-dwarka`
- [ ] `/services/company-registration-gurgaon`
- [ ] `/services/company-registration-noida`

**After Section 1 ships:** request indexing for your 8–10 strongest blog posts too. The rest get picked up from the sitemap.

Request each URL **once**. Re-requesting daily does nothing.

### 7C. Old URLs / 404s

The old site had 556 indexed pages. Check **Indexing → Pages → "Not found (404)"** monthly and add Vercel 301 redirects in `next.config.ts` for any old URL that was getting real traffic. Low-value 404s can just be left to drop out.

---

## 8. Analytics

**Env (Vercel):** `NEXT_PUBLIC_GA_ID=G-P3LQECEJ5L`, `NEXT_PUBLIC_GTM_ID` **blank**. Never both — that double-counts every visitor.

**GA4 → Admin → Events → mark as key event:**

| Event | Fires when |
|---|---|
| `generate_lead` | `/thank-you` loads after form submit |
| `whatsapp_click` | any WhatsApp button/float |
| `call_click` | any `tel:` link |

Not yet wired (needs the lead-gen build): `calculator_lead`, `lead_magnet_download`, `consultation_booked`.

**Also link GA4 ↔ Search Console** (GA4 → Admin → Product links → Search Console). Lets you see which landing pages convert *from organic specifically* — the report that tells you which SEO work is actually paying.

---

## 9. 🆕 Government scheme / grants directory — research findings

You asked whether there's an API to power a startup-grants page (like `startupgrantsindia.com`). I checked every plausible source directly.

### 9A. Is there an official API? **No.**

| Source | Status (verified 21 Jul 2026) |
|---|---|
| **myScheme.gov.in** (NeGD/MeitY, ~4,000 schemes with structured eligibility) | **No public API.** The site is a static Next.js export — `__NEXT_DATA__` is empty and all content loads at runtime from `api.myscheme.gov.in`, which returns `{"message":"Unauthorized"}` without an `x-api-key`. Undocumented, no signup, no bulk download. Its sitemap contains only 38 URLs and **zero** individual scheme pages, so there's nothing legitimately crawlable either. Using the frontend's embedded key would be brittle (rotates without notice) and outside its terms. **Don't build on it.** |
| **data.gov.in (OGD)** | You already have a working key and client — `src/lib/datagovin.ts` (powers Company Name Search). The `lists` catalog endpoint works, but the 237k records are statistical datasets and user visualisations. **There is no maintained scheme/grant registry resource.** Datasets are also periodic snapshots, not live — you already handle that honestly via `datasetUpdatedDate`. |
| **API Setu** (`directory.apisetu.gov.in`) | Real and well-run, but it's **identity & document verification** — DigiLocker, PAN, driving licence, CBSE, e-District. Nothing about schemes or funding. |
| **Startup India** | No public API. Blocks automated requests (403). Does publish a **Schemes Playbook PDF** (~6 MB, June 2026) — a legitimate, citable, curated source. |
| **BIRAC / DST / MeitY / state startup portals** | Plain HTML sites. No APIs. |
| **Third-party** | `startupgrantsindia.com` is a paywalled product, no public API. The HuggingFace `shrijayan/gov_myscheme` dataset is a community scrape — stale and no licensing guarantee. Fine as a *seed*, not as a live source. |

**Conclusion: there is nothing to integrate. Anyone doing this is maintaining a curated dataset by hand.** So should you.

### 9B. Why building it manually is actually the better play

The competitor from your screenshot claims 1,810 programs. **Their sitemap has 11 URLs.** Everything sits behind a signup wall and a client-side app — meaning *none of those 1,810 programs are indexable*. They are invisible in Google search for scheme-specific queries.

That's the opening. A **statically generated, fully indexable** directory of 40–60 well-chosen schemes will out-rank a login-walled database of 1,810 without much of a fight. Depth of coverage is not what wins here; crawlability is.

And it fits your funnel exactly: a founder hunting for SISFS money needs DPIIT recognition, incorporation, GST and ITR — all of which you already sell. You even have `/services/startup-india` sitting there.

### 9C. Suggested build (mirrors your existing calculators/guides pattern)

- **`src/lib/schemes.ts`** — typed array. Per scheme: `slug, name, ministry, amountMin/Max, equityFree, stage[], sector[], states[], dpiitRequired, eligibility[], documents[], deadline, applyUrl, lastVerified`.
- **`/schemes`** hub + **`/schemes/[slug]`** static pages. `GovernmentService` + `FAQPage` + `BreadcrumbList` JSON-LD each.
- **Faceted static pages — this is where the SEO traffic is:** `/schemes/for-women-entrepreneurs`, `/schemes/msme`, `/schemes/dpiit-recognised`, `/schemes/delhi`, `/schemes/equity-free-grants`. These map to real search queries; the individual scheme pages mostly won't.
- **`/schemes/eligibility-checker`** — pure client-side filter over the same data. No API needed. Gate the full result list behind an email capture → fires `generate_lead`. Same play as the calculators, and a much stronger lead magnet.
- **Show `lastVerified` on every scheme page.** Deadlines move constantly. Being visibly honest about data freshness is both an E-E-A-T signal and the right thing to do — same principle you already applied to `datasetUpdatedDate` in the company-name tool.
- **Refresh quarterly** against the Startup India Playbook PDF + the individual ministry portals. Budget ~2 hours a quarter.

Start with ~15 schemes that match your actual client base (SISFS, MSME/Udyam-linked, CGTMSE, Delhi & UP state startup policies, PMEGP, Stand-Up India, women-founder schemes) rather than trying to cover everything.

---

## The realistic timeline

| When | What to expect |
|---|---|
| **Now (month ~2)** | 27 clicks, position 28. Brand terms working. Non-brand hasn't started. **This is on schedule.** |
| **+4–6 weeks after Section 1 ships** | Blog posts start picking up long-tail impressions. Avg position should improve — partly because you'll rank well for *easier* queries, which pulls the average down. |
| **Month 3–5** | With GBP active + reviews coming in, map pack for "CA in Janakpuri / Dwarka" is realistic. |
| **Month 4–8** | Competitive terms ("GST registration in Delhi") begin to move. Requires the backlink/citation work in Section 6. |
| **Month 8–12** | Top-3 local is achievable *if* GBP reviews are consistent and content keeps shipping. |

**Google Ads remains the shortcut.** SEO builds the asset; Ads buys leads next week. The city landing pages are already built as ad destinations. UTM format: `?utm_source=google&utm_medium=cpc&utm_campaign=gst-delhi`.

---

## Still not built (from the CAPL spec)

- ~~`/blog/[slug]`, `/guides/[slug]`, `/templates/[slug]` routes~~ — ✅ done 21 Jul 2026
- ~~FAQ + `faqSchema` on the service pages~~ — ✅ done 21 Jul 2026 (86/86)
- Internal linking: pillar→cluster direction still pending — Section 4
- Contact form: exact field set + validation + reCAPTCHA v3 + `/thank-you` redirect
- Calculator lead-capture gates
- 3 gated lead-magnet PDFs
- Exit-intent popup
- Core Web Vitals + image WebP/lazy-load audit
- Scheme directory — Section 9

---

## Glossary

| Term | Plain English |
|---|---|
| **Indexed** | Google saved the page in its database. Not indexed = cannot appear in search, ever. |
| **Crawled** | Googlebot visited. Comes before indexing; doesn't guarantee it. |
| **Impression** | Your page appeared in someone's results — even at position 28 where nobody scrolls. |
| **Average position** | Mean rank across all impressions. 28 = page 3. Dropping this number is the whole game right now. |
| **CTR** | Clicks ÷ impressions. Heavily determined by position — 1.2% at position 28 is normal, not a fault. |
| **Striking distance** | Queries at position 8–20 — close enough that a modest push reaches page 1. Best ROI in any GSC account. |
| **Brand vs non-brand** | Searches for your name vs for your service. Non-brand is the only real measure of SEO progress. |
| **Topic cluster** | A pillar page + supporting pages, interlinked, so Google sees genuine subject depth. |
| **Canonical** | "This is the official URL for this page." Every page here has one. |
| **Schema / JSON-LD** | Machine-readable facts (address, hours, FAQs). Powers rich results and AI citations. |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trust. Google applies it hardest to finance/legal (YMYL) sites — which you are. |
| **YMYL** | "Your Money or Your Life" — categories where Google demands higher quality. CA services qualify. |
| **Domain property** (`sc-domain:`) | GSC setup covering http/https/www/non-www at once. You have this — the right choice. |
