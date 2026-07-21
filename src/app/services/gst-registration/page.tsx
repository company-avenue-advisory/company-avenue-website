import type { Metadata } from "next";
import { GSTPage } from "@/components/sections/GSTPage";
import { faqs as serviceFaqs } from "@/lib/faqs/GSTPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GST Registration in Delhi | Get GSTIN Online Fast",
  description:
    "Get your GSTIN in Delhi quickly with expert CAs. 100% online GST registration, document help, transparent pricing. Free consultation — chat on WhatsApp.",
  alternates: { canonical: "/services/gst-registration" },
  keywords: [
    "GST registration in Delhi",
    "GST registration online",
    "GSTIN registration",
    "new GST registration",
    "apply GSTIN",
    "GST consultant Delhi",
  ],
  openGraph: {
    title: "GST Registration in Delhi | Get GSTIN Online Fast",
    description:
      "Get your GSTIN in Delhi quickly with expert CAs. 100% online, transparent pricing, document help.",
    type: "website",
  },
};

export default function GSTRegistrationPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={[
          serviceSchema({
            name: "GST Registration in Delhi",
            description:
              "100% online GST registration in Delhi with expert CAs — eligibility check, document help and fast GSTIN issuance.",
            path: "/services/gst-registration",
            areaServed: "Delhi",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "GST Registration", path: "/services/gst-registration" },
          ]),
        ]}
      />
      <GSTPage />
    </>
  );
}
