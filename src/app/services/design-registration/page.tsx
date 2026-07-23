import type { Metadata } from "next";
import { DesignRegistrationPage } from "@/components/sections/DesignRegistrationPage";
import { faqs as serviceFaqs } from "@/lib/faqs/DesignRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/design-registration" },
  title: "Design Registration in India — Designs Act 2000",
  description:
    "Protect your product's visual appearance — shape, pattern, and ornamentation — under the Designs Act 2000. Up to 15 years of exclusive protection. Starting ₹4,999 (excl. govt fees).",
};

export default function DesignRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <DesignRegistrationPage />
    </>
  );
}
