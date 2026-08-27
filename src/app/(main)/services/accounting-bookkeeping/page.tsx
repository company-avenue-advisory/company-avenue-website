import type { Metadata } from "next";
import { AccountingBookkeepingPage } from "@/components/sections/AccountingBookkeepingPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/AccountingBookkeepingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/accounting-bookkeeping" },
  title: "Professional Accounting & Bookkeeping Services | Company Avenue",
  description:
    "Outsource your accounting to qualified CAs. Get error-free books, monthly P&L reports, GST accounting, payroll management, and end-to-end financial compliance. Starting at ₹2,999/month.",
  keywords: [
    "accounting services India",
    "bookkeeping services",
    "outsourced accounting",
    "GST accounting",
    "monthly bookkeeping",
    "financial reporting",
    "payroll management",
    "TallyPrime accounting",
    "Zoho Books accountant",
    "MIS reports",
  ],
  openGraph: {
    title: "Professional Accounting & Bookkeeping Services | Company Avenue",
    description:
      "Expert CA-led accounting services for growing businesses. Monthly reports, GST reconciliation, payroll, and compliance — all under one plan.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function AccountingBookkeepingServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <AccountingBookkeepingPage
        pricingSlot={<ServicePricingBlock serviceId="accounting-bookkeeping" />}
        calcPill={<ServiceCalcPill serviceId="accounting-bookkeeping" />}
      />
    </>
  );
}
