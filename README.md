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

The project is optimised for deployment on **Vercel**:

```bash
npx vercel
```

For other platforms, run `npm run build` and serve the `.next/` output with `npm start`.

## Environment Variables

No environment variables are required for the base site. If you integrate a CMS, email service, or analytics, create a `.env.local` file:

```env
# Example
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxx
```
