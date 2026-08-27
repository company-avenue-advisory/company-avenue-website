import type { Metadata } from "next";
import { ProfessionalTaxPage } from "@/components/sections/ProfessionalTaxPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/ProfessionalTaxPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/professional-tax" },
  title: "Professional Tax Registration & Returns",
  description:
    "Register for Professional Tax (PT) and file monthly/annual returns. Mandatory for employers in Maharashtra, Karnataka, West Bengal, and more. Starting ₹2,999.",
};

export default function ProfessionalTaxServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <ProfessionalTaxPage
        pricingSlot={<ServicePricingBlock serviceId="professional-tax" />}
        calcPill={<ServiceCalcPill serviceId="professional-tax" />}
      />
    </>
  );
}
