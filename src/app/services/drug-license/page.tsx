import type { Metadata } from "next";
import { DrugLicensePage } from "@/components/sections/DrugLicensePage";
import { faqs as serviceFaqs } from "@/lib/faqs/DrugLicensePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/drug-license" },
  title: "Drug License Registration — Retail & Wholesale | Company Avenue Advisory",
  description:
    "Obtain Drug License under the Drugs & Cosmetics Act 1940. Retail, wholesale, and manufacturing licenses. Pharmacies, distributors, importers. Starting ₹3,999.",
};

export default function DrugLicenseServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <DrugLicensePage />
    </>
  );
}
