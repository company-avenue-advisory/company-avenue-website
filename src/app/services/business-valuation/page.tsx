import type { Metadata } from "next";
import { BusinessValuationPage } from "@/components/sections/BusinessValuationPage";
import { faqs as serviceFaqs } from "@/lib/faqs/BusinessValuationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/business-valuation" },
  title: "Business Valuation Services in India | Company Avenue Advisory",
  description:
    "SEBI-compliant business valuation for M&A, fundraising, ESOPs, and RBI compliance. DCF, comparable companies, and asset-based approaches. Starting ₹14,999.",
};

export default function BusinessValuationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <BusinessValuationPage />
    </>
  );
}
