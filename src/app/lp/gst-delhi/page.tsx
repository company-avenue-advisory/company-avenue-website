import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { canonical } from "@/lib/seo";

const config = LANDING_PAGES["gst-delhi"];

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: canonical("/lp/gst-delhi"),
};

export default function GstDelhiLandingPage() {
  return <LandingPageTemplate config={config} />;
}
