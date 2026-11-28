import type { Metadata } from "next";
import { GSTFilingPage } from "@/components/sections/GSTFilingPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/GSTFilingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/gst-filing" },
  title: fitTitle("GST Return Filing Services — GSTR-1, GSTR-3B & GST Filing Charges"),
  description:
    "GST return filing services online: GSTR-1, GSTR-3B and annual GST returns. GST filing charges, due dates and expert filing support for businesses across India.",
  keywords: [
    "GST return filing",
    "GSTR filing",
    "GST return filing online",
    "GSTR-1 filing",
    "GSTR-3B filing",
    "GST compliance",
    "GST due dates",
    "GST filing services",
    "GST return consultant",
    "quarterly GST return",
    "annual GST return",
  ],
  openGraph: {
    title: "GST Return Filing Services — GSTR-1, GSTR-3B & GST Filing Charges",
    description:
      "GST return filing services online: GSTR-1, GSTR-3B and annual GST returns. GST filing charges, due dates and expert filing support for businesses across India.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function GSTFilingRoute() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <GSTFilingPage
        pricingSlot={<ServicePricingBlock serviceId="gst-filing" />}
        calcPill={<ServiceCalcPill serviceId="gst-filing" />}
      />
    </>
  );
}
