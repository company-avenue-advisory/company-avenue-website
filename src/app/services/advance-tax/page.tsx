import type { Metadata } from "next";
import { AdvanceTaxPage } from "@/components/sections/AdvanceTaxPage";
import { faqs as serviceFaqs } from "@/lib/faqs/AdvanceTaxPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/advance-tax" },
  title: "Advance Tax Calculation & Payment | Section 207-209 | Company Avenue Advisory",
  description:
    "Expert advance tax calculation and payment services. Avoid 234B/234C interest with timely quarterly instalments. Challan 280 filing, 26AS verification, year-end reconciliation. Starting ₹1,999.",
  keywords: [
    "advance tax calculation",
    "advance tax payment",
    "advance tax India",
    "section 207 income tax",
    "challan 280",
    "234B interest",
    "234C interest",
    "quarterly instalment tax",
    "advance tax consultant",
    "advance tax filing online",
    "advance tax for freelancers",
    "advance tax for business",
  ],
  openGraph: {
    title: "Advance Tax Calculation & Payment | Company Avenue Advisory",
    description:
      "Avoid 1% monthly interest under Sec 234B/234C. Expert advance tax computation, Challan 280 filing, and year-end reconciliation. PAN India service. Starting ₹1,999.",
    type: "website",
  },
};

export default function AdvanceTaxServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <AdvanceTaxPage />
    </>
  );
}
