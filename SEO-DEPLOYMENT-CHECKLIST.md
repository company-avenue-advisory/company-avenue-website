# SEO Deployment & Google Search Console Playbook

This covers everything **you** need to do after the code is deployed. Follow in order.

---

## 0. Plain-English: what these tools actually are

**You are not writing any code for this. You are only copying two IDs from Google and pasting them into a settings box.**

| Thing | What it actually is | Analogy |
|---|---|---|
| **GA4** (Google Analytics 4) | The **report**. Tells you how many people visited, which pages they read, where they came from (Google / WhatsApp / ads), and how many became leads. | The *dashboard* in your car — shows speed, fuel, distance. |
| **GTM** (Google Tag Manager) | The **container/socket board**. You install GTM once, then you can plug in GA4, Google Ads conversion tracking, Meta Pixel etc. from a website — **without a developer touching the code again**. | The *extension board* — plug in new devices anytime, no rewiring. |
| **Container ID** (`GTM-XXXXXXX`) | Just an **ID string**, not an API key. It tells Google "this website is mine". | Your car's number plate. |
| **Measurement ID** (`G-XXXXXXXXXX`) | GA4's ID string. | Same idea, for the dashboard. |

> **There is no "API key" and nothing to pay for.** Both GA4 and GTM are 100% free. You just need the two ID strings.

**Why bother?** Two reasons:
1. You'll know **which pages actually bring you clients** (so you invest in what works).
2. **Google Ads cannot optimise properly without it.** If Ads can't see which clicks became leads, it just buys you clicks. Once conversion tracking is on, Google Ads automatically hunts for people who *actually fill your form* — this is the single biggest factor in not wasting ad money.

### Where is the analytics code in this project?

Already written — you don't touch it:
- `src/components/analytics/Analytics.tsx` ← loads the Google scripts
- `src/lib/gtag.ts` ← sends the events (`generate_lead`, `whatsapp_click`, `call_click`)
- Both are already hooked into `src/app/layout.tsx` (every page)

It reads your ID from an environment variable. **If the ID is blank, nothing loads at all** (that's why you don't see any Google script on the site right now). Paste the ID → scripts turn on. That's the whole mechanism.

---

## 1. Create your GTM container (get the `GTM-XXXXXXX` ID)

You're on the "Add a New Account" screen. Fill it exactly like this:

| Field | What to enter |
|---|---|
| Account Name | `Company Avenue Advisory` |
| Country | **India** (change it from United States) |
| Share data anonymously | Leave **unchecked** |
| Container name | `companyavenueadvisory.com` |
| Target platform | **Web** ← click this one |

Then:
1. Click **Create** (top right) → accept the Terms of Service (scroll down, click **Yes**).
2. A popup appears titled **"Install Google Tag Manager"** showing two blocks of code.
3. **Ignore the code — you don't need it. I've already added it.**
4. Look at the **top of that popup** (or the top-right of the GTM screen). You'll see your **Container ID**:

   ```
   GTM-XXXXXXX     ← copy this
   ```
5. Click **OK** to close the popup.

**That `GTM-XXXXXXX` string is the only thing you need from Tag Manager.**

---

## 2. Create GA4 and connect it inside GTM

GTM is just the socket board — GA4 is the thing you plug into it.

**Step A — make the GA4 property:**
1. Go to **analytics.google.com** → **Start measuring** (or Admin → Create → Property).
2. Property name: `Company Avenue Advisory`, timezone **India**, currency **INR**.
3. Choose platform **Web**, website URL `https://companyavenueadvisory.com`.
4. It gives you a **Measurement ID** that looks like `G-XXXXXXXXXX` → **copy it**.

**Step B — plug GA4 into GTM:**
1. Back in **Tag Manager** → **Tags** → **New**.
2. **Tag Configuration** → choose **Google Tag**.
3. Paste your `G-XXXXXXXXXX` into the **Tag ID** field.
4. **Triggering** → choose **All Pages** (Initialization - All Pages also works).
5. Name it `GA4 - Config` → **Save**.
6. Click the blue **Submit** button (top right) → **Publish**.

