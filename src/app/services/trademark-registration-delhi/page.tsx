import type { Metadata } from "next";
import { CityLandingPage } from "@/components/sections/CityLandingPage";
import { canonical } from "@/lib/seo";
import { CITY_PAGES } from "@/lib/city-pages";

const page = CITY_PAGES["trademark-registration-delhi"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: canonical("/services/trademark-registration-delhi"),
};

export default function TrademarkRegistrationDelhiPage() {
  return <CityLandingPage config={page.config} />;
}
