import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { RANK_AI_TAG } from "@/lib/rank-ai";

/* ─────────────────────────────────────────────────────────────
   Rank.ai revalidation hook (app.rank.ai → Integrations → Next.js).

   Rank.ai POSTs { paths: ["/blog", "/blog/<slug>"] } to
     /api/revalidate/<token>
   whenever it publishes or updates an article.

   Auth follows Rank.ai's documented setup: the unguessable token in
   the hook URL is the credential and no env var is required. As
   defence in depth:
     - only /blog and /blog/* are ever revalidated, whatever is sent,
       so the worst a stranger can do is refresh blog caches;
     - if REVALIDATION_SECRET is set in Vercel, the token must match it.
───────────────────────────────────────────────────────────── */

const ALLOWED = /^\/blog(\/[a-z0-9-]+)?$/;

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const secret = (process.env.REVALIDATION_SECRET ?? "").trim();
  if (secret && token !== secret) {
    return NextResponse.json({ revalidated: [], error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}) as { paths?: unknown });
  const asked: unknown[] = Array.isArray(body?.paths) ? body.paths : [];
  const paths = asked.filter((p): p is string => typeof p === "string" && ALLOWED.test(p));

  revalidateTag(RANK_AI_TAG);
  for (const p of paths) revalidatePath(p);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: paths });
}