> ⚠️ **Nothing goes live in GTM until you hit Submit → Publish.** This is the #1 beginner mistake — people build tags and wonder why no data appears.

---

## 3. Put the ID into the website

You only set **`NEXT_PUBLIC_GTM_ID`**. Leave `NEXT_PUBLIC_GA_ID` **blank** — because GA4 is already loading *inside* GTM. Setting both would count every visitor twice.

**For local testing** — in `avenue-advisory/.env.local`:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=
```

**For the LIVE site** — ⚠️ this is the step people miss. `.env.local` is a *local* file and is **never uploaded** to your host. You must add the variable in your **hosting dashboard**:

- **Vercel:** Project → **Settings** → **Environment Variables** → Add
  - Name: `NEXT_PUBLIC_GTM_ID`
  - Value: `GTM-XXXXXXX`
  - Environments: tick **Production** (and Preview)
  - → **Save**, then **Redeploy** (Deployments → ⋯ → Redeploy). *The variable only takes effect on a fresh deploy.*
- **Netlify:** Site configuration → Environment variables → same idea, then redeploy.

**How to confirm it worked:** open your live site → right-click → **View Page Source** → Ctrl+F for `googletagmanager`. If you see it, you're live. (Or install the free **Tag Assistant** Chrome extension.)

---

## 4. Mark your conversions in GA4

The website already *sends* these events. You just have to tell GA4 "these ones are the important ones".

In **GA4 → Admin → Events** (wait ~24h after launch for them to appear), toggle **"Mark as key event"** on:

| Event | What it means |
|---|---|
| `generate_lead` | Someone submitted the contact form (fires on `/thank-you`) |
| `whatsapp_click` | Someone tapped WhatsApp |
| `call_click` | Someone tapped your phone number |

Once these are key events, you can import them into **Google Ads** as conversions — that's what lets Ads optimise for *leads* instead of *clicks*.

---

## 5. Deploy the site — ✅ DONE

The new build is live on `companyavenueadvisory.com`. Sanity-check these load:

- `https://companyavenueadvisory.com/sitemap.xml`  → **130 URLs**
- `https://companyavenueadvisory.com/robots.txt`   → references the sitemap
- `https://companyavenueadvisory.com/services/gst-registration-delhi` → new city page

---

## 6. Clean up the OLD sitemaps — ✅ DONE

Search Console previously listed 4 sitemaps from the old website (a 556-page `sitemap.xml`, a `sitemap.rss`, a broken `sitemap_index.xml`, and an `http://www...` one). Those are now gone from the list — nothing left to remove.

*(If any reappear: Search Console → **Sitemaps** → ⋮ menu on the row → **Remove sitemap**.)*

---

## 7. Submit the NEW sitemap — ✅ NOTHING TO DO

**You don't need to submit anything.** Here's why this confused you:

The old website's sitemap was submitted at **the exact same URL** your new site uses — `https://companyavenueadvisory.com/sitemap.xml`. So that one existing entry in Search Console is still valid; it just now points at your *new* sitemap. Google re-read it after you deployed.

Proof it worked — check the row in Search Console:

| Column | Value | Meaning |
|---|---|---|
| Submitted | `Aug 6, 2025` | When it was *first ever* registered. **Irrelevant — ignore this date.** |
| **Last read** | **`Jul 11, 2026`** | Google re-fetched it *after your deploy*. ✅ |
| **Status** | **`Success`** | No errors. ✅ |
| **Discovered pages** | **`130`** | **This is your new sitemap.** ✅ |

That `130` is the giveaway. Your new sitemap contains exactly:
> 15 static pages + 79 services + 7 city pages + 24 calculators + 5 verify tools = **130**

The old one had 556. So Google has definitively swapped to the new one. **Do not remove and re-add it** — that would only reset the history for no benefit.

---

