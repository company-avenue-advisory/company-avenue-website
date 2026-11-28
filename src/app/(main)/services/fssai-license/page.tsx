import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { fitTitle } from "@/lib/seo";
import { FSSAILicensePage } from "@/components/sections/FSSAILicensePage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/FSSAILicensePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/fssai-license" },
  title: fitTitle("FSSAI Registration & Food License Online — Fees & Process"),
  description:
    "FSSAI registration and food license online: basic registration, state license or central license for restaurants, manufacturers and importers. Fees, documents and process.",
};

export default function FSSAILicenseServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <FSSAILicensePage
        pricingSlot={<ServicePricingBlock serviceId="fssai-license" />}
        calcPill={<ServiceCalcPill serviceId="fssai-license" />}
      />
      <SearchQA path="/services/fssai-license" />
    </>
  );
}
