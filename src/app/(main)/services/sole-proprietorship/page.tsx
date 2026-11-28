import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { SoleProprietorshipPage } from "@/components/sections/SoleProprietorshipPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/SoleProprietorshipPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/sole-proprietorship" },
  title: fitTitle("Sole Proprietorship Registration Online — Fees & Documents"),
  description:
    "Sole proprietorship registration online in India with Udyam, GST and shop act registrations. Proprietorship registration fees, documents and process for individual owners.",
};

export default function SoleProprietorshipServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <SoleProprietorshipPage
        pricingSlot={<CalculatorPricingSlot serviceId="sole-proprietorship" lockEntity="proprietorship" />}
        calcPill={<JumpToCalculatorPill />}
      />
    </>
  );
}
