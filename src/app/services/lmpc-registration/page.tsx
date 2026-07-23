import type { Metadata } from "next";
import { LMPCRegistrationPage } from "@/components/sections/LMPCRegistrationPage";
import { faqs as serviceFaqs } from "@/lib/faqs/LMPCRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/lmpc-registration" },
  title: "LMPC Registration — Legal Metrology Packaged Commodities",
  description:
    "Register under Legal Metrology (Packaged Commodities) Rules 2011 — mandatory for manufacturers, packers, and importers of pre-packaged goods in India. Label compliance + registration. Starting ₹3,999.",
};

export default function LMPCRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <LMPCRegistrationPage />
    </>
  );
}
