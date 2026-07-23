import type { Metadata } from "next";
import { IndianSubsidiaryPage } from "@/components/sections/IndianSubsidiaryPage";
import { faqs as serviceFaqs } from "@/lib/faqs/IndianSubsidiaryPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/indian-subsidiary" },
  title: "Indian Subsidiary Registration for Foreign Companies",
  description:
    "Incorporate a wholly-owned Indian subsidiary (Private Limited Company) with full FEMA/RBI compliance. FCGPR filing, FDI advisory, and ongoing ROC support. Starting ₹14,999.",
};

export default function IndianSubsidiaryServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <IndianSubsidiaryPage />
    </>
  );
}
