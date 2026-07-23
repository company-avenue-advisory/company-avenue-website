import { NextRequest, NextResponse } from "next/server";

// Protect the admin dashboard and its data API with HTTP Basic Auth.
// Credentials live in env vars ADMIN_USER / ADMIN_PASSWORD (change them in
// Vercel → Settings → Environment Variables, then redeploy — see README).

// ── Best-effort brute-force throttle (Task 1.1 follow-up) ────────────────────
// In-memory per-IP counter of FAILED attempts. NOTE: middleware runs on
// distributed/serverless instances, so this state is per-instance and resets on
// cold start — it slows down trivial scripted attacks against a warm instance
// but is NOT a substitute for a shared store. For hard guarantees, back this
// with Upstash/Vercel KV. A strong 16+ char ADMIN_PASSWORD remains the primary
// defense.
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILS = 10; // failed attempts per IP per window
const fails = new Map<string, { count: number; first: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = fails.get(ip);
  if (!rec) return false;
  if (now - rec.first > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function recordFail(ip: string): void {
  const now = Date.now();
  const rec = fails.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    fails.set(ip, { count: 1, first: now });
  } else {
    rec.count += 1;
  }
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER ?? "";
  const pass = process.env.ADMIN_PASSWORD ?? "";

  // If not configured, block access outright rather than leaving it open.
  if (!user || !pass) {
    return new NextResponse("Admin login is not configured.", { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return new NextResponse("Too many attempts. Try again later.", {
      status: 429,
      headers: { "Retry-After": "900" },
    });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6)); // "user:pass"
    const idx = decoded.indexOf(":");
    const givenUser = decoded.slice(0, idx);
    const givenPass = decoded.slice(idx + 1);
    if (givenUser === user && givenPass === pass) {
      fails.delete(ip); // reset on success
      return NextResponse.next();
    }
  }

  // Wrong or missing credentials — count it and re-challenge.
  recordFail(ip);
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Avenue Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
