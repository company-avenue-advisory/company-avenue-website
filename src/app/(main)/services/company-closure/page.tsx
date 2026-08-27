import type { Metadata } from "next";
import { CompanyClosurePage } from "@/components/sections/CompanyClosurePage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/CompanyClosurePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/company-closure" },
  title: "Company Closure — Strike Off & Winding Up",
  description:
    "Close your company legally via STK-2 strike off under Section 248 or voluntary winding up via NCLT. Clear pending filings, cancel GST, and achieve clean dissolution. Strike-off ₹20,000 end to end; MCA fee ₹2,500 under CCFS-2026 to 31 August 2026.",
};

export default function CompanyClosureServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <CompanyClosurePage
        pricingSlot={<ServicePricingBlock serviceId="company-closure" />}
        calcPill={<ServiceCalcPill serviceId="company-closure" />}
      />
    </>
  );
}
