import type { Metadata } from "next";
import { PSARALicensePage } from "@/components/sections/PSARALicensePage";
import { faqs as serviceFaqs } from "@/lib/faqs/PSARALicensePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/psara-license" },
  title: "PSARA License for Private Security Agencies | Company Avenue Advisory",
  description:
    "Get your PSARA 2005 license from the State Controlling Authority. Mandatory for all private security agencies in India. Security deposit, police verification, and training compliance. Starting ₹9,999.",
};

export default function PSARALicenseServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <PSARALicensePage />
    </>
  );
}
