import type { Metadata } from "next";
import { TradeLicensePage } from "@/components/sections/TradeLicensePage";
import { faqs as serviceFaqs } from "@/lib/faqs/TradeLicensePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/trade-license" },
  title: "Trade License Registration — Municipal Corporation | Company Avenue Advisory",
  description:
    "Obtain a Trade License from your Municipal Corporation before starting business. Mandatory for shops, restaurants, factories, and all commercial establishments. Starting ₹1,499.",
};

export default function TradeLicenseServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <TradeLicensePage />
    </>
  );
}
