// ─────────────────────────────────────────────────────────────────────────────
// Internal-linking map: content category → the money page it should point at.
//
// Every blog post / guide renders a contextual link down to its parent service
// page. This is what turns a flat pile of articles into topic clusters — the
// article is the cluster page, the service page is the pillar.
//
// Keys must match the `category` strings used in blog-posts.ts and guides.ts.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceLink {
  label: string;
  href: string;
}

/** Blog post categories → parent service. */
export const CATEGORY_SERVICE: Record<string, ServiceLink> = {
  "Company Registration": {
    label: "Private Limited Company Registration",
    href: "/services/private-limited-company",
  },
  GST: { label: "GST Registration", href: "/services/gst-registration" },
  "Income Tax": { label: "Income Tax Return Filing", href: "/services/income-tax-return" },
  Trademark: { label: "Trademark Registration", href: "/services/trademark-registration" },
  Compliance: { label: "ROC Compliance", href: "/services/roc-compliance" },
  TDS: { label: "TDS Return Filing", href: "/services/tds-return" },
  "MSME & Startup": { label: "Startup India Registration", href: "/services/startup-india" },
  "Payroll & Labour": { label: "Payroll Management", href: "/services/payroll-management" },
  "Business Advisory": { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
};

/** Guide categories use slightly different labels to the blog's. */
/**
 * Per-post override of CATEGORY_SERVICE, where a post's own topic has a
 * closer service page than its category's default (keyword gap, Nov 2026:
 * the LLP post sent readers to the Pvt Ltd page).
 */
export const POST_SERVICE: Record<string, ServiceLink> = {
  "llp-registration-process-cost": { label: "LLP Registration", href: "/services/llp-registration" },
  "opc-registration-solo-founders": { label: "OPC Registration", href: "/services/one-person-company" },
  "section-8-company-registration-guide": { label: "Section 8 Company Registration", href: "/services/section-8-company" },
  "gst-return-filing-deadlines": { label: "GST Return Filing", href: "/services/gst-filing" },
  "common-gst-filing-mistakes": { label: "GST Return Filing", href: "/services/gst-filing" },
  "annual-roc-filing-checklist": { label: "ROC Annual Compliance", href: "/services/roc-compliance" },
  "director-kyc-dir3-deadline-penalty": { label: "Director KYC (DIR-3 KYC)", href: "/services/director-kyc" },
  "msme-registration-benefits": { label: "Udyam / MSME Registration", href: "/services/msme-registration" },
  "pf-esi-registration-when-mandatory": { label: "PF Registration", href: "/services/pf-registration" },
  "converting-proprietorship-to-private-limited": { label: "Proprietorship to Pvt Ltd Conversion", href: "/services/proprietorship-to-pvtltd" },
};

export const GUIDE_CATEGORY_SERVICE: Record<string, ServiceLink> = {
  ...CATEGORY_SERVICE,
  "Trademark & IP": {
    label: "Trademark Registration",
    href: "/services/trademark-registration",
  },
  "Startup & MSME": { label: "Startup India Registration", href: "/services/startup-india" },
  Licenses: { label: "FSSAI License", href: "/services/fssai-license" },
};

/** Template categories → the service most likely to follow from using it. */
export const TEMPLATE_CATEGORY_SERVICE: Record<string, ServiceLink> = {
  "HR & Employment": { label: "Payroll Management", href: "/services/payroll-management" },
  "Company Secretarial": { label: "ROC Compliance", href: "/services/roc-compliance" },
  "Agreements & Contracts": {
    label: "Private Limited Company Registration",
    href: "/services/private-limited-company",
  },
  "Finance & Invoicing": {
    label: "Accounting & Bookkeeping",
    href: "/services/accounting-bookkeeping",
  },
};
