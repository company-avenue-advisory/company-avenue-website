import { NextResponse, type NextRequest } from "next/server";
import { waDirect } from "@/lib/seo";

/**
 * Hand-off to WhatsApp. Site links point here instead of wa.me because
 * WhatsApp answers crawlers with HTTP 429, which site audits report as
 * hundreds of broken external links. Disallowed in robots.txt.
 */
export function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text")?.slice(0, 500) || undefined;
  return NextResponse.redirect(waDirect(text), {
    status: 302,
    headers: { "X-Robots-Tag": "noindex, nofollow" },
  });
}
