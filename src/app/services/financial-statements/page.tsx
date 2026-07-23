import type { Metadata } from "next";
import { FinancialStatementsPage } from "@/components/sections/FinancialStatementsPage";
import { faqs as serviceFaqs } from "@/lib/faqs/FinancialStatementsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/financial-statements" },
  title: "Financial Statements Preparation & Filing",
  description:
    "Statutory financial statements — Balance Sheet, P&L, Cash Flow, Director's Report — prepared in Schedule III format under Companies Act 2013. Audit-ready and AOC-4 filing. Starting ₹4,999/year.",
};

export default function FinancialStatementsServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <FinancialStatementsPage />
    </>
  );
}
