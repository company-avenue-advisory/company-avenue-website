import type { Metadata } from "next";
import { DirectorKYCPage } from "@/components/sections/DirectorKYCPage";
import { faqs as serviceFaqs } from "@/lib/faqs/DirectorKYCPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/director-kyc" },
  title: "Director KYC (DIR-3 KYC) Filing | Company Avenue Advisory",
  description:
    "File DIR-3 KYC annually to keep your DIN active. Avoid ₹5,000 penalty and DIN deactivation. Quick online filing. Starting ₹499 per director.",
};

export default function DirectorKYCServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <DirectorKYCPage />
    </>
  );
}
