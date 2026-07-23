import type { Metadata } from "next";
import { OPCPage } from "@/components/sections/OPCPage";
import { faqs as serviceFaqs } from "@/lib/faqs/OPCPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/one-person-company" },
  title: "One Person Company (OPC) Registration Online",
  description:
    "Register your One Person Company (OPC) online with Company Avenue Advisory. Compare OPC vs Sole Proprietorship vs Pvt Ltd, understand eligibility, documents, process, compliance, and pricing.",
  keywords: [
    "one person company registration",
    "OPC registration india",
    "register OPC online",
    "one person company",
    "OPC company registration",
    "OPC vs sole proprietorship",
    "OPC vs private limited company",
    "single owner company",
    "business registration india",
    "MCA registration",
    "startup registration",
  ],
  openGraph: {
    title: "One Person Company (OPC) Registration Online | Company Avenue Advisory",
    description:
      "Register your OPC with experienced CAs. Compare OPC vs Sole Proprietorship vs Pvt Ltd. 7–10 working days, 100% online, transparent pricing.",
    type: "website",
  },
};

export default function OnePersonCompanyPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <OPCPage />
    </>
  );
}
