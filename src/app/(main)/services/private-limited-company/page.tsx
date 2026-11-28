import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { PrivateLimitedPage } from "@/components/sections/PrivateLimitedPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/PrivateLimitedPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: fitTitle("Private Limited Company Registration Online in India — Fees & Process"),
  description:
    "Register a private limited company online in India. Pvt Ltd company registration fees, cost, documents and step-by-step process, handled end to end by experts. Incorporation in 7–10 days.",
  alternates: { canonical: "/services/private-limited-company" },
  keywords: [
    "private limited company registration in Delhi",
    "pvt ltd registration cost",
    "company incorporation",
    "pvt ltd company registration online",
    "register pvt ltd company",
    "company registration in india",
  ],
  openGraph: {
    title: "Private Limited Company Registration Online in India — Fees & Process",
    description:
      "Register a private limited company online in India. Pvt Ltd company registration fees, cost, documents and step-by-step process, handled end to end by experts. Incorporation in 7–10 days.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function PrivateLimitedCompanyPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={[
          serviceSchema({
            name: "Private Limited Company Registration in Delhi",
            description:
              "Expert-led Private Limited Company registration in Delhi in 7–10 days — name approval, MCA incorporation, PAN, TAN and compliance.",
            path: "/services/private-limited-company",
            areaServed: "Delhi",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Private Limited Company Registration", path: "/services/private-limited-company" },
          ]),
        ]}
      />
      <PrivateLimitedPage
        pricingSlot={<CalculatorPricingSlot serviceId="private-limited-company" lockEntity="pvtltd" />}
        calcPill={<JumpToCalculatorPill />}
      />
      <SearchQA path="/services/private-limited-company" />
    </>
  );
}
