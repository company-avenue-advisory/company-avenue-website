import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { canonical } from "@/lib/seo";

const config = LANDING_PAGES["pvt-ltd-delhi"];

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: canonical("/lp/pvt-ltd-delhi"),
};

export default function PvtLtdDelhiLandingPage() {
  return <LandingPageTemplate config={config} />;
}
