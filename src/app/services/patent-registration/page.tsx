import type { Metadata } from "next";
import { PatentRegistrationPage } from "@/components/sections/PatentRegistrationPage";

export const metadata: Metadata = {
  title: "Patent Registration in India | Company Avenue Advisory",
  description:
    "File patent application under the Patents Act 1970 — provisional and complete specifications. Protects inventions for 20 years. Expert patent attorneys. Starting ₹14,999.",
};

export default function PatentRegistrationServicePage() {
  return <PatentRegistrationPage />;
}
