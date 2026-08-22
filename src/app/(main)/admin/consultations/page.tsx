import { redirect } from "next/navigation";

/** The old read-only submissions table lived here. Kept as a redirect so
 *  existing bookmarks land on the new console. */
export default function LegacyConsultationsPage() {
  redirect("/admin/leads");
}
