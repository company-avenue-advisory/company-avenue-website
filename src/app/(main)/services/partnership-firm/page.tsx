import type { Metadata } from "next";
import { PartnershipFirmPage } from "@/components/sections/PartnershipFirmPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/PartnershipFirmPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/partnership-firm" },
  title: "Partnership Firm Registration Online",
  description:
    "Register a Partnership Firm under the Indian Partnership Act, 1932. Deed drafting, PAN, bank account opening. Simple, flexible business structure starting ₹4,999.",
};

export default function PartnershipFirmServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <PartnershipFirmPage
        pricingSlot={<ServicePricingBlock serviceId="partnership-firm" />}
        calcPill={<ServiceCalcPill serviceId="partnership-firm" />}
      />
    </>
  );
}
