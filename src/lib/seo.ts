import { COMPANY } from "./constants";

export const SITE_URL = "https://companyavenueadvisory.com";

// wa.me requires digits only, no "+" or spaces
export const WHATSAPP_NUMBER = "919953719111";
export const PHONE_E164 = "+919953719111";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
