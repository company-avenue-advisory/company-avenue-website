import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { RANKAI_TAG } from "@/lib/rankai";

/* ─────────────────────────────────────────────────────────────
   RankAI revalidation hook. RankAI calls
     https://companyavenueadvisory.com/api/revalidate/<token>
   whenever it publishes or rewrites an article. We drop the cached
   RankAI feed and the /blog pages so the change is live on the next
   request — no redeploy.

   RankAI does not document the method or body it sends, so both GET
   and POST are accepted and the body is ignored: the token in the
   path is the only thing checked.

   Config (Vercel env var):
     RANKAI_REVALIDATE_TOKEN   the rkai_… value at the end of the hook
                               URL in RankAI
───────────────────────────────────────────────────────────── */

function tokenMatches(given: string): boolean {
  const expected = (process.env.RANKAI_REVALIDATE_TOKEN ?? "").trim();
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function handle(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!tokenMatches(token)) {
    return NextResponse.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(RANKAI_TAG);
  revalidatePath("/blog", "layout"); // /blog and every /blog/[slug]
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export const GET = handle;
export const POST = handle;
