import { PRO_FEES, inr } from "./calc-fees";
import { TRUST_CLAIMS } from "./nap";

/**
 * Config for the paid-traffic landing pages under /lp/*.
 *
 * These are deliberately separate from the organic /services/* pages
 * (CityLandingPage + city-pages.ts): shorter, quote-form-first, noindexed.
 * Price and identity are never retyped here — PRO_FEES and TRUST_CLAIMS stay
 * the single source, same rule as the rest of the site.
 */

export type LandingFaq = { q: string; a: string };
export type LandingTick = { title: string; body: string };
export type LandingStep = { title: string; body: string };

export type LandingPageConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  pillLabel: string;
  h1: string;
  h1Emphasis: string;
  lead: string;
  micro: string[];
  priceLabel: string;
  priceSub: string;
  formOffer: string;
  serviceOptions: string[];
  waIntent: string;
  included: LandingTick[];
  compare: {
    kicker: string;
    heading: string;
    sub: string;
    left: { title: string; body: string; points: string[] };
    right: { title: string; body: string; points: string[] };
  };
  process: LandingStep[];
  /** Optional secondary path for research-stage visitors — never the primary CTA. */
  calculator?: { href: string; label: string };
  faqs: LandingFaq[];
  finalHeading: string;
  finalBody: string;
};

/** Same four stats the homepage hero uses (Hero.tsx) — not retyped, just referenced. */
export const PROOF_STRIP = [
  { value: `${TRUST_CLAIMS.principalYearsInPractice} Years`, label: "CA practice" },
  { value: `${TRUST_CLAIMS.clientsServed}`, label: "businesses served" },
  { value: "50+", label: "compliance services" },
  { value: "100% Online", label: "digital process across India" },
] as const;

