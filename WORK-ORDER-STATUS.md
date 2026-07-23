# Developer Work Order — Status Report

**Re:** Work Order dated 22 July 2026 (Anshika Singh / CA Jatin Aggarwal)
**Updated:** 23 July 2026 · **Build:** ✓ compiled successfully, all fixes verified in prerendered HTML

**Legend:** ✅ Done this round · ✔️ Was already in place · 🔧 Partial (blocked) · ⏳ Waiting on Jatin/assets

---

## Priority 1 — Security & Credibility

### 1.1 — Admin panel password · ✅
The `/admin/consultations` panel uses HTTP Basic Auth with credentials read from
**environment variables** (`ADMIN_USER` / `ADMIN_PASSWORD`) — not hardcoded, not in a database.
- **Done:** Replaced the weak `admin / admin@123` with a strong generated credential in local `.env.local`; added a best-effort per-IP login throttle (10 fails / 15 min → HTTP 429) to `src/middleware.ts`; documented rotation in the README.
- **Was already done:** Auth was already env-based (rotation = change the var + redeploy, no code change).
- **Needs you:** Add the new `ADMIN_USER` / `ADMIN_PASSWORD` to Vercel env vars + redeploy, and share the password securely (see hand-off note at the bottom).

### 1.2 — Placeholder CIN & GSTIN · ⏳
Footer shows placeholder `CIN U74999MH2015PTC260940` and `GSTIN 07AABCC1234D1Z5`.
- **Verified:** Both strings exist in **exactly one place** — `src/lib/constants.ts` (the footer and everything else reads from there). They are **not** in the Organization schema, About, or Terms. So this is a clean 2-line change.
- **Needs Jatin:** the **real CIN + GSTIN**. Once provided, updated everywhere instantly.

### 1.3 — Stats counters rendering as 0 · ✅
Animated counters ("Years of Experience", etc.) served `0` in the server HTML that Google reads.
- **Done:** Reworked `src/components/ui/AnimatedCounter.tsx` to initialise with the **real value** (SSR-correct, present in the initial HTML), and animate on the client only after scroll-in — with a reduced-motion guard. Verified: homepage HTML now contains `1,000`, `15`, etc. instead of `0`.
- **Needs Jatin (optional):** confirm the final numbers; current claims (15+, 1000+, 98%, 25+, 100%) are in place.

### 1.4 — Stock hero image · 🔧
- **Verified already done:** The hero **no longer uses Unsplash** — it loads a local image. No request to `images.unsplash.com` from the hero.
- **Still open:** Unsplash is used site-wide on ~33 other files (About, WhyChoose, ~30 service pages, blog images) and `next.config.ts` still whitelists it.
- **Needs you:** real office/team photos → I'll convert to WebP/AVIF, serve via `next/image` with alt text, and remove the Unsplash domain from config once none remain.

### 1.5 — Testimonials · 🔧
- **Verified already done:** The homepage pulls **live Google reviews** (Google Places), showing the real rating/count when available. **No Review/AggregateRating schema exists** anywhere — so the "don't add schema until real" rule is already satisfied.
- **Still open:** when the API returns nothing, it falls back to 5 placeholder personas.
- **Needs Jatin:** the A/B decision (real reviews vs remove) + confirm the Google Place has real reviews. On request I'll strip the fabricated fallback so nothing fake can ever render.

---

## Priority 2 — Analytics Migration to GTM

### 2.1 — Remove hardcoded gtag, install GTM · ✅ (code) / ⏳ (Vercel + publish)
- **Was already done:** The analytics component already supports the full GTM snippet + `<noscript>`; it just wasn't switched on.
- **Done:** In `.env.local`, set `NEXT_PUBLIC_GTM_ID=GTM-KMKTTDKD` and **blanked** `NEXT_PUBLIC_GA_ID` (removing the direct `G-P3LQECEJ5L` gtag) so pageviews aren't double-counted — GA4 now fires inside the container.
- **Needs you:** Mirror those two env values in Vercel + redeploy; then Anshika runs **GTM Preview** and does the **first container Publish** (required, or the snippet loads an empty container).

### 2.2 — DataLayer events for conversions · ✅
- **Done:**
  - `data-track="whatsapp"` / `data-track="call"` added to **150+** WhatsApp/phone links across the site (plus the central Navbar/Footer/CTA/City CTAs).
  - `consultation_submit` fires on **successful** form submission (not button click).
  - `calculator_used` fires on first interaction with **every** calculator.
  - `verify_used` fires on a successful lookup in all **6** verification tools.
- **Was already done:** `whatsapp_click`, `call_click` (mobile bar) and `generate_lead` (/thank-you).
- **Needs you:** confirm each event in GTM Preview after deploy.

---

## Priority 3 — SEO Bug Fixes

### 3.1 — Duplicate brand suffix in blog titles · ✅
Blog titles rendered `… | Company Avenue Advisory | Company Avenue Advisory`.
- **Done & verified:** blog article titles now show the brand exactly once in `<title>`.

### 3.2 — Homepage blog cards must link to individual articles · ✅
The static "Knowledge Hub" cards all linked to `/blog`.
- **Done:** each card now links to its own `/blog/<slug>`.
- **Note:** when the live-news feed is active, those cards link to external news by design — worth a quick Jatin confirmation on whether the homepage should surface *our* articles or *live* news.

### 3.3 — Verify no other pages share the title bug · ✅
- **Audit result:** the bug was **site-wide**, not just blog — it affected every child page that hard-coded the brand into its title (all ~80 service pages, ~30 calculators, verify pages, templates, thank-you).
- **Done & verified:** stripped the redundant brand from **77 page titles** in one pass; the root template now adds it exactly once. Confirmed across service / calculator / verify / blog / template pages in the fresh build. Correct pages (about, contact, pricing, hubs) were untouched.

---

## Priority 4 — Access & Governance

- **Done:** README expanded with the **deployment flow**, a full **environment-variable inventory**, **admin-panel config + password rotation**, the **MongoDB Atlas IP-allowlist gotcha**, and the **GTM analytics** setup.
- **Needs you / Jatin (external, cannot be done in code):** add jatin@ to Vercel; confirm registrar + expiry; add jatin@ as Cloudflare admin on the zone; add the company GitHub org to the repo.

---

## Summary Table

| # | Task | Status |
|---|---|---|
| 1.1 | Admin panel password | ✅ Done — needs creds set in Vercel |
| 1.2 | Placeholder CIN / GSTIN | ⏳ Needs real values from Jatin |
| 1.3 | Stats counters rendering as 0 | ✅ Done & verified |
| 1.4 | Stock hero image | 🔧 Hero already off Unsplash; rest needs real photos |
| 1.5 | Testimonials | 🔧 Live reviews already wired; needs Jatin's decision |
| 2.1 | Remove gtag, install GTM | ✅ Code/config done — needs Vercel env + Publish |
| 2.2 | DataLayer conversion events | ✅ Done — verify in GTM Preview |
| 3.1 | Duplicate brand in blog titles | ✅ Done & verified |
| 3.2 | Homepage cards → article URLs | ✅ Done |
| 3.3 | Title-bug audit (other pages) | ✅ Done & verified (77 pages fixed) |
| 4 | Access & governance / README | 🔧 README done; account access is external |
