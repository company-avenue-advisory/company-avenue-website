import type { Metadata } from "next";
import { NidhiCompanyPage } from "@/components/sections/NidhiCompanyPage";
import { faqs as serviceFaqs } from "@/lib/faqs/NidhiCompanyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/nidhi-company" },
  title: "Nidhi Company Registration",
  description:
    "Register a Nidhi Company in India — a mutual benefit society under Section 406 of Companies Act 2013. Member deposits, loans, and savings. Starting ₹9,999.",
};

export default function NidhiCompanyServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <NidhiCompanyPage />
    </>
  );
}
