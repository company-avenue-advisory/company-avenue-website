import type { Metadata } from "next";
import { TrademarkRenewalPage } from "@/components/sections/TrademarkRenewalPage";
import { faqs as serviceFaqs } from "@/lib/faqs/TrademarkRenewalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/trademark-renewal" },
  title: "Trademark Renewal — Form TM-R Filing",
  description:
    "Renew your trademark registration before the 10-year term expires. File Form TM-R online with the Trade Marks Registry. Govt fee ₹9,000/class (₹4,500 for small entities). Starting ₹2,999.",
};

export default function TrademarkRenewalServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <TrademarkRenewalPage />
    </>
  );
}
