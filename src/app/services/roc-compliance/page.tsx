import type { Metadata } from "next";
import { ROCCompliancePage } from "@/components/sections/ROCCompliancePage";
import { faqs as serviceFaqs } from "@/lib/faqs/ROCCompliancePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/roc-compliance" },
  title: "ROC Annual Compliance for Private Limited Companies | Company Avenue Advisory",
  description:
    "Complete ROC annual compliance — AOC-4, MGT-7, board meetings, statutory registers. Avoid MCA penalties up to ₹5 lakh. Expert CA support. Starting ₹5,999/year.",
};

export default function ROCComplianceServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <ROCCompliancePage />
    </>
  );
}
