import type { Metadata } from "next";
import { TradeLicensePage } from "@/components/sections/TradeLicensePage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/trade-license" },
  title: "Trade License Registration — Municipal Corporation | Company Avenue Advisory",
  description:
    "Obtain a Trade License from your Municipal Corporation before starting business. Mandatory for shops, restaurants, factories, and all commercial establishments. Starting ₹1,499.",
};

export default function TradeLicenseServicePage() {
  return <TradeLicensePage />;
}
