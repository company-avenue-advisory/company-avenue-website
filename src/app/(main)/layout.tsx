import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchemaWithRating, websiteSchema } from "@/lib/seo";
import { fetchPlaceReviews, isGooglePlacesConfigured } from "@/lib/google-places";

/* ─────────────────────────────────────────────────────────────────────────────
   The India-facing site.

   Everything that is specific to companyavenueadvisory.com lives here rather
   than in the root layout: the navbar and footer, the Organization/WebSite
   schema, and the India metadata defaults (en_IN locale, the title template,
   the keyword set).

   Why this group exists: us.companyavenueadvisory.com is served by the same
   Next app through a middleware rewrite to /us. Chrome rendered in the ROOT
   layout would therefore appear on the US landing page too — and it cannot be
   switched off from inside SiteChrome, because under a rewrite `usePathname()`
   returns the browser path ("/"), not the rewritten route ("/us"). Verified:
   the India navbar rendered into the US page's SSR HTML.

   Route groups do not affect URLs. Every path under here is unchanged.
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "Company Avenue Advisory Pvt. Ltd. | Business Registration & Compliance Experts",
    template: "%s | Company Avenue Advisory",
  },
  description:
    "India's trusted business compliance partner. Company registration, GST, Income Tax, Trademark, Accounting, Payroll, and Secretarial services for startups and SMEs.",
  keywords: [
    "company registration india",
    "GST registration",
    "income tax return",
    "trademark registration",
    "startup india",
    "MSME registration",
    "ROC filing",
    "business compliance",
    "accounting services",
    "IEC registration",
  ],
  // NOTE: deliberately no `title`/`description` here. Next.js merges metadata
  // shallowly, so a child that sets `openGraph` replaces this whole object —
  // but a child that sets *none* inherits it verbatim. Spelling out a title
  // here meant ~89 pages all shared one generic og:title. Leaving it unset
  // makes Next fall back to each page's own `title`/`description`, so every
  // page gets accurate share text for free. Same reasoning for twitter.
  // Also no `url`: a value here is inherited literally, which stamped the
  // homepage URL onto og:url for every page on the site and would have had
  // social platforms de-duplicating 100+ distinct pages into one.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Company Avenue Advisory",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Pulls the live Google Business Profile rating so the Organization node can
 * carry a real AggregateRating. Never throws and never invents numbers — if
 * Places is unconfigured or erroring we simply emit no rating. The underlying
 * fetch is cached for 24h, so this does not cost a request per render.
 */
async function getLiveRating() {
  if (!isGooglePlacesConfigured()) return undefined;
  try {
    const { rating, userRatingCount } = await fetchPlaceReviews();
    return { rating, reviewCount: userRatingCount };
  } catch {
    return undefined;
  }
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const live = await getLiveRating();
  return (
    <>
      <JsonLd data={organizationSchemaWithRating(live?.rating, live?.reviewCount)} />
      <JsonLd data={websiteSchema} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
