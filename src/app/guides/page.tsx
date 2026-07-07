import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";
import { GuidesClient } from "./GuidesClient";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "How-To Guides — Registration, GST, Tax & Compliance",
  description:
    "Step-by-step, CA-reviewed guides for Indian businesses: how to register a Private Limited Company in Delhi, GST for freelancers, trademark registration, MSME/Udyam, Startup India (DPIIT), ITR filing and more — with official government sources.",
  keywords: [
    "how to register private limited company delhi",
    "gst registration for freelancers",
    "llp registration guide india",
    "trademark registration step by step",
    "udyam msme registration guide",
    "startup india dpiit recognition",
  ],
};

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Knowledge Hub · How-To Guides
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Do It Right, The First Time
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Clear, step-by-step playbooks for every registration and compliance task —
            written by our CA/CS team and cross-checked against official government portals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ {GUIDES.length} Practical Guides</span>
            <span>✓ Official Sources Cited</span>
            <span>✓ Documents &amp; Fees Listed</span>
            <span>✓ Updated for 2026</span>
          </div>
        </div>
      </div>

      {/* Guides */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <GuidesClient />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
