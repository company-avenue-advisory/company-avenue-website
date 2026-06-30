import type { Metadata } from "next";
import { RegisteredOfficeChangePage } from "@/components/sections/RegisteredOfficeChangePage";

export const metadata: Metadata = {
  title: "Change Registered Office Address | Company Avenue Advisory",
  description:
    "Change your company's registered office within city, state, or ROC jurisdiction. Form INC-22, INC-23, special resolution filing. Starting ₹3,999.",
};

export default function RegisteredOfficeChangeServicePage() {
  return <RegisteredOfficeChangePage />;
}
