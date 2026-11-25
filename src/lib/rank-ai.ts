import { SITE_URL } from "@/lib/seo";

/* ─────────────────────────────────────────────────────────────
   Rank.ai article feed (app.rank.ai). Articles Rank.ai publishes
   appear on /blog alongside the hand-written posts in blog-posts.ts.

   Endpoints are keyed by our domain, so nothing needs configuring:
     list    GET {API}/view          → { website, articles: [...] }
     single  GET {API}/article/{slug} → { ..., content: "<html>" }

   Freshness: every fetch is tagged RANK_AI_TAG. Rank.ai POSTs to
   /api/revalidate/<token> on publish, which invalidates the tag and
   the /blog paths. The hourly revalidate is only a fallback.

   Articles whose slug is still null in Rank.ai are skipped: the
   single-article endpoint is slug-only, so they have no page yet.
───────────────────────────────────────────────────────────── */

export const RANK_AI_TAG = "rank-ai";
const API = `https://api.rank.ai/api/v1/dynamic-blog/domain/${new URL(SITE_URL).hostname}`;
const FALLBACK_REVALIDATE_SECONDS = 3600;

interface RankAiFields {
  name?: string;
  subtitle?: string;
  image?: string;
  metaDescription?: string;
  featuredImageUrl?: string;
}

export interface RankAiArticleSummary {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  imageUrl?: string;
}

export interface RankAiArticle extends RankAiArticleSummary {
  /** Article body as HTML. */
  content: string;
}

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, {
      next: { tags: [RANK_AI_TAG], revalidate: FALLBACK_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    // A Rank.ai outage must never take /blog down with it.
    console.warn("[rank-ai] fetch failed", err);
    return null;
  }
}

function summary(a: any): RankAiArticleSummary | null {
  if (!a?.slug || !a?.title) return null;
  const f: RankAiFields = a.fields ?? {};
  const title = String(a.title);
  // Rank.ai often sets subtitle to the title itself; don't repeat it.
  const sub = f.metaDescription || (f.subtitle && f.subtitle !== title ? f.subtitle : "");
  return {
    slug: String(a.slug),
    title,
    description: String(sub ?? ""),
    publishedDate: String(a.published_at ?? ""),
    imageUrl: f.featuredImageUrl || f.image || undefined,
  };
}

/** All published Rank.ai articles that have a slug, newest first. Empty on failure. */
export async function getRankAiArticles(): Promise<RankAiArticleSummary[]> {
  const body = await getJson(`${API}/view`);
  const list: any[] = Array.isArray(body?.articles) ? body.articles : [];
  return list
    .map(summary)
    .filter((a): a is RankAiArticleSummary => a !== null)
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));
}

/** One Rank.ai article by slug, or null. */
export async function getRankAiArticle(slug: string): Promise<RankAiArticle | null> {
  const a = await getJson(`${API}/article/${encodeURIComponent(slug)}`);
  const s = summary(a);
  if (!s || typeof a.content !== "string") return null;
  return {
    ...s,
    description: s.description || excerpt(a.content),
    content: withImageAlts(a.content, s.title),
  };
}

/**
 * Rank.ai often ships an article with no meta description. Fall back to the
 * opening text of the body so the page never goes out without one.
 */
function excerpt(html: string, max = 155): string {
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

/** Rank.ai body images arrive without alt text; label them with the article title. */
function withImageAlts(html: string, title: string): string {
  const alt = title.replace(/"/g, "&quot;");
  return html.replace(/<img\b(?![^>]*\balt=)/gi, `<img alt="${alt}"`);
}

/** "2026-10-17T…" → "17 Oct 2026", matching the dates in blog-posts.ts. */
export function humanDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}
