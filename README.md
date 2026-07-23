# Company Avenue Advisory — Website

Official website for **Company Avenue Advisory Pvt. Ltd.**, a premium business compliance firm based in India. The site is designed to generate leads, build trust, and convert visitors for services like company registration, GST, income tax, trademark, and more.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Font | Plus Jakarta Sans + Inter |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/
│   ├── contact/
│   ├── services/
│   │   └── [slug]/         # Dynamic service pages (12 services)
│   └── resources/
├── components/
│   ├── layout/             # Navbar, Footer, SmoothScroll
│   ├── sections/           # All page sections (Hero, Services, FAQ, etc.)
│   └── ui/                 # Reusable primitives (Button, Badge, SectionHeader, etc.)
└── lib/
    ├── constants.ts        # All site content (services, nav, testimonials, etc.)
    └── utils.ts            # cn() helper and utilities
```

## Pages

| Route | Description |
|---|---|
| `/` | Full homepage with all sections |
| `/services` | All services overview |
| `/services/[slug]` | Individual service detail pages (12 total) |
| `/about` | Company history, team, mission, values |
| `/contact` | Contact form + office info |
| `/resources` | Blog/articles listing |

## Design System

```
Primary:    #0F2D52
Secondary:  #154D8C
Accent:     #D6A64F
Background: #F8FAFC
Dark:       #081726
Muted:      #64748B
```

**Typography:** Plus Jakarta Sans (headings) · Inter (body)  
**Max width:** 1280px · **Grid:** 12-column · **Radius:** `rounded-xl` / `rounded-2xl`

## Customisation

All site content (company name, phone, services list, testimonials, blog posts, nav links) lives in `src/lib/constants.ts`. Update that file to change content across the entire site.

To add a new service page, add an entry to the `SERVICES` array in `constants.ts` and optionally add detailed content to the `serviceDetails` map in `src/app/services/[slug]/page.tsx`.

## Deployment

The site is a **single Vercel deployment** — the Next.js App Router serves both the
pages and the backend (API routes under `src/app/api/*`). There is no separate
server to run.

**Deploy flow**

1. Push to the connected Git branch (or run `npx vercel --prod`). Vercel builds
   with `npm run build` and deploys automatically.
2. `.env.local` is **git-ignored and never uploaded**. Every key the app reads
   must be added in **Vercel → Project → Settings → Environment Variables**
   (Production + Preview), otherwise that feature silently no-ops in production.
3. After changing any env var in Vercel, **redeploy** — env values are read at
   build time for `NEXT_PUBLIC_*` and at runtime for the rest.

For non-Vercel hosts: `npm run build` then `npm start`, with the same env vars
present in the environment.

## Environment Variables

Create `src/.env.local` for local dev and mirror the same keys in Vercel.
`NEXT_PUBLIC_*` keys are exposed to the browser; all others are server-only.

| Key | Purpose | Required |
|---|---|---|
| `AI_PROVIDER` | Avenue AI chatbot backend: `mock` \| `groq` \| `openai` | for chatbot |
| `GROQ_API_KEY` / `GROQ_MODEL` | Groq LLM for the chatbot | if `groq` |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | OpenAI LLM for the chatbot | if `openai` |
| `NEWSDATA_API_KEY` | Live news in the Knowledge Hub | optional |
| `SANDBOX_API_KEY` / `SANDBOX_API_SECRET` | GST / PAN / MCA verification tools | for verify tools |
| `DATA_GOV_API_KEY` | Company Name Search | for name search |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` | Real Google reviews on the homepage | for live reviews |
| `MONGODB_URI` | Consultation form storage (MongoDB Atlas) | **yes** |
| `MONGODB_DB` | DB name (defaults to `avenue-advisory`) | optional |
| `RESEND_API_KEY` | Lead-notification email | optional |
| `CONSULTATION_TO_EMAIL` / `CONSULTATION_FROM_EMAIL` | Lead email routing | optional |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Admin dashboard login (see below) | **yes** |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (`GTM-KMKTTDKD`) | for analytics |
| `NEXT_PUBLIC_GA_ID` | GA4 direct — **leave blank**, GA4 fires inside GTM | no |

> **MongoDB Atlas gotcha:** Vercel serverless uses dynamic egress IPs. In Atlas →
> Network Access, allow `0.0.0.0/0`, or the consultation form and admin dashboard
> fail at the TLS handshake (`MongoServerSelectionError`).

## Admin Panel

The lead dashboard lives at **`/admin/consultations`** and its data API at
`/api/admin/*`. Both are protected by HTTP Basic Auth in
[`src/middleware.ts`](src/middleware.ts).

- **Credentials are environment variables** — `ADMIN_USER` and `ADMIN_PASSWORD`.
  They are **not** hardcoded and **not** in the database.
- **To rotate the password:** change `ADMIN_PASSWORD` in Vercel → Settings →
  Environment Variables (and in local `.env.local`), then redeploy. No code change.
- The middleware includes a best-effort per-IP login throttle (10 failed
  attempts / 15 min → HTTP 429). It is per-instance; for hard guarantees back it
  with Vercel KV / Upstash.

## Analytics (GTM)

Analytics runs entirely through **Google Tag Manager** (container `GTM-KMKTTDKD`),
injected by [`src/components/analytics/Analytics.tsx`](src/components/analytics/Analytics.tsx)
when `NEXT_PUBLIC_GTM_ID` is set. The GA4 tag (`G-P3LQECEJ5L`) is configured
**inside** the container, so `NEXT_PUBLIC_GA_ID` is intentionally left blank to
avoid double-counting.

Conversion signals available to GTM triggers:

- WhatsApp / call links carry `data-track="whatsapp"` / `data-track="call"`.
- `dataLayer` events: `consultation_submit`, `calculator_used`, `verify_used`,
  `whatsapp_click`, `call_click`, `generate_lead`.
