# GEO (Generative Engine Optimization) — Strategy & Implementation Plan

Goal: when someone asks ChatGPT / Gemini / Perplexity / Claude *"best CA for company
registration in Delhi"* or *"CA services near me"*, **Company Avenue Advisory** is named.

Researched July 2026. Sources listed at the bottom.

---

## ⚠️ The single most important finding — read this first

**For "near me" / local questions, your website is NOT the main lever. Your business
listings are.**

ChatGPT does not browse Google for local businesses. Independent analysis shows:

| Source | Role in ChatGPT local answers |
|---|---|
| **Foursquare** (official OpenAI partner) | supplies **70%+** of ChatGPT's local business results |
| **Yelp** | second major layer (listings, reviews, ratings) |
| **Bing index** | ChatGPT's *web* search runs on **Bing**, not Google |
| **Google Business Profile** | pulled into answers as trust/verification signal |

**What AI actually picks on:** businesses recommended by AI averaged **4.3★**, with
*consistent, verifiable* details across multiple platforms. **Review recency beats review
count** — 80 reviews from the last 6 months outranks 20 perfect reviews from 4 years ago.
Proximity matters *less* than in Google Maps; AI will recommend a slightly farther business
with stronger trust signals.

> **Translation:** you could have the best-optimised website in India and still never be
> recommended for "CA near me" if you're missing from Bing Places / Foursquare and have few
> recent reviews. **Do the listings first.**

---

## How each AI engine actually works (this dictates the tactics)

| Engine | How it sources | What wins |
|---|---|---|
| **Perplexity**, **Google AI Overviews** | Retrieve live web pages *at query time*, then cite | Crawlable, clean, extractable pages. Classic SEO still the foundation. |
| **ChatGPT** | Bing web index + Foursquare/Yelp for local | **Bing indexing** + listings + reviews |
| **Claude, Gemini** | Mix of training data + live retrieval | Being published, indexed & seen as authoritative *early* |

Only **11%** of domains get cited by *both* ChatGPT and Perplexity — each has different
citation logic, so you optimise for both paths, not one.

**Encouraging stat:** only **38%** of pages cited in AI Overviews rank in the top 10 (down
from 76% in mid-2025). **You don't need to outrank everyone** — pages structured cleanly
for extraction can win citations without top rankings. That's the opening.

---

## ✅ Already done (technical foundation)

- Organization / LocalBusiness (AccountingService) schema site-wide — NAP, hours, geo, areaServed
- Service + BreadcrumbList schema on service pages; **FAQPage** schema on city pages
- Self-referencing canonicals on every page · sitemap (130 URLs) · GA4
- **`robots.txt` now explicitly allows all AI crawlers** — GPTBot, OAI-SearchBot, ChatGPT-User,
  PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, Bingbot
- **`/llms.txt`** published (auto-generated from your services)
- 7 local city landing pages + footer internal links

> **Honest note on `llms.txt`:** adoption is ~10% of domains and studies show **no measurable
> citation impact** — GPTBot/ClaudeBot/PerplexityBot overwhelmingly skip it and crawl HTML
> directly. We added it because it's free and IDE/agent tools do use it. **Do not expect
> rankings from it.** Crawler control belongs in `robots.txt`, which is done.

---

## 🔴 MONDAY — Priority 1: Listings & reviews (do this before any content work)

This is ~80% of the "near me" outcome. None of it is a website task.

1. **Bing Places for Business** — `bingplaces.com` → claim & verify.
   **Critical: ChatGPT's web results come from Bing.** Most Indian firms skip this = your opening.
