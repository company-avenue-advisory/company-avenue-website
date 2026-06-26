import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Company Avenue Advisory Pvt. Ltd. | Company Registration, GST, Trademark & Compliance",
  description:
    "Company Avenue Advisory — India's trusted partner for Private Limited Company Registration, GST Registration, Trademark, Income Tax Filing, ROC Compliance and Accounting. Expert Chartered Accountants. 100% Online.",
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
  },
};

export default function HomePage() {
  return (
    <>
      {/* H1 is inside Hero */}
      <Hero />
      <Stats />
      <TrustBar />
      <Services />
      <WhyChoose />
      <Process />
      <Industries />
      <Testimonials />
      <BlogSection />
      <FAQ />
      <CTABanner />
    </>
  );
}
