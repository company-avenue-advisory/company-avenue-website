import type { Metadata } from "next";
import { GstAmendmentPage } from "@/components/sections/GstAmendmentPage";

export const metadata: Metadata = {
  title: "GST Amendment — Update GST Registration Details | Company Avenue Advisory",
  description:
    "Update your GST registration details — business name, address, authorized signatory, bank account. Core and non-core amendments on GST portal. Starting ₹999.",
};

export default function GSTAmendmentServicePage() {
  return <GstAmendmentPage />;
}
