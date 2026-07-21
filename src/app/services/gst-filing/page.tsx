import type { Metadata } from "next";
import { GSTFilingPage } from "@/components/sections/GSTFilingPage";
import { faqs as serviceFaqs } from "@/lib/faqs/GSTFilingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/gst-filing" },
  title: "GST Return Filing Online | GSTR-1, GSTR-3B & Annual GST Returns | Company Avenue Advisory",
  description:
    "File GST returns online with expert assistance. Learn about GSTR-1, GSTR-3B, annual GST returns, due dates, penalties, compliance requirements, and filing timelines.",
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
    title: "GST Return Filing Online | GSTR-1, GSTR-3B | Company Avenue Advisory",
    description:
      "Expert GST return filing — GSTR-1, GSTR-3B, GSTR-9 and more. Timely filing, ITC reconciliation, zero late fees. PAN India service.",
    type: "website",
  },
};

export default function GSTFilingRoute() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <GSTFilingPage />
    </>
  );
}
