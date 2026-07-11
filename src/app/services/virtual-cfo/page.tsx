import type { Metadata } from "next";
import { VirtualCFOPage } from "@/components/sections/VirtualCFOPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/virtual-cfo" },
  title: "Virtual CFO Services for Startups & SMEs | Company Avenue Advisory",
  description:
    "Strategic financial leadership without a full-time CFO. MIS reports, cash flow management, investor readiness, compliance calendar. Starting ₹9,999/month.",
};

export default function VirtualCFOServicePage() {
  return <VirtualCFOPage />;
}
