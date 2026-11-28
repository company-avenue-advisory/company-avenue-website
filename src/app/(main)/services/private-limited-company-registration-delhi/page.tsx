import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { CityLandingPage } from "@/components/sections/CityLandingPage";
import { canonical, fitTitle } from "@/lib/seo";
import { CITY_PAGES } from "@/lib/city-pages";

const page = CITY_PAGES["private-limited-company-registration-delhi"];

export const metadata: Metadata = {
  title: fitTitle(page.meta.title),
  description: page.meta.description,
  alternates: canonical("/services/private-limited-company-registration-delhi"),
};

export default function PrivateLimitedCompanyRegistrationDelhiPage() {
  return (
    <>
      <CityLandingPage config={page.config} />
      <SearchQA path="/services/private-limited-company-registration-delhi" />
    </>
  );
}
