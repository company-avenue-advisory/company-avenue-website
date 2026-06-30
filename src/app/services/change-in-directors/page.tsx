import type { Metadata } from "next";
import { ChangeInDirectorsPage } from "@/components/sections/ChangeInDirectorsPage";

export const metadata: Metadata = {
  title: "Change in Directors — Appointment & Resignation | Company Avenue Advisory",
  description:
    "Appoint new directors or process resignations via Form DIR-12 on MCA portal. Board resolution, DIR-2 consent, e-filing. Compliant with Companies Act 2013. Starting ₹2,999.",
};

export default function ChangeInDirectorsServicePage() {
  return <ChangeInDirectorsPage />;
}
