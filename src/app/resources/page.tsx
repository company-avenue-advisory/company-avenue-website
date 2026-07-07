import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";
import { ResourcesClient } from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Business Resources — Tax Rates, TDS Chart, GST, ROC Fees & Due Dates",
  description:
    "A single reference desk for Indian businesses: income tax slabs (new & old regime FY 2025-26), TDS rate chart, GST rates & return due dates, MCA/ROC filing fees, stamp duty, government fees, ROC offices, and a compliance calendar — with official sources.",
  keywords: [
    "income tax slabs 2025-26",
    "tds rate chart india",
    "gst return due dates",
    "roc filing fees mca",
    "stamp duty company incorporation",
    "compliance calendar india",
  ],
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Reference Desk · Business Resources
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Every Rate &amp; Deadline, in One Place
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Tax slabs, the TDS chart, GST rates, ROC fees, stamp duty, government fees and a
            compliance calendar — compiled from official portals and kept current.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ 8 Reference Sections</span>
            <span>✓ FY 2025–26</span>
            <span>✓ Official Sources Cited</span>
            <span>✓ Instant Search</span>
          </div>
        </div>
      </div>

      {/* Reference content */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <ResourcesClient />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
