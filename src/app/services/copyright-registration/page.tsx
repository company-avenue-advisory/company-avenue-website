import type { Metadata } from "next";
import { CopyrightRegistrationPage } from "@/components/sections/CopyrightRegistrationPage";

export const metadata: Metadata = {
  title: "Copyright Registration in India — Books, Software, Music, Films | Company Avenue Advisory",
  description:
    "Register copyright for literary works, software, music, films, and artwork under the Copyright Act 1957. Protection for life + 60 years across 170+ Berne Convention countries. Starting ₹2,999.",
};

export default function CopyrightRegistrationServicePage() {
  return <CopyrightRegistrationPage />;
}
