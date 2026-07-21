import type { Metadata } from "next";
import { LLPPage } from "@/components/sections/LLPPage";
import { faqs as serviceFaqs } from "@/lib/faqs/LLPPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/llp-registration" },
  title: "LLP Registration in India | Limited Liability Partnership | Company Avenue Advisory",
  description:
    "Register your Limited Liability Partnership (LLP) in India with expert CAs. Complete assistance with DSC, DPIN, name reservation, MCA incorporation, PAN, TAN. 7–10 working days. 100% online.",
  keywords: [
    "LLP registration",
    "limited liability partnership registration",
    "LLP registration in india",
    "register LLP online",
    "LLP incorporation",
    "LLP company registration",
    "how to register LLP in india",
    "documents for LLP registration",
    "LLP registration process",
    "benefits of LLP registration",
  ],
  openGraph: {
    title: "LLP Registration in India | Company Avenue Advisory",
    description:
      "Register your LLP with experienced CAs. 7–10 working days, 100% online, transparent pricing.",
    type: "website",
  },
};

export default function LLPRegistrationPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <LLPPage />
    </>
  );
}
