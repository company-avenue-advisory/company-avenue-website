import { NextRequest, NextResponse } from "next/server";

// Protect the admin dashboard and its data API with HTTP Basic Auth.
// Credentials live in env vars ADMIN_USER / ADMIN_PASSWORD.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER ?? "";
  const pass = process.env.ADMIN_PASSWORD ?? "";

  // If not configured, block access outright rather than leaving it open.
  if (!user || !pass) {
    return new NextResponse("Admin login is not configured.", { status: 503 });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6)); // "user:pass"
    const idx = decoded.indexOf(":");
    const givenUser = decoded.slice(0, idx);
    const givenPass = decoded.slice(idx + 1);
    if (givenUser === user && givenPass === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Avenue Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
