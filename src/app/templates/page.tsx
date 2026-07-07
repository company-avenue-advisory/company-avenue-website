import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";
import { TemplatesClient } from "./TemplatesClient";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Free Business Document Templates — Offer Letters, NDAs, Resolutions & Invoices",
  description:
    "Download free, ready-to-use business document templates for Indian companies — job offer letters, appointment letters, NDAs, board resolutions, founders' agreements, consultant agreements, GST tax invoices and more. Copy or download in seconds.",
  keywords: [
    "offer letter template india",
    "board resolution format",
    "NDA template india",
    "GST invoice format",
    "founders agreement template",
    "consultant agreement template",
  ],
};

export default function TemplatesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Free Downloads · Document Library
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Business Templates, Ready to Use
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Professionally drafted offer letters, NDAs, board resolutions, agreements and
            GST invoices — preview, copy or download and adapt in minutes. No signup.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ {TEMPLATES.length} Templates</span>
            <span>✓ Copy or Download</span>
            <span>✓ India-Specific</span>
            <span>✓ Free Forever</span>
          </div>
        </div>
      </div>

      {/* Library */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <TemplatesClient />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
