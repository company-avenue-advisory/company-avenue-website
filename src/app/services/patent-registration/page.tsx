import type { Metadata } from "next";
import { PatentRegistrationPage } from "@/components/sections/PatentRegistrationPage";
import { faqs as serviceFaqs } from "@/lib/faqs/PatentRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/patent-registration" },
  title: "Patent Registration in India | Company Avenue Advisory",
  description:
    "File patent application under the Patents Act 1970 — provisional and complete specifications. Protects inventions for 20 years. Expert patent attorneys. Starting ₹14,999.",
};

export default function PatentRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <PatentRegistrationPage />
    </>
  );
}
