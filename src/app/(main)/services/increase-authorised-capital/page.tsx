import type { Metadata } from "next";
import { IncreaseAuthorisedCapitalPage } from "@/components/sections/IncreaseAuthorisedCapitalPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/IncreaseAuthorisedCapitalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/increase-authorised-capital" },
  title: "Increase Authorised Share Capital — Form SH-7",
  description:
    "Increase your company's authorised share capital via Ordinary Resolution and Form SH-7 filing with ROC. Required before fresh share allotment, FDI, or ESOPs. Starting ₹2,999.",
};

export default function IncreaseAuthorisedCapitalServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <IncreaseAuthorisedCapitalPage
        pricingSlot={<ServicePricingBlock serviceId="increase-authorised-capital" />}
        calcPill={<ServiceCalcPill serviceId="increase-authorised-capital" />}
      />
    </>
  );
}
