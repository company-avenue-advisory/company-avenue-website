import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionToken, isAuthConfigured, homeFor } from "@/lib/auth";
import { isGonePath, legacyDestination } from "@/lib/legacy-redirects";

/* ─────────────────────────────────────────────────────────────────────────────
   Five jobs, strictly in this order. The order matters — see each note.

   0.         Host routing. us.companyavenueadvisory.com is a separate
              property served by this same app; it returns early and shares
              none of the steps below.
   1. WS-1.3  410 Gone for legacy pages carrying incorrect statements of law.
   2. WS-2    301 for every other legacy WordPress URL, one hop.
   3.         Trailing-slash normalisation for the rest of the site, which
              next.config.ts delegated here via skipTrailingSlashRedirect.
   4.         The admin console auth gate (pre-existing behaviour).

   1–3 run before 4 and return early, so a public legacy URL is never gated
   behind admin auth. Step 4 is also now explicitly scoped to /admin and
   /api/admin: the matcher below covers the whole site, and the
   "auth is not configured" 503 it can return must never reach a public page.
───────────────────────────────────────────────────────────────────────────── */

const PUBLIC_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

const ADMIN_ONLY = ["/admin/leads", "/admin/consultations"];
const EMPLOYEE_ONLY = ["/admin/my-leads"];

function isApi(pathname: string) {
  return pathname.startsWith("/api/");
}

/** Paths the admin auth gate applies to. Everything else is public. */
function isGuarded(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin");
}

/**
 * 410 Gone body. Deliberately a real page rather than a bare status: a human
 * who followed an old bookmark should be told the page was withdrawn and
 * offered somewhere useful, while crawlers read the 410 and drop the URL.
 *
 * The reason string is NOT rendered — it explains a legal defect to the
 * development team and would only confuse a visitor.
 */