const waIntent = (service: string) =>
  `Hi CAA, I want ${service}. Please share pricing, documents and next steps.`;

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  "pvt-ltd-delhi": {
    slug: "pvt-ltd-delhi",
    metaTitle: "Private Limited Company Registration in Delhi | Company Avenue Advisory",
    metaDescription:
      "Register your Private Limited Company in Delhi with CA-assisted online support from Company Avenue Advisory. Get a tailored quote, document guidance and incorporation support.",
    pillLabel: "Private Limited Company · Delhi",
    h1: "Start your company.",
    h1Emphasis: "We'll handle the compliance.",
    lead: "Get your Private Limited Company registered with professional support for the filing, documents and immediate post-incorporation steps.",
    micro: [`From ${inr(PRO_FEES["private-limited-company"])}`, "7–10 day target*", "100% online", "CA & CS assistance"],
    priceLabel: `Starting from ${inr(PRO_FEES["private-limited-company"])}*`,
    priceSub: "Professional assistance · final quote depends on your case and applicable statutory charges.",
    formOffer: `Starting from ${inr(PRO_FEES["private-limited-company"])}*`,
    serviceOptions: [
      "Private Limited Company Registration",
      "LLP Registration",
      "GST Registration",
      "Trademark Registration",
    ],
    waIntent: waIntent("Private Limited Company Registration in Delhi"),
    included: [
      { title: "Name approval guidance", body: "Shortlist and prepare suitable company names." },
      { title: "Incorporation filing", body: "Support across the online incorporation workflow." },
      { title: "PAN & TAN assistance", body: "Help with the linked post-incorporation registrations." },
      { title: "Document coordination", body: "Clear checklist for founders, address and declarations." },
      { title: "Professional guidance", body: "CA & CS-led support through the process." },
      { title: "Post-registration direction", body: "Understand the first compliance steps after incorporation." },
    ],
    compare: {
      kicker: "Why people compare",
      heading: "Pvt Ltd or LLP? Start with the structure.",
      sub: "The right entity depends on funding plans, ownership, liability and how you intend to operate.",
      left: {
        title: "Private Limited",
        body: "A corporate structure suited to businesses planning a more formal growth path.",
        points: ["Shareholding structure", "Investor-friendly format", "Separate legal entity"],
      },
      right: {
        title: "LLP",
        body: "An alternative structure for partners who want flexibility in management and profit sharing.",
        points: ["Partner-led structure", "LLP Agreement", "Compliance profile differs"],
      },
    },
    process: [
      { title: "Consult", body: "Share the basics and get a clear checklist." },
      { title: "File", body: "Documents are prepared and the incorporation process is handled." },
      { title: "Receive & continue", body: "Get the incorporation documents and guidance on next compliance steps." },
    ],
    calculator: {
      href: "/calculators/company-registration-cost",
      label: "See the full cost breakdown — government fees, stamp duty and add-ons",
    },
    faqs: [
      { q: "How long does registration take?", a: "CAA currently communicates a 7–10 day target for the service. Actual authority processing can vary by case." },
      { q: `What does the ${inr(PRO_FEES["private-limited-company"])} starting price mean?`, a: "It is a starting professional-service price shown on the current CAA service page. Government, stamp-duty and other applicable charges can vary by configuration." },
      { q: "Do I need to visit an office?", a: "CAA positions the process as 100% online, subject to the documents and verification required for your case." },
      { q: "Can you help after incorporation?", a: "Yes. CAA offers ongoing business compliance services and can guide you on the immediate post-incorporation requirements." },
    ],
    finalHeading: "Ready to get the company started?",
    finalBody: "Share a few details. CAA will take the conversation forward with pricing, documents and the next step.",
  },

  "llp-delhi": {
    slug: "llp-delhi",
    metaTitle: "LLP Registration in Delhi | Company Avenue Advisory",
    metaDescription:
      "Register an LLP in Delhi with professional filing support from Company Avenue Advisory. Get a tailored quote, LLP Agreement support and online registration assistance.",
    pillLabel: "LLP Registration · Delhi",
    h1: "Build with partners.",
    h1Emphasis: "Keep the structure flexible.",
    lead: "Set up your LLP with professional support for registration, partner documentation and the LLP Agreement.",
    micro: [`From ${inr(PRO_FEES["llp-registration"])}`, "7–10 day target*", "100% online", "LLP Agreement support"],
    priceLabel: `Starting from ${inr(PRO_FEES["llp-registration"])}*`,
    priceSub: "Professional assistance · final quote depends on your case and applicable statutory charges.",
    formOffer: `Starting from ${inr(PRO_FEES["llp-registration"])}*`,
    serviceOptions: [
      "LLP Registration",
      "Private Limited Company Registration",
      "GST Registration",
      "Trademark Registration",
    ],
    waIntent: waIntent("LLP Registration in Delhi"),
    included: [
      { title: "Partner documentation", body: "Guidance for partner KYC and declarations." },
      { title: "Name approval guidance", body: "Help with preparing the proposed LLP name." },
      { title: "LLP incorporation support", body: "Support through the online registration workflow." },
      { title: "LLP Agreement support", body: "Assistance with the agreement and partner structure." },
      { title: "Professional review", body: "CA-led and compliance-focused document support." },
      { title: "Next-step guidance", body: "Direction on post-incorporation compliance requirements." },
    ],
    compare: {
      kicker: "Why people compare",
      heading: "LLP or Private Limited? Compare the structure.",
      sub: "Both can work for growing businesses. The practical differences are in ownership, governance, funding and compliance.",
      left: {
        title: "LLP",
        body: "Partner-led structure with an LLP Agreement defining roles and sharing.",
        points: ["Flexible partner arrangement", "Agreement-led governance", "Suitable for professional partnerships"],
      },
      right: {
        title: "Private Limited",
        body: "Company structure with shareholders and a more formal corporate framework.",
        points: ["Shareholding structure", "Investor-ready format", "Different compliance requirements"],
      },
    },
    process: [
      { title: "Discuss", body: "Share partner and business basics." },
      { title: "Prepare", body: "Documents and LLP Agreement inputs are organised for filing." },
      { title: "Complete", body: "CAA supports the registration and hands over the final documents." },
    ],
    calculator: {
      href: "/calculators/company-registration-cost",
      label: "See the full cost breakdown — government fees, stamp duty and add-ons",
    },
    faqs: [
      { q: "How many partners do I need?", a: "An LLP is formed by partners and requires the statutory minimum under the applicable rules. CAA can confirm the exact requirement for your case." },
      { q: "What is included in LLP registration support?", a: "CAA currently describes end-to-end registration assistance, partner documentation guidance and LLP Agreement support." },
      { q: "How long does LLP registration take?", a: "CAA currently communicates a 7–10 day target. Actual authority processing varies by case and application." },
      { q: `Is the ${inr(PRO_FEES["llp-registration"])} amount the final all-in cost?`, a: "It is the starting professional-service price shown on the current CAA service page. Government, stamp-duty, DSC and other applicable charges can vary." },
    ],
    finalHeading: "Ready to set up the LLP?",
    finalBody: "Share your partner details and get a clear next-step conversation with CAA.",
  },

  "gst-delhi": {
    slug: "gst-delhi",
    metaTitle: "GST Registration in Delhi | Company Avenue Advisory",
    metaDescription:
      "Get GST registration assistance in Delhi from Company Avenue Advisory. Check eligibility, understand the documents and get professional filing support online.",
    pillLabel: "GST Registration · Delhi",
    h1: "Need GST?",
    h1Emphasis: "Let's get your business ready.",
    lead: "Understand your eligibility, organise the paperwork and complete the GST registration process with professional support.",
    micro: ["Eligibility guidance", "Online process", "Document checklist", "CA-assisted filing"],
    priceLabel: "Get your GST quote",
    priceSub: "Share a few details and CAA can confirm the applicable professional and statutory components.",
    formOffer: "Quick quote",
    serviceOptions: [
      "GST Registration",
      "GST Return Filing",
      "Private Limited Company Registration",
      "LLP Registration",
      "Trademark Registration",
    ],
    waIntent:
      "Hi CAA, I found you through Google and want GST Registration in Delhi. Please help me with eligibility, pricing and next steps.",
    included: [
      { title: "Eligibility guidance", body: "Understand whether GST registration applies to your business." },
      { title: "Document checklist", body: "Know what to prepare before filing." },
      { title: "Application support", body: "Professional assistance through the online registration workflow." },
      { title: "Business details review", body: "Reduce avoidable mismatches in the application." },
      { title: "CA-led guidance", body: "Get answers around the registration path and next steps." },
      { title: "Post-registration direction", body: "Know what comes next once the registration is active." },
    ],
    compare: {
      kicker: "Why people compare",
      heading: "Registration is step one. Compliance is what follows.",
      sub: "GST work often continues after the number is issued. Keep the recurring side in view from day one.",
      left: {
        title: "GST Registration",
        body: "For businesses that need or choose GST registration based on their situation.",
        points: ["Registration application", "Business & promoter details", "Certificate after approval"],
      },
      right: {
        title: "GST Compliance",
        body: "Recurring work after registration, depending on the taxpayer and filing obligations.",
        points: ["Returns & reconciliations", "Invoice/GST checks", "Ongoing filing support"],
      },
    },
    process: [
      { title: "Check", body: "Share the business basics for an eligibility and document check." },
      { title: "File", body: "The application is prepared and submitted online." },
      { title: "Continue", body: "Receive the registration outcome and discuss the ongoing compliance plan." },
    ],
    calculator: {
      href: "/calculators/gst-registration-cost-calculator",
      label: "See the GST registration cost breakdown",
    },
    faqs: [
      { q: "Does every business need GST registration?", a: "Not every business has the same GST registration requirement. Applicability depends on the business, supplies and relevant rules. CAA can assess the facts you provide." },
      { q: "How quickly can GST registration be completed?", a: "The timeline depends on the application, documents, verification and government processing. CAA will guide you through the case-specific process." },
      { q: "What documents are generally needed?", a: "Typical applications require business, promoter and address-related documents. The exact checklist depends on your business structure and situation." },
      { q: "Can CAA also handle GST returns?", a: "Yes. GST return filing is one of the ongoing compliance services offered by CAA." },
    ],
    finalHeading: "Need GST sorted?",
    finalBody: "Send the basics. CAA will help you understand the route, documents and next step without making you decode the process yourself.",
  },
};
