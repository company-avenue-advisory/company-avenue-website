import type { Metadata } from "next";
import { CompanyNameChangePage } from "@/components/sections/CompanyNameChangePage";
import { faqs as serviceFaqs } from "@/lib/faqs/CompanyNameChangePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/company-name-change" },
  title: "Company Name Change — INC-24 Filing | Company Avenue Advisory",
  description:
    "Change your company name legally via Special Resolution, MGT-14, and INC-24 filing with ROC. Fresh Certificate of Incorporation issued. Starting ₹3,999.",
};

export default function CompanyNameChangeServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <CompanyNameChangePage />
    </>
  );
}
