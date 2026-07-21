import type { Metadata } from "next";
import { VirtualCFOPage } from "@/components/sections/VirtualCFOPage";
import { faqs as serviceFaqs } from "@/lib/faqs/VirtualCFOPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/virtual-cfo" },
  title: "Virtual CFO Services for Startups & SMEs | Company Avenue Advisory",
  description:
    "Strategic financial leadership without a full-time CFO. MIS reports, cash flow management, investor readiness, compliance calendar. Starting ₹9,999/month.",
};

export default function VirtualCFOServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <VirtualCFOPage />
    </>
  );
}
