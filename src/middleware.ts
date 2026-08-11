import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionToken, isAuthConfigured, homeFor } from "@/lib/auth";

/* Gate the admin console with the signed session cookie issued by
   /api/admin/login. Two roles:

     admin    → /admin/leads      (every lead, assigns work)
     employee → /admin/my-leads   (only leads assigned to them)

   Brute-force throttling lives in the login route now, since that is the
   only place credentials are checked.                                    */

const PUBLIC_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

const ADMIN_ONLY = ["/admin/leads", "/admin/consultations"];
const EMPLOYEE_ONLY = ["/admin/my-leads"];

function isApi(pathname: string) {
  return pathname.startsWith("/api/");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isAuthConfigured()) {
    return new NextResponse("Admin login is not configured.", { status: 503 });
  }

  const session = await readSessionToken(req.cookies.get(SESSION_COOKIE)?.value);

  // Login page: bounce an already-signed-in user straight to their console.
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    if (pathname === "/admin/login" && session) {
      return NextResponse.redirect(new URL(homeFor(session.role), req.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    if (isApi(pathname)) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    const url = new URL("/admin/login", req.url);
    // Remember where they were headed so login can send them back.
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // /admin itself is just a doorway to the right console.
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL(homeFor(session.role), req.url));
  }

  // Page-level role gating. API handlers do their own, finer-grained checks.
  if (!isApi(pathname)) {
    const wrongRole =
      (session.role !== "admin" && ADMIN_ONLY.some((p) => pathname.startsWith(p))) ||
      (session.role !== "employee" && EMPLOYEE_ONLY.some((p) => pathname.startsWith(p)));
    if (wrongRole) {
      return NextResponse.redirect(new URL(homeFor(session.role), req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
