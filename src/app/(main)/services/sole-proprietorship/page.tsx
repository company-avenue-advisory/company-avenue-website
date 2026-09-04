import type { Metadata } from "next";
import { SoleProprietorshipPage } from "@/components/sections/SoleProprietorshipPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/SoleProprietorshipPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/sole-proprietorship" },
  title: "Sole Proprietorship Registration",
  description:
    "Start your sole proprietorship business in India with Udyam/MSME, GST, shop act registrations. Simplest business form for individual entrepreneurs. Starting ₹2,999.",
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
