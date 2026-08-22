import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { homeFor } from "@/lib/auth";

/** /admin is just a doorway — middleware normally redirects first; this is
 *  the belt-and-braces fallback. */
export default async function AdminIndexPage() {
  const session = await getSession();
  redirect(session ? homeFor(session.role) : "/admin/login");
}
