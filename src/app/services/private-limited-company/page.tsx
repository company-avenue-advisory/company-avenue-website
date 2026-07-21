import type { Metadata } from "next";
import { PrivateLimitedPage } from "@/components/sections/PrivateLimitedPage";
import { faqs as serviceFaqs } from "@/lib/faqs/PrivateLimitedPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Private Limited Company Registration in Delhi | Fast",
  description:
    "Register your Pvt Ltd company in Delhi in 7–10 days. CA-led, 100% online, fixed transparent pricing, no hidden fees. Book a free consultation now.",
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
    title: "Private Limited Company Registration in Delhi",
    description:
      "Register your Pvt Ltd company in Delhi in 7–10 days. CA-led, 100% online, transparent pricing.",
    type: "website",
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
              "CA-led Private Limited Company registration in Delhi in 7–10 days — name approval, MCA incorporation, PAN, TAN and compliance.",
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
      <PrivateLimitedPage />
    </>
  );
}