## 8. Confirm the domain is verified

You're using a **domain property** (`sc-domain:companyavenueadvisory.com`) — good, it covers http/https/www automatically. Nothing to do if it already says verified.

---

## 9. Request indexing for your money pages (fast-track)

For the **top ~15 pages**, don't wait for Google to crawl — push them manually:

1. Paste a URL into the **"Inspect any URL"** bar at the top of Search Console.
2. Wait for the check → click **"Request Indexing"**.
3. Repeat for each. (Google limits to a few dozen/day — that's fine.)

Priority order:

- `/` (home)
- `/services/private-limited-company`
- `/services/gst-registration`
- `/services/trademark-registration`
- `/services/income-tax-return`
- `/services/llp-registration`
- `/services/one-person-company`
- `/services/roc-compliance`
- The 7 city pages:
  - `/services/private-limited-company-registration-delhi`
  - `/services/gst-registration-delhi`
  - `/services/trademark-registration-delhi`
  - `/services/company-registration-janakpuri`
  - `/services/gst-registration-dwarka`
  - `/services/company-registration-gurgaon`
  - `/services/company-registration-noida`

The rest get discovered automatically via the sitemap over 1–3 weeks.

---

## 10. Handle old URLs that no longer exist (avoid 404 spikes)

The old site had 556 indexed pages. Any that don't exist on the new site will 404. Two options:

- **Best:** 301-redirect old URLs to the closest new page (do this at the host/CDN level, e.g. Vercel `redirects` or your server config). Send removed service URLs → the matching new `/services/...` page, everything else → `/`.
- **Acceptable:** let them 404. Our custom 404 page links back to services, and Google drops dead URLs over a few weeks.

Check **Search Console → Pages (Indexing report)** weekly for "Not found (404)" and add redirects for any high-value old URLs.

---

## 11. Validate structured data (schema)

Test 3–4 page types in Google's **Rich Results Test** (search.google.com/test/rich-results):

- Home → should detect **Organization / LocalBusiness**
- Any service page → **Service** + **BreadcrumbList**
- Any city page → **Service** + **BreadcrumbList** + **FAQPage** (FAQs can show directly in search results)

Fix nothing unless it reports an error — "warnings" are usually fine.

---

## 12. Google Business Profile (biggest local-SEO lever for "CA near me")

This is what makes you show up in the **map pack** for "CA services near me / in Delhi". Not a website task but do it:

1. Claim/verify **Company Avenue Advisory Pvt. Ltd.** at business.google.com.
2. **Primary category:** Chartered Accountant. Add: Business Management Consultant, Accounting Firm, Tax Consultant.
3. Name / Address / Phone must match the website footer **exactly**:
   `209, Jaina Tower 1, District Center, Janakpuri, New Delhi, Delhi 110058` · `+91 99537 19111`.
4. Add every service, upload 8–10 photos (office, team, logo), set hours Mon–Sat 9–7.
5. Post weekly, and **ask every happy client for a Google review** — review count + recency is the #1 ranking factor for the map pack.

---

## 13. Before running Google Ads

- Confirm GA4 conversions are firing (see below), so you can optimise campaigns for leads, not clicks.
- Use the landing pages we built (city pages) as ad destinations for local campaigns.
- UTM format: `?utm_source=google&utm_medium=cpc&utm_campaign=gst-delhi`

---

## Analytics events already wired in code

Once `NEXT_PUBLIC_GTM_ID` is set, these fire automatically. In GA4 → Admin → Events, mark the ★ ones as **Conversions**:

| Event | Fires when | Mark as conversion |
|---|---|---|
| `generate_lead` | `/thank-you` page loads after form submit | ★ |
| `whatsapp_click` | Any WhatsApp button/float clicked | ★ |
| `call_click` | Any "Call Now" / tel: link tapped | ★ |

**Still to wire up** (needs the forms/calculators work below): `calculator_lead`, `lead_magnet_download`, `consultation_booked`.

---

## What's NOT done yet (remaining scope from the spec)

The SEO **foundation** is complete. These lead-gen items from the CAPL spec are separate build tasks still pending:

- Contact form: exact field set + validation + reCAPTCHA v3 + redirect to `/thank-you` (Section G1) — *verify the existing contact form matches and redirects to /thank-you*.
- Calculator lead-capture gates on all calculators (Section G2).
- 3 gated lead-magnet PDFs (Section G3).
- Exit-intent popup (Section G4).
- 12 blog articles (Section M).
- Core Web Vitals pass + image WebP/lazy-load audit (Section E).

Tell me when you want to tackle these and I'll do them next.

---

## Glossary — jargon in this file, in plain English

| Term | What it means |
|---|---|
| **Indexing** | Google saving your page into its search database. **Not indexed = cannot ever appear in search**, no matter how good it is. "Request indexing" = asking Google to look at a page now instead of waiting weeks. |
| **Crawling** | Google's bot *visiting* your page to read it. Crawling comes first, then indexing. |
| **Sitemap** (`sitemap.xml`) | A machine-readable list of every page on your site, so Google doesn't have to guess. Ours is auto-generated — **add a service to the code and it appears in the sitemap automatically**. |
| **robots.txt** | A text file telling Google which pages it may/may not visit. Ours allows everything except `/admin`, `/api/`, `/thank-you`. |
| **Canonical tag** | A hidden line saying "this is the *official* URL for this page." Prevents Google seeing `/page`, `/page/`, `/page?x=1` as 3 duplicate pages and splitting your ranking between them. Every page on the site now has one. |
| **Schema / structured data / JSON-LD** | Hidden, machine-readable facts about your business (address, hours, phone, services, FAQs). It's how Google can show your **star rating, FAQ dropdowns, and business info** directly in search results. Already added site-wide. |
| **Rich results** | Those fancy search listings with FAQs/stars/images instead of plain blue links. Powered by the schema above. |
| **301 redirect** | A permanent "this page moved here" instruction. Important because the **old website had 556 pages** — any of those URLs that no longer exist will 404. A 301 sends that old visitor (and Google) to the right new page instead of an error. |
| **404** | "Page not found." A few are harmless. Hundreds signal a broken site to Google. |
| **Meta title / meta description** | The blue clickable headline and the grey text under it in Google results. Not visible on your page itself — only in search. |
| **H1** | The single main headline of a page. Google uses it heavily to understand the topic. One per page. |
| **Money page** | A page that directly sells a service (e.g. `/services/gst-registration`) — as opposed to a blog post. These are the ones to prioritise for indexing. |
| **Key event / conversion** | An action you care about (form submit, WhatsApp click, call). Telling GA4 which events are "key" is what lets Google Ads optimise for real leads instead of random clicks. |
| **Environment variable** | A setting stored *outside* the code (like a password or an ID). Set on your hosting dashboard, not in the code files. |
| **Domain property** (`sc-domain:`) | A Search Console setup that covers `http`, `https`, `www` and non-`www` all at once. You already have this — it's the good option. |

---

## The realistic timeline (so you don't panic)

SEO is not instant. Here's what "normal" looks like:

| When | What to expect |
|---|---|
| **Day 1–3** | Google re-crawls the sitemap. Analytics starts showing visitors. |
| **Week 1–2** | Your money pages + city pages get indexed. Search `site:companyavenueadvisory.com` in Google to see what's in. |
| **Week 3–6** | You start ranking for *long-tail* / brand terms ("Company Avenue Advisory", "CA in Janakpuri"). |
| **Month 2–4** | Competitive terms ("GST registration in Delhi") begin to move — **this is where Google Business Profile reviews matter most**. |
| **Month 4–6+** | Top-3 for local terms is realistic *if* GBP is active and reviews keep coming. |

**Google Ads is the shortcut.** SEO builds the long-term asset; Ads buys you leads *tomorrow*. Do both — and now that conversion tracking is wired up, Ads will actually optimise properly.
