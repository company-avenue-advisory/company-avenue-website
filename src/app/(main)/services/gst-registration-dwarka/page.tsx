import type { Metadata } from "next";
import { CityLandingPage } from "@/components/sections/CityLandingPage";
import { canonical, fitTitle } from "@/lib/seo";
import { CITY_PAGES } from "@/lib/city-pages";

const page = CITY_PAGES["gst-registration-dwarka"];

export const metadata: Metadata = {
  title: fitTitle(page.meta.title),
  description: page.meta.description,
  alternates: canonical("/services/gst-registration-dwarka"),
};

export default function GstRegistrationDwarkaPage() {
  return <CityLandingPage config={page.config} />;
}
