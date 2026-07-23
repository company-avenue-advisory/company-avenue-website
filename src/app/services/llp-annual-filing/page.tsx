import type { Metadata } from "next";
import { LLPAnnualFilingPage } from "@/components/sections/LLPAnnualFilingPage";
import { faqs as serviceFaqs } from "@/lib/faqs/LLPAnnualFilingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/llp-annual-filing" },
  title: "LLP Annual Filing — Form 8 & Form 11",
  description:
    "File LLP Annual Return (Form 11) and Statement of Accounts (Form 8) on time. Avoid ₹100/day penalty. Expert CA assistance. Starting ₹2,999/year.",
};

export default function LLPAnnualFilingServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <LLPAnnualFilingPage />
    </>
  );
}
