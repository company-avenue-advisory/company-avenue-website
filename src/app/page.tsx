import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQ } from "@/components/sections/FAQ";
import { faqs as homeFaqs } from "@/lib/faqs/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { CalculatorsTeaser } from "@/components/sections/CalculatorsTeaser";
import { VerifyToolsTeaser } from "@/components/sections/VerifyToolsTeaser";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Company Registration & GST Services in Delhi | CA-Led",
  description:
    "Register your company, get GST, trademark & compliance done by expert CAs in Delhi. 100% online, transparent pricing. Free consultation — call today.",
  alternates: { canonical: "/" },
  keywords: [
    "company registration india",
    "private limited company registration",
    "GST registration",
    "income tax return filing",
    "trademark registration",
    "ROC compliance",
    "chartered accountant delhi",
    "startup india registration",
    "MSME registration",
    "business compliance india",
  ],
  openGraph: {
    title: "Company Avenue Advisory Pvt. Ltd. | Company Registration & Compliance Experts",
    description: "Trusted compliance partner for startups, MSMEs and growing businesses across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Company Avenue Advisory",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      {/* H1 is inside Hero */}
      <Hero />
      <Stats />
      <ClientLogos />
      <Services />
      <WhyChoose />
      <Process />
      <Industries />
      <Testimonials />
      <CalculatorsTeaser />
      <VerifyToolsTeaser />
      <BlogSection />
      <FAQ />
      <CTABanner />
    </>
  );
}
