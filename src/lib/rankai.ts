import { SITE_URL } from "@/lib/seo";

/* ─────────────────────────────────────────────────────────────
   RankAI article feed — articles RankAI publishes appear on /blog
   alongside the hand-written posts in blog-posts.ts.

   API: https://docs.rankai.ai/integrations/custom-site

   Config (Vercel env vars):
     RANKAI_PROJECT_ID         the value after /dashboard/ in the
                               RankAI dashboard URL
     RANKAI_REVALIDATE_TOKEN   the rkai_… token at the end of the
                               revalidation hook URL set in RankAI

   With RANKAI_PROJECT_ID unset every function here returns empty,
   so the blog renders exactly as it did before the integration.

   Freshness: every fetch is tagged RANKAI_TAG. RankAI calls
   /api/revalidate/<token> on publish, which invalidates the tag so
   the new article is live on the next request. The hourly
   revalidate below is only a fallback if a hook call is missed.
───────────────────────────────────────────────────────────── */

export const RANKAI_TAG = "rankai";
const API_BASE = "https://rankai.ai/api/v1";
const FALLBACK_REVALIDATE_SECONDS = 3600;
const PAGE_LIMIT = 100; // API maximum
const MAX_PAGES = 10;

export interface RankAiArticleSummary {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  featuredImageUrl?: string;
}

export interface RankAiArticle extends RankAiArticleSummary {
  /** Article body as HTML. */
  content: string;
}

function projectId(): string {
  return (process.env.RANKAI_PROJECT_ID ?? "").trim();
}

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, {
      next: { tags: [RANKAI_TAG], revalidate: FALLBACK_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.success ? body : null;
  } catch (err) {
    // A RankAI outage must never take /blog down with it.
    console.warn("[rankai] fetch failed", err);
    return null;
  }
}

/** All published RankAI articles, newest first. Empty if unconfigured or unreachable. */
export async function getRankAiArticles(): Promise<RankAiArticleSummary[]> {
  const id = projectId();
  if (!id) return [];

  const out: RankAiArticleSummary[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const body = await getJson(
      `${API_BASE}/${encodeURIComponent(id)}/articles?page=${page}&limit=${PAGE_LIMIT}`
    );
    if (!body || !Array.isArray(body.data)) break;
    for (const a of body.data) {
      if (!a?.slug || !a?.title) continue;
      out.push({
        slug: String(a.slug),
        title: String(a.title),
        description: String(a.description ?? ""),
        publishedDate: String(a.publishedDate ?? ""),
        featuredImageUrl: a.featuredImageUrl || undefined,
      });
    }
    if (page >= (body.pagination?.totalPages ?? 1)) break;
  }

  return out.sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));
}

/** One RankAI article by slug, or null. */
export async function getRankAiArticle(slug: string): Promise<RankAiArticle | null> {
  const id = projectId();
  if (!id) return null;

  // publishedUrl lets RankAI track where the article lives (per its docs).
  const publishedUrl = encodeURIComponent(`${SITE_URL}/blog/${slug}`);
  const body = await getJson(
    `${API_BASE}/${encodeURIComponent(id)}/articles/${encodeURIComponent(slug)}?format=html&publishedUrl=${publishedUrl}`
  );
  const a = body?.data;
  if (!a?.title || typeof a.content !== "string") return null;

  return {
    slug,
    title: String(a.h1Title || a.title),
    description: String(a.description ?? ""),
    publishedDate: String(a.publishedDate ?? ""),
    featuredImageUrl: a.featuredImageUrl || undefined,
    content: a.content,
  };
}

/** "2026-10-17T…" → "17 Oct 2026", matching the dates in blog-posts.ts. */
export function humanDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}
