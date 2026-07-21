import type { Metadata } from "next";
import { BranchOfficePage } from "@/components/sections/BranchOfficePage";
import { faqs as serviceFaqs } from "@/lib/faqs/BranchOfficePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/branch-office" },
  title: "Branch Office / Liaison Office / Project Office in India | Company Avenue Advisory",
  description:
    "Set up a Branch Office, Liaison Office, or Project Office in India with RBI approval under FEMA. Form FNC filing, AD bank coordination, and annual compliance support. Starting ₹19,999.",
};

export default function BranchOfficeServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <BranchOfficePage />
    </>
  );
}
