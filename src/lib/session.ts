/* Server-only session reader for route handlers and server components.
   Kept out of lib/auth.ts because next/headers cannot be imported from
   the Edge middleware. */
import { cookies } from "next/headers";
import { SESSION_COOKIE, readSessionToken, type Session } from "@/lib/auth";

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  return readSessionToken(jar.get(SESSION_COOKIE)?.value);
}

/** Session or null — callers return 401 themselves so the message stays
 *  specific to the route. */
export async function requireSession(): Promise<Session | null> {
  return getSession();
}