function gonePage(pathname: string): NextResponse {
  const body = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page withdrawn — Company Avenue Advisory</title>
<style>
  :root{color-scheme:light}
  body{margin:0;min-height:100vh;display:grid;place-items:center;
       font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;
       background:#f6f8fb;color:#0f172a;padding:24px}
  .card{max-width:34rem;background:#fff;border:1px solid #e6ebf2;border-radius:16px;
        padding:40px;box-shadow:0 1px 3px rgba(15,23,42,.06)}
  h1{font-size:1.5rem;margin:0 0 12px}
  p{color:#475569;margin:0 0 20px}
  a{display:inline-block;margin-right:16px;color:#0b5cab;font-weight:600;text-decoration:none}
  a:hover{text-decoration:underline}
</style></head>
<body><div class="card">
  <h1>This page has been withdrawn</h1>
  <p>The guidance that used to sit at <code>${pathname}</code> was out of date, so we
     removed it rather than leave it up. Our current, reviewed guidance is below.</p>
  <a href="/services">Browse services</a>
  <a href="/contact">Speak to a Chartered Accountant</a>
</div></body></html>`;

  return new NextResponse(body, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // A withdrawn page is a durable decision, but keep the window short
      // enough that reinstating it does not fight a year of CDN cache.
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "noindex",
    },
  });
}


/* ── US property routing ────────────────────────────────────────────────────
   us.companyavenueadvisory.com is served by this same Next app: the subdomain
   root is rewritten to /us, which lives outside the (main) route group and so
   renders without any India chrome.

   Everything else on that host is a 404 by design. Without it the entire India
   site would answer on the US hostname — 100+ pages of duplicate content under
   a second domain, which is a genuine ranking hazard rather than a tidiness
   problem.
─────────────────────────────────────────────────────────────────────────── */

const US_ORIGIN = "https://us.companyavenueadvisory.com";

function isUsHost(host: string) {
  return host === "us.companyavenueadvisory.com" || host.startsWith("us.");
}

/** True only for the live India domain — not localhost, not preview builds. */
function isProductionMainHost(host: string) {
  return host === "companyavenueadvisory.com" || host === "www.companyavenueadvisory.com";
}

/** Minimal 404 for the US host. Deliberately not the India not-found page,
 *  which offers GST and ROC services to a US visitor. */
function usNotFound(): NextResponse {
  const body = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page not found — Avenue Advisory</title>
<style>
  :root{color-scheme:light}
  body{margin:0;min-height:100vh;display:grid;place-items:center;
       font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;
       background:#0F2D52;color:#fff;padding:24px;text-align:center}
  h1{font-size:1.5rem;margin:0 0 12px}
  p{color:rgba(255,255,255,.7);margin:0 0 24px}
  a{display:inline-block;background:#D6A64F;color:#fff;font-weight:600;
    text-decoration:none;padding:12px 24px;border-radius:12px}
</style></head>
<body><div>
  <h1>Page not found</h1>
  <p>This address is not part of the Avenue Advisory US site.</p>
  <a href="/">Go to the US home page</a>
</div></body></html>`;

  return new NextResponse(body, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
  });
}

/**
 * The whole US host in one function.
 *
 *   /            → rewrite to /us   (URL bar keeps the clean subdomain root)
 *   /us, /us/*   → 301 to /         (one canonical URL, not two)
 *   /api/*       → through          (the lead form posts to /api/consultation)
 *   anything else→ 404
 */
function usSite(req: NextRequest, pathname: string, search: string): NextResponse {
  // Trailing slashes are normalised here too — next.config.ts delegated this
  // to middleware site-wide, and returning early below would otherwise skip it.
  if (pathname !== "/" && pathname.endsWith("/")) {
    const stripped = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(new URL(`${stripped}${search}`, req.url), 308);
  }

  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/us";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/us" || pathname.startsWith("/us/")) {
    return NextResponse.redirect(new URL(`/${search}`, req.url), 301);
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  return usNotFound();
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ── 0. Host routing — us.companyavenueadvisory.com ──────────────────────
  // Runs first: the US property must never fall through to an India legacy
  // redirect, the admin gate, or an India page.
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (isUsHost(host)) {
    return usSite(req, pathname, search);
  }

  // The same page is reachable at companyavenueadvisory.com/us, which would
  // split ranking signals with the subdomain. Send it to the canonical host —
  // a 301 rather than a 404 so a human who lands there still gets the page.
  //
  // Gated on the production host so that localhost and *.vercel.app previews
  // keep serving /us directly for testing.
  if (isProductionMainHost(host) && (pathname === "/us" || pathname.startsWith("/us/"))) {
    return NextResponse.redirect(`${US_ORIGIN}${search}`, 301);
  }

  // ── 1. WS-1.3 — 410 Gone. Matches both slash forms. ─────────────────────
  if (isGonePath(pathname)) {
    return gonePage(pathname);
  }

  // ── 2. WS-2 — legacy 301s, one hop from either slash form. ──────────────
  // NextResponse.redirect defaults to 307; 301 is passed explicitly because
  // WS-2.2 requires a permanent 301 specifically. The query string is carried
  // over so a legacy URL arriving with UTMs does not lose its attribution.
  const destination = legacyDestination(pathname);
  if (destination) {
    return NextResponse.redirect(new URL(`${destination}${search}`, req.url), 301);
  }

  // ── 3. Trailing-slash normalisation ─────────────────────────────────────
  // next.config.ts sets skipTrailingSlashRedirect so steps 1 and 2 could see
  // the original path. That means Next no longer does this, and without it
  // /about/ and /about would both render 200 as duplicate content. 308 (not
  // 301) preserves the request method, matching Next's own default here.
  if (pathname !== "/" && pathname.endsWith("/")) {
    const stripped = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(new URL(`${stripped}${search}`, req.url), 308);
  }

  // ── 4. Admin auth ───────────────────────────────────────────────────────
  // Scoped check: the matcher is site-wide, so an unguarded path must fall
  // through here untouched rather than meet the 503 below.
  if (!isGuarded(pathname)) {
    return NextResponse.next();
  }

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

/**
 * Site-wide matcher.
 *
 * It has to be site-wide: this middleware now owns trailing-slash
 * normalisation for every route (see skipTrailingSlashRedirect in
 * next.config.ts), so it must see every page request. It is also why the
 * legacy paths no longer need enumerating here — the runtime lookups in
 * src/lib/legacy-redirects.ts are the single source of truth, and adding a row
 * there is now the entire change.
 *
 * The negative lookahead skips what must never be redirected or rewritten:
 * Next's build output and image optimiser, and any request with a file
 * extension (static assets, sitemap.xml, robots.txt, the OG images). Those are
 * served straight from the filesystem, and a middleware invocation per asset
 * would be pure overhead.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_vercel|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
