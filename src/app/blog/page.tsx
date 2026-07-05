import type { Metadata } from "next";
import { BlogHubClient } from "./BlogHubClient";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Blog — Business, Tax & Compliance Insights",
  description:
    "In-depth, fact-checked guides on GST, income tax, company registration, ROC compliance, trademarks, and business advisory for Indian startups and SMEs — plus live industry news.",
  keywords: [
    "business compliance blog India",
    "GST guides India",
    "company registration blog",
    "CA advisory blog",
    "startup compliance articles",
  ],
};

export default function BlogPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Knowledge Hub
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Insights for Founders & Finance Teams
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Practical, fact-checked guides on GST, income tax, company registration, and
            compliance — written by our CA-led team, plus live business news.
          </p>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <BlogHubClient />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
