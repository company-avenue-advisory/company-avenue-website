import type { Metadata } from "next";
import { CityLandingPage } from "@/components/sections/CityLandingPage";
import { canonical, fitTitle } from "@/lib/seo";
import { CITY_PAGES } from "@/lib/city-pages";

const page = CITY_PAGES["company-registration-gurgaon"];

export const metadata: Metadata = {
  title: fitTitle(page.meta.title),
  description: page.meta.description,
  alternates: canonical("/services/company-registration-gurgaon"),
};

export default function CompanyRegistrationGurgaonPage() {
  return <CityLandingPage config={page.config} />;
}