2. **Bing Webmaster Tools** — `bing.com/webmasters` → add the domain, submit
   `https://companyavenueadvisory.com/sitemap.xml`. (You've done Google; Bing is the ChatGPT one.)
3. **Foursquare** — `foursquare.com/venue/claim` → claim/create the listing. This is the
   single biggest ChatGPT local-data source and almost nobody in India claims it.
4. **Yelp** — create a business listing (low usage in India, but ChatGPT reads it).
5. **Google Business Profile** — complete every field (see SEO checklist Section 6).
6. **India directories** — Justdial, Sulekha, IndiaMART, TaxGuru profile, ICAI listing.
7. **NAP consistency — non-negotiable.** The *exact* same string everywhere:
   ```
   Company Avenue Advisory Pvt. Ltd.
   209, Jaina Tower 1, District Center, Janakpuri, New Delhi, Delhi 110058
   +91 99537 19111
   ```
   AI cross-checks these across platforms; mismatches destroy trust signals.
8. **Review engine (highest ongoing ROI):** ask *every* completed client for a Google review.
   Target **4.3★+ and a steady drip** — recency is weighted heavily. A simple WhatsApp
   template after each job closes is enough.

---

## 🟠 MONDAY — Priority 2: Keyword & intent repository

Build a sheet with these columns:
`Prompt/Question | Intent | Target page | Currently cited? (Y/N) | Which AI engine | Gap`

**Think in prompts, not keywords.** People type questions into AI, not keywords:

| Intent type | Example prompts to track |
|---|---|
| Local discovery | "best CA firm in Delhi", "CA services near me", "chartered accountant in Janakpuri" |
| Service + place | "company registration in Delhi cost", "GST registration Dwarka", "CA for startup in Gurgaon" |
| Comparison | "private limited vs LLP which is better", "OPC vs Pvt Ltd", "LLP or company for consultancy" |
| Cost | "how much does company registration cost in India", "GST registration fees" |
| Process | "how to register a private limited company", "documents required for GST registration" |
| Trust | "is Company Avenue Advisory legit", "best CA firm for startups India" |

**Baseline test (do this manually, free):** run 20–30 of these prompts through ChatGPT,
Perplexity, Gemini and Claude. Record who *is* being recommended. Those competitors are your
citation benchmark — look at where **they** are listed and cited, and get listed there too.

---

## 🟡 TUESDAY — Priority 3: On-page content optimization

Research finding: **the visible answer on the page matters most.** Schema helps
(content with proper schema has ~2.5x higher chance of appearing in AI answers) but
*"do not hide important answers in schema only."*

Apply to money pages (Pvt Ltd, GST, Trademark, ITR, ROC) and the 7 city pages:

1. **Answer-first structure.** Every H2/H3 = a real question. The **first 2–3 sentences
   immediately below it must fully answer it**, self-contained, no preamble. AI extracts
   that block. Bad: "Let's explore the process…" Good: "Private limited company registration
   in Delhi takes 7–10 working days and costs ₹X–₹Y including government fees."
2. **Be specific, not vague.** GEO rewards specificity: exact numbers, timelines, fees,
   form names (SPICe+, TM-A, REG-01), section references. Vague marketing copy never gets cited.
3. **Visible FAQs** answering real buyer questions (not schema-only). Your city pages already
   do this — extend the same to the main service pages.
4. **Comparison & cost content** — the highest-citation formats. "Pvt Ltd vs LLP", "OPC vs Pvt
   Ltd", "cost of company registration in Delhi 2026". These map directly to blog articles
   already planned in the CAPL spec (Section M) — **prioritise these 4 first.**
5. **Original data = citation magnet.** Publish something only you have: "We registered 500+
   companies in Delhi in 2026 — average timeline, common rejection reasons, cost breakdown."
   AI engines love citable primary statistics.
6. **E-E-A-T / author bios.** Finance & legal is YMYL — Google and AI weight credentials
   heavily. Add a named CA/CS author with qualifications + `Person` schema to key pages.
7. **Dates.** Show "Last updated: July 2026". Freshness is a live-retrieval ranking factor.
8. **Semantic HTML** — proper `<article>`, `<section>`, `<h1>`–`<h3>` hierarchy so crawlers
   parse structure cleanly. *(Ask me to audit this — it's a code task.)*

> **Do not artificially chop content into tiny chunks.** Google confirmed (June 2026) its
> systems understand multiple topics per page and surface the relevant part themselves.
> Organise for human readability; extractable structure follows.

---

## 🟢 Priority 4: Off-site authority (the long game, highest ceiling)

AI engines cite **third-party sources far more than your own site**. Being *talked about*
elsewhere beats self-description:

- **Get into listicles** — "best CA firms in Delhi", "top company registration consultants
  India". Reach out to the sites that already rank for those; these get cited constantly.
- **Reddit & Quora** — r/india, r/IndianStartups, r/personalfinanceindia. AI heavily cites
  these. Answer genuinely and helpfully; do **not** spam links.
- **Digital PR** — quotes in business/startup publications, YourStory, Inc42.
- **LinkedIn + Crunchbase** — entity consistency; strengthens the knowledge graph.
- **Wikidata entry** — helps AI recognise you as a distinct entity.

---

## 📊 Measuring it

**Free:** manually run your prompt list monthly across the 4 engines; log mentions in a sheet.
Also watch GA4 → Acquisition for referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`.

**Paid tools** (track brand mentions/citations across AI engines):

| Tool | Price | Best for |
|---|---|---|
| **Otterly.AI** | ~$29+/mo | Most affordable pure tracking; adds sentiment analysis |
| **Siftly.ai** | $79/mo Starter, $249/mo Growth | Tracking + GEO content generation. Aimed at B2B SaaS / e-commerce |
| **Peec AI** | mid | Citation intelligence / digital PR focus |
| **Semrush AI Toolkit** | add-on | If you already pay for Semrush |
| **Profound** | enterprise | Overkill here |

### Verdict on paid monitoring — **not yet**

These tools **measure**; they don't **fix**. They tell you "you're not mentioned" — which we
already know. The things that will actually get you mentioned for "CA near me" (Bing Places,
Foursquare, GBP, reviews) are not touched by any of them.

**Do this instead for the first ~3 months:** manually run your 20–30 prompt list across
ChatGPT / Perplexity / Gemini / Claude once a month and log results in a sheet. ~1 hour/month,
free, and at your current scale it gives the same signal. Use Siftly's **free audit tier** for
a one-time baseline snapshot.

**Revisit paid tracking once** you've done listings + reviews + answer-first content and are
actively iterating — that's when knowing *what's working* is worth $79/mo (~₹6,600/mo).

> ⚠️ Two cautions. **(1)** Most "best AI visibility tools 2026" articles you'll find are
> published *by* these vendors on their own blogs — they're marketing, not neutral reviews.
> **(2)** Be wary of the bundled "8–60 AI blog posts/month" content layers. CA/tax content is
> **YMYL** (Your Money or Your Life) — Google and AI engines apply the harshest E-E-A-T scrutiny
> to finance/legal. Mass-generated generic posts can actively hurt you. Fewer, genuinely expert
> articles bylined by a named CA/CS beat volume every time in this niche.

---

## ⏱️ Realistic expectations

- **Listings + reviews:** effects show in ChatGPT local answers in **2–6 weeks**.
- **Live-retrieval engines** (Perplexity, AI Overviews): follow your normal indexing — weeks.
- **Training-data engines** (base ChatGPT/Claude/Gemini answers): only update at retraining —
  **months**. Nothing makes this instant. Anyone promising otherwise is selling something.

**Order of impact for your goal, highest first:**
1. Bing Places + Foursquare + GBP + reviews ← *do first, biggest lever*
2. Bing Webmaster Tools indexing
3. Comparison/cost content with answer-first structure
4. Third-party listicles & Reddit presence
5. Schema/technical *(already done)*

---

## Sources

- [How ChatGPT, Google AI Overviews, and Perplexity Source Information in 2026 — Leapd](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)
- [Inside ChatGPT: How It Decides Which Local Businesses to Recommend — Local AI Audit](https://local-ai-audit.com/blog/how-chatgpt-finds-local-businesses/)
- [How ChatGPT Recommends Local Businesses — GMB-Radar](https://www.gmbradar.com/blog/how-chatgpt-recommends-local-businesses)
- [ChatGPT Search for Local Businesses: What's Working in 2026 — Formula Won Labs](https://www.formulawonlabs.com/blog/chatgpt-search-local-businesses)
- [AI Crawler Access Control: The 2026 Decision Matrix — Digital Applied](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix)
- [LLMs.txt in 2026: The Full Guide — Limy.ai](https://limy.ai/blog/llms.txt-in-2026-the-full-guide)
- [Structured Data & AI Search: Schema Markup Guide 2026 — Stackmatix](https://www.stackmatix.com/blog/structured-data-ai-search)
- [How to Structure Content for AI Answer Engines (GEO/AEO) — WSI](https://www.wsiworld.com/blog/how-to-structure-content-for-ai-answer-engines-a-geo-and-aeo-guide)
- [Mastering AI Citations: The GEO Playbook — Frase](https://www.frase.io/blog/how-to-get-cited-by-ai-search-engines-the-complete-geo-playbook)
- [11 Best GEO Tools for AI Search Visibility 2026 — HackerNoon](https://hackernoon.com/11-of-the-best-geo-tools-for-improving-ai-search-visibility-in-2026)
