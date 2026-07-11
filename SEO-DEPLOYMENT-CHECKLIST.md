# SEO Deployment & Google Search Console Playbook

This covers everything **you** need to do after the code is deployed. Follow in order.

---

## 0. Before you start — set your analytics IDs

Open `.env.local` and fill these (leave blank to disable):

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX      # from tagmanager.google.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX      # only if you use GA4 directly (not needed if GTM is set)
```

Then **redeploy**. Until an ID is set, no analytics scripts load (that's intentional).
Recommended: create a GTM container, then add GA4 *inside* GTM. Only set `NEXT_PUBLIC_GTM_ID`.

---

## 1. Deploy the site

Push/deploy the new build to `companyavenueadvisory.com`. Confirm these URLs load in a browser:

- `https://companyavenueadvisory.com/sitemap.xml`  → should list ~160 URLs
- `https://companyavenueadvisory.com/robots.txt`   → should reference the sitemap
- `https://companyavenueadvisory.com/services/gst-registration-delhi` → new city page

---

## 2. Clean up the OLD sitemaps in Search Console (important!)

Your Search Console currently shows sitemaps from the **previous** website:

| Sitemap | Action |
|---|---|
| `.../sitemap.xml` (556 pages, old site) | **Delete** — those URLs now 404 |
| `.../sitemap.rss` (51 pages) | **Delete** if from old site |
| `.../sitemap_index.xml` ("Couldn't fetch") | **Delete** |
| `http://www.../sitemap.xml` (0 pages) | **Delete** |

**How:** Search Console → **Sitemaps** → click the ⋮ (3-dot) menu on each old row → **Remove sitemap**.
(Removing a sitemap only stops Google using it; it doesn't remove pages instantly — see step 6 for old URLs.)

---

## 3. Submit the NEW sitemap

Search Console → **Sitemaps** → "Add a new sitemap" → enter:

```
sitemap.xml
```

→ Submit. Status should become **Success** within a day and show ~160 discovered pages.

---

## 4. Confirm the domain is verified

You're using a **domain property** (`sc-domain:companyavenueadvisory.com`) — good, it covers http/https/www automatically. Nothing to do if it already says verified.

---

## 5. Request indexing for your money pages (fast-track)

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

## 6. Handle old URLs that no longer exist (avoid 404 spikes)

The old site had 556 indexed pages. Any that don't exist on the new site will 404. Two options:

- **Best:** 301-redirect old URLs to the closest new page (do this at the host/CDN level, e.g. Vercel `redirects` or your server config). Send removed service URLs → the matching new `/services/...` page, everything else → `/`.
- **Acceptable:** let them 404. Our custom 404 page links back to services, and Google drops dead URLs over a few weeks.

Check **Search Console → Pages (Indexing report)** weekly for "Not found (404)" and add redirects for any high-value old URLs.

---

## 7. Validate structured data (schema)

Test 3–4 page types in Google's **Rich Results Test** (search.google.com/test/rich-results):

- Home → should detect **Organization / LocalBusiness**
- Any service page → **Service** + **BreadcrumbList**
- Any city page → **Service** + **BreadcrumbList** + **FAQPage** (FAQs can show directly in search results)

Fix nothing unless it reports an error — "warnings" are usually fine.

---

## 8. Google Business Profile (biggest local-SEO lever for "CA near me")

This is what makes you show up in the **map pack** for "CA services near me / in Delhi". Not a website task but do it:

1. Claim/verify **Company Avenue Advisory Pvt. Ltd.** at business.google.com.
2. **Primary category:** Chartered Accountant. Add: Business Management Consultant, Accounting Firm, Tax Consultant.
3. Name / Address / Phone must match the website footer **exactly**:
   `209, Jaina Tower 1, District Center, Janakpuri, New Delhi, Delhi 110058` · `+91 99537 19111`.
4. Add every service, upload 8–10 photos (office, team, logo), set hours Mon–Sat 9–7.
5. Post weekly, and **ask every happy client for a Google review** — review count + recency is the #1 ranking factor for the map pack.

---

## 9. Before running Google Ads

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
