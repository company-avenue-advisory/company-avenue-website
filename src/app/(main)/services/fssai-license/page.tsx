import type { Metadata } from "next";
import { FSSAILicensePage } from "@/components/sections/FSSAILicensePage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/FSSAILicensePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/fssai-license" },
  title: "FSSAI License Registration for Food Business",
  description:
    "Get FSSAI Basic Registration, State License, or Central License for your food business. Restaurants, manufacturers, importers. Starting ₹3,999.",
};

export default function FSSAILicenseServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <FSSAILicensePage
        pricingSlot={<ServicePricingBlock serviceId="fssai-license" />}
        calcPill={<ServiceCalcPill serviceId="fssai-license" />}
      />
    </>
  );
}
