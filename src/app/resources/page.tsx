import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description: "Expert guides on GST, income tax, company registration, and business compliance for Indian entrepreneurs.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
