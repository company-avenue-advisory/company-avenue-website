import { COMPANY } from "./constants";

export const SITE_URL = "https://companyavenueadvisory.com";

// wa.me requires digits only, no "+" or spaces
export const WHATSAPP_NUMBER = "919953719111";
export const PHONE_E164 = "+919953719111";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Default social share card.
 *
 * `app/opengraph-image.png` already covers every page that does NOT declare
 * its own `openGraph` block. But Next merges metadata *shallowly*: the moment
 * a page sets `openGraph: {...}`, it replaces the parent's resolved object —
 * file-convention image included — and the page ships with no og:image at all.
 * So any page that overrides openGraph must spread this back in explicitly.
 */
export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: "Company Avenue Advisory Pvt. Ltd. — CA-led company registration, GST, trademark and compliance services in New Delhi and Delhi NCR.",
};

/**
 * Absolute canonical URL for a given path. Pass "/" for home.
 */
export function canonical(path: string): { canonical: string } {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return { canonical: `${SITE_URL}${clean}` };
}

/**
 * Site-wide Organization / LocalBusiness (AccountingService) schema.
 * Rendered once in the root layout. (Section F of the build spec.)
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AccountingService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.fullName,
  alternateName: COMPANY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/new_logo.png`,
  image: `${SITE_URL}/images/new_logo.png`,
  telephone: PHONE_E164,
  email: COMPANY.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "209, Jaina Tower 1, District Center, Janakpuri",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110058",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6219,
    longitude: 77.0878,
  },
  areaServed: [
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Dwarka" },
    { "@type": "City", name: "Janakpuri" },
    { "@type": "City", name: "Gurgaon" },
    { "@type": "City", name: "Noida" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/company-avenue-advisory",
    "https://www.facebook.com/companyavenueadvisory",
    "https://www.instagram.com/companyavenueadvisory",
  ],
};

/**
 * Organization schema with the live Google rating folded in when we have one.
 * Falls back to the plain organization node so a Places outage can never
 * strip the site's primary entity markup.
 */
export function organizationSchemaWithRating(
  rating?: number,
  reviewCount?: number
) {
  const aggregateRating = aggregateRatingNode(rating ?? 0, reviewCount ?? 0);
  return aggregateRating
    ? { ...organizationSchema, aggregateRating }
    : organizationSchema;
}

/**
 * WebSite node. Gives the site a single addressable entity that the
 * Organization, breadcrumbs and page nodes can all point at, and is what
 * Google reads to decide the site name it prints under a SERP result.
 *
 * Deliberately no `potentialAction`/SearchAction: Google retired the sitelinks
 * searchbox in late 2024, and `/services?q=` does not actually filter yet, so
 * declaring one would point crawlers at a query URL that ignores its query.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY.name,
  description:
    "Company registration, GST, income tax, trademark and corporate compliance services for Indian startups and SMEs.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

/**
 * Real Google Business Profile rating, shaped as an AggregateRating node.
 *
 * Only ever call this with live Places data — never hardcode a rating or a
 * count. Fabricated review markup is a manual-action risk, and the numbers
 * would drift out of sync with the Google profile the moment a review lands.
 *
 * Caveat worth knowing: Google does not render review stars for self-serving
 * LocalBusiness/Organization markup (reviews a business publishes about
 * itself), so this will not light up stars in Google's own SERP. It is still
 * read by Bing, and by the AI answer engines robots.ts already welcomes, and
 * it keeps the rating consistent with the on-page testimonials.
 */
export function aggregateRatingNode(rating: number, reviewCount: number) {
  if (!rating || !reviewCount) return null;
  return {
    "@type": "AggregateRating",
    ratingValue: Number(rating.toFixed(1)),
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

/** Build a Service schema for a service/city page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: opts.areaServed ?? "Delhi NCR, India",
  };
}

/** Build a BreadcrumbList schema. items = [{name, path}] in order. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Build an FAQPage schema from Q/A pairs. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
