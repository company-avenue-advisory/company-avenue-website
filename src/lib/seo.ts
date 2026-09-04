import { COMPANY } from "./constants";
import {
  ADDRESS,
  CONFIRMED_SOCIAL_URLS,
  CONTACT,
  HOURS,
  INCORPORATED,
  STREET_ADDRESS,
} from "./nap";

export const SITE_URL = "https://companyavenueadvisory.com";

// wa.me requires digits only, no "+" or spaces
export const WHATSAPP_NUMBER = CONTACT.whatsappDigits;
export const PHONE_E164 = CONTACT.phoneE164;

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
 * Site-wide entity schema. Rendered once in the root layout.
 *
 * WS-4: `ProfessionalService` is now the leading type, as the work order
 * specifies. It is a subtype of LocalBusiness, so the address, hours and
 * contact properties are all still valid; AccountingService and LocalBusiness
 * stay in the array because they describe the same entity more narrowly and
 * cost nothing to keep.
 *
 * Every NAP value is read from src/lib/nap.ts (WS-10.1). Two things this fixed:
 *   · `streetAddress` said "209, Jaina Tower 1, District Center, Janakpuri"
 *     while the footer said "…, Professor Joginder Singh Marg, Janakpuri, …".
 *     Two different strings for one address is exactly the drift WS-10 is
 *     about, and schema is the copy Google reads.
 *   · `sameAs` listed a Facebook and an Instagram URL that the WS-9.1 audit
 *     could not confirm, plus a LinkedIn URL that is not the firm's page
 *     (missing the -pvt-ltd suffix). It now contains only confirmed profiles;
 *     an unconfirmed row in nap.ts cannot reach this array.
 *
 * NOTE: HOURS.confirmed is true as of 4 Sep 2026 (Mon–Sat 9:00 AM – 7:00 PM).
 * ADDRESS.confirmed is still false — a directory lists a different building, so
 * one line of written confirmation from the Principal is outstanding. The
 * address below is the website's own long-standing value, so it is not a new
 * claim; it is the existing claim, stated once instead of twice.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": [
    "ProfessionalService",
    "AccountingService",
    "LocalBusiness",
    "Organization",
  ],
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.fullName,
  alternateName: COMPANY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/new_logo.png`,
  image: `${SITE_URL}/images/new_logo.png`,
  telephone: PHONE_E164,
  email: COMPANY.email,
  foundingDate: INCORPORATED,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6219,
    longitude: 77.0878,
  },
  areaServed: [
    { "@type": "City", name: "New Delhi" },
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Dwarka" },
    { "@type": "City", name: "Janakpuri" },
    { "@type": "City", name: "Gurugram" },
    { "@type": "City", name: "Noida" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: HOURS.days,
      opens: HOURS.opens,
      closes: HOURS.closes,
    },
  ],
  sameAs: CONFIRMED_SOCIAL_URLS,
};

/**
 * The Principal, as a Person node — WS-4.
 *
 * The order asks for Person markup to "support author credibility for
 * regulated content". This site's articles state rates, thresholds and section
 * numbers, so who stands behind them matters to both readers and Google's
 * quality signals. The node lives at /about#principal (the leadership block
 * on the About page) and is what blog posts name as `author`.
 *
 * `knowsAbout` is deliberately limited to the practice areas the site
 * actually publishes on — it is a description, not a keyword list.
 */
export const PRINCIPAL_ID = `${SITE_URL}/about#principal`;

export const principalSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PRINCIPAL_ID,
  name: "CA Jatin Aggarwal",
  honorificPrefix: "CA",
  jobTitle: "Principal Consultant",
  description:
    "Chartered Accountant with 15+ years in practice, advising Indian startups and SMEs on GST, income tax, ROC/MCA compliance, payroll and virtual-CFO engagements.",
  url: `${SITE_URL}/about#team`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  memberOf: {
    "@type": "Organization",
    name: "The Institute of Chartered Accountants of India",
    alternateName: "ICAI",
  },
  knowsAbout: [
    "Goods and Services Tax (India)",
    "Income Tax (India)",
    "Company incorporation and ROC compliance",
    "Trademark registration",
    "Payroll and labour compliance",
  ],
  sameAs: ["https://www.linkedin.com/in/jatin-aggarwal-ca/"],
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
