/** Calculator routes under /calculators. Used by the sitemap and related links. */
export const CALCULATORS = [
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

const UPPER = new Set(["emi", "epf", "fd", "gst", "hra", "llp", "nps", "ppf", "rd", "sip", "tds", "fssai"]);

/** "home-loan-emi-calculator" → "Home Loan EMI Calculator". */
export function calculatorLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => (UPPER.has(w) ? w.toUpperCase() : w === "vs" ? "vs" : w === "pvt" ? "Pvt" : w[0].toUpperCase() + w.slice(1)))
    .join(" ")
    .replace("Pvt Ltd", "Pvt. Ltd.");
}
