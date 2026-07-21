import type { Metadata } from "next";
import { MSMERegistrationPage } from "@/components/sections/MSMERegistrationPage";
import { faqs as serviceFaqs } from "@/lib/faqs/MSMERegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/msme-registration" },
  title: "MSME / Udyam Registration Online | Collateral-Free Loans & Govt. Schemes | Company Avenue",
  description:
    "Register your business under Udyam (MSME) and unlock collateral-free loans, government subsidies, priority procurement, and 20+ exclusive schemes. ₹0 government fee. Certificate in 1 business day.",
  keywords: [
    "MSME registration",
    "Udyam registration",
    "Udyam certificate",
    "MSME registration online",
    "collateral free loan MSME",
    "CGTMSE scheme",
    "MSME government schemes",
    "Udyog Aadhaar registration",
    "micro small medium enterprise registration",
    "MSME benefits India",
  ],
  openGraph: {
    title: "MSME / Udyam Registration | Company Avenue",
    description:
      "Get your Udyam Certificate in 1 business day. Zero government fees. Unlock CGTMSE loans, subsidies, and 20+ government schemes for MSMEs.",
    type: "website",
  },
};

export default function MSMERegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <MSMERegistrationPage />
    </>
  );
}
