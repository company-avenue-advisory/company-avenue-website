import type { Metadata } from "next";
import { ITRPage } from "@/components/sections/ITRPage";
import { faqs as serviceFaqs } from "@/lib/faqs/ITRPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/income-tax-return" },
  title: "Income Tax Return (ITR) Filing Online | Expert Tax Filing Services | Company Avenue Advisory",
  description:
    "File your Income Tax Return online with Company Avenue Advisory. Understand ITR forms, eligibility, required documents, due dates, deductions, refunds, and expert tax filing services.",
  keywords: [
    "income tax return filing",
    "ITR filing",
    "file income tax return",
    "income tax return online",
    "ITR filing india",
    "income tax consultant",
    "income tax filing services",
    "ITR filing for salaried employees",
    "ITR filing for businesses",
    "income tax return due date",
    "income tax return documents",
  ],
  openGraph: {
    title: "Income Tax Return (ITR) Filing Online | Company Avenue Advisory",
    description:
      "Expert ITR filing for individuals, businesses & companies. Maximum deductions, accurate computation, timely filing. PAN India service.",
    type: "website",
  },
};

export default function IncomeTaxReturnPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <ITRPage />
    </>
  );
}
