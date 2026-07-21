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
