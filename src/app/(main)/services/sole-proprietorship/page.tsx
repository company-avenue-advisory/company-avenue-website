import type { Metadata } from "next";
import { SoleProprietorshipPage } from "@/components/sections/SoleProprietorshipPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
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
        pricingSlot={<ServicePricingBlock serviceId="sole-proprietorship" />}
        calcPill={<ServiceCalcPill serviceId="sole-proprietorship" />}
      />
    </>
  );
}
