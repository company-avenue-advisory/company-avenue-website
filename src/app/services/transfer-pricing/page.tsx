import type { Metadata } from "next";
import { TransferPricingPage } from "@/components/sections/TransferPricingPage";
import { faqs as serviceFaqs } from "@/lib/faqs/TransferPricingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/transfer-pricing" },
  title: "Transfer Pricing Compliance & Documentation",
  description:
    "Transfer pricing study report, Form 3CEB filing, and APA advisory for international transactions with associated enterprises. Arm's length price documentation. Starting ₹19,999.",
};

export default function TransferPricingServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <TransferPricingPage />
    </>
  );
}
