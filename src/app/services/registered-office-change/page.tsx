import type { Metadata } from "next";
import { RegisteredOfficeChangePage } from "@/components/sections/RegisteredOfficeChangePage";
import { faqs as serviceFaqs } from "@/lib/faqs/RegisteredOfficeChangePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/registered-office-change" },
  title: "Change Registered Office Address | Company Avenue Advisory",
  description:
    "Change your company's registered office within city, state, or ROC jurisdiction. Form INC-22, INC-23, special resolution filing. Starting ₹3,999.",
};

export default function RegisteredOfficeChangeServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <RegisteredOfficeChangePage />
    </>
  );
}
