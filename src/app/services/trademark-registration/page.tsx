import type { Metadata } from "next";
import { TrademarkPage } from "@/components/sections/TrademarkPage";
import { faqs as serviceFaqs } from "@/lib/faqs/TrademarkPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trademark Registration in Delhi | Protect Your Brand",
  description:
    "Register your trademark in Delhi with expert help. Class search, filing & objection support. Transparent pricing, CA & CS led. Book a free consultation.",
  alternates: { canonical: "/services/trademark-registration" },
  keywords: [
    "trademark registration in Delhi",
    "trademark registration cost",
    "brand name registration",
    "TM registration online",
    "trademark search",
    "trademark objection",
  ],
  openGraph: {
    title: "Trademark Registration in Delhi | Protect Your Brand",
    description:
      "Register your trademark in Delhi with expert help. Class search, filing & objection support. CA & CS led.",
    type: "website",
  },
};

export default function TrademarkRegistrationPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={[
          serviceSchema({
            name: "Trademark Registration in Delhi",
            description:
              "Trademark registration in Delhi with expert class search, filing and objection support. CA & CS led, transparent pricing.",
            path: "/services/trademark-registration",
            areaServed: "Delhi",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Trademark Registration", path: "/services/trademark-registration" },
          ]),
        ]}
      />
      <TrademarkPage />
    </>
  );
}
