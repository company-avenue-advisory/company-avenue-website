import type { Metadata } from "next";
import { GstAmendmentPage } from "@/components/sections/GstAmendmentPage";
import { faqs as serviceFaqs } from "@/lib/faqs/GstAmendmentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/gst-amendment" },
  title: "GST Amendment — Update GST Registration Details",
  description:
    "Update your GST registration details — business name, address, authorized signatory, bank account. Core and non-core amendments on GST portal. Starting ₹999.",
};

export default function GSTAmendmentServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <GstAmendmentPage />
    </>
  );
}
