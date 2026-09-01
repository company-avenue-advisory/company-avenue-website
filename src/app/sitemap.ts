import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { GUIDES } from "@/lib/guides";
import { TEMPLATES } from "@/lib/templates";
import { SCHEMES } from "@/lib/schemes";

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
  "business-structure-advisor", "company-registration-cost",
  "compliance-cost-calculator", "compound-interest-calculator", "emi-calculator",
  "epf-calculator", "fd-calculator", "gratuity-calculator", "gst-calculator",
  "home-loan-emi-calculator", "hra-calculator", "income-tax-calculator", "llp-vs-pvt-ltd",
  "lumpsum-calculator", "mutual-fund-calculator", "nps-calculator", "ppf-calculator",
  "rd-calculator", "retirement-calculator", "salary-calculator", "sip-calculator",
  "tds-calculator", "tds-rate-finder",
  "trademark-cost-calculator", "gst-registration-cost-calculator",
  "fssai-license-cost-calculator",
];

const VERIFY_TOOLS = [
  "company-name-search", "company-verification", "gst-verification",
  "pan-verification", "trademark-class-finder",
];

const STATIC_PAGES = [
  "", "services", "pricing", "contact", "about", "blog",
  "calculators", "verify", "resources", "guides", "templates",
  "privacy", "terms", "disclaimer", "refund-policy", "startup-schemes",
  // WS-5.1 reviews destination. Also the 301 target for the legacy /reviews/.
  "reviews",
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
    // Content detail pages. These are generated straight from the same data the
    // routes use, so new posts/guides/templates appear in the sitemap on deploy.
    ...BLOG_POSTS.map((p) => entry(`blog/${p.slug}`, 0.7, "monthly")),
    ...GUIDES.map((g) => entry(`guides/${g.slug}`, 0.75, "monthly")),
    ...TEMPLATES.map((t) => entry(`templates/${t.slug}`, 0.65, "monthly")),
    // Government scheme one-pagers — the funding hub's detail pages.
    ...SCHEMES.map((s) => entry(`startup-schemes/${s.slug}`, 0.8, "monthly")),
  ];
}
