import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { PartnershipFirmPage } from "@/components/sections/PartnershipFirmPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/PartnershipFirmPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/partnership-firm" },
  title: fitTitle("Partnership Firm Registration Online — Fees, Deed & Process"),
  description:
    "Partnership firm registration online. Partnership deed drafting and registration, firm registration fees, documents and process. PAN and bank account help included.",
};

export default function PartnershipFirmServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <PartnershipFirmPage
        pricingSlot={<CalculatorPricingSlot serviceId="partnership-firm" lockEntity="partnership" />}
        calcPill={<JumpToCalculatorPill />}
      />
    </>
  );
}
