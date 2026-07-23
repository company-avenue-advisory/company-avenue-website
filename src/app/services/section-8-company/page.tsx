import type { Metadata } from "next";
import { Section8CompanyPage } from "@/components/sections/Section8CompanyPage";
import { faqs as serviceFaqs } from "@/lib/faqs/Section8CompanyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/section-8-company" },
  title: "Section 8 Company Registration (NGO)",
  description:
    "Register a Section 8 Company (Non-Profit) under Companies Act 2013. Ideal for NGOs, charities, and social enterprises. MCA license, 12A & 80G registration assistance. Starting ₹7,999.",
};

export default function Section8CompanyServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <Section8CompanyPage />
    </>
  );
}
