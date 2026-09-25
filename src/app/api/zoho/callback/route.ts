import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────
   One-time OAuth callback for the Zoho CRM integration.

   Exchanges the authorization `code` Zoho hands back for a
   long-lived refresh token. Run once, manually, from the admin's
   browser (see dev brief §2 Step 1); after the refresh token is
   copied into the ZOHO_REFRESH_TOKEN Vercel env var, this route
   is never hit again in normal operation.
───────────────────────────────────────────────────────────── */

const TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";
const REDIRECT_URI = "https://companyavenueadvisory.com/api/zoho/callback";

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.ZOHO_CLIENT_ID ?? "",
    client_secret: process.env.ZOHO_CLIENT_SECRET ?? "",
    redirect_uri: REDIRECT_URI,
    code,
  });

  const res = await fetch(TOKEN_URL, { method: "POST", body: params });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.refresh_token) {
    console.error("[zoho] OAuth token exchange failed:", data);
    return NextResponse.json({ error: "Token exchange failed", detail: data }, { status: 502 });
  }

  // Copy this into the Vercel env var ZOHO_REFRESH_TOKEN, then this route's
  // job is done. Logged server-side as well as returned once here — both are
  // fine for a one-time admin setup step, neither is fine to leave lying
  // around afterwards, so don't screenshot or paste this response anywhere.
  console.log("[zoho] refresh token (copy into ZOHO_REFRESH_TOKEN):", data.refresh_token);
  return NextResponse.json({ ok: true, refresh_token: data.refresh_token });
}
