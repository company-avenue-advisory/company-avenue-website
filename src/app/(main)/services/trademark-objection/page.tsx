import type { Metadata } from "next";
import { TrademarkObjectionPage } from "@/components/sections/TrademarkObjectionPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/TrademarkObjectionPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/trademark-objection" },
  title: "Trademark Objection Reply",
  description:
    "Expert trademark objection reply to Examination Report under Section 9 or 11. Strong legal arguments, case law citations, and evidence affidavits. Starting ₹7,999.",
};

export default function TrademarkObjectionServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <TrademarkObjectionPage
        pricingSlot={<ServicePricingBlock serviceId="trademark-objection" />}
        calcPill={<ServiceCalcPill serviceId="trademark-objection" />}
      />
    </>
  );
}
