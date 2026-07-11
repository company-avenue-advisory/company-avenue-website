import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/lib/constants";

// New city landing pages (Section D of the build spec).
const CITY_PAGES = [
  "private-limited-company-registration-delhi",
  "gst-registration-delhi",
  "trademark-registration-delhi",
  "company-registration-janakpuri",
  "gst-registration-dwarka",
  "company-registration-gurgaon",
  "company-registration-noida",
];

const CALCULATORS = [
  "business-setup-calculator", "business-structure-advisor", "company-registration-cost",
  "compliance-cost-calculator", "compound-interest-calculator", "emi-calculator",
  "epf-calculator", "fd-calculator", "gratuity-calculator", "gst-calculator",
  "home-loan-emi-calculator", "hra-calculator", "income-tax-calculator", "llp-vs-pvt-ltd",
  "lumpsum-calculator", "mutual-fund-calculator", "nps-calculator", "ppf-calculator",
  "rd-calculator", "retirement-calculator", "salary-calculator", "sip-calculator",
  "tds-calculator", "tds-rate-finder",
];

const VERIFY_TOOLS = [
  "company-name-search", "company-verification", "gst-verification",
  "pan-verification", "trademark-class-finder",
];

const STATIC_PAGES = [
  "", "services", "pricing", "contact", "about", "blog",
  "calculators", "verify", "resources", "guides", "templates",
  "privacy", "terms", "disclaimer", "refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path ? `/${path}` : ""}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("", 1.0, "weekly"),
    ...STATIC_PAGES.filter((p) => p !== "").map((p) => entry(p, 0.7, "monthly")),
    ...SERVICES.map((s) => entry(`services/${s.id}`, 0.9, "monthly")),
    ...CITY_PAGES.map((p) => entry(`services/${p}`, 0.85, "monthly")),
    ...CALCULATORS.map((c) => entry(`calculators/${c}`, 0.6, "monthly")),
    ...VERIFY_TOOLS.map((v) => entry(`verify/${v}`, 0.6, "monthly")),
    // NOTE: individual /blog/{slug} pages are not built yet (only the /blog hub
    // exists). Add per-post entries here once blog article routes are created.
  ];
}
