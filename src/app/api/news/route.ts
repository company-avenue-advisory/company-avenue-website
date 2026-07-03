import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────
   Live business/tax news for the Knowledge Hub, sourced from
   NewsData.io (free tier: https://newsdata.io/register).
   Set NEWSDATA_API_KEY in .env.local to enable. Falls back to
   an empty list (client shows static posts) if unset or on error.
───────────────────────────────────────────────────────────── */
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY ?? "";
const NEWSDATA_URL = "https://newsdata.io/api/1/latest";

// Free-tier "q" search is capped at 100 characters — keep this tight and
// scoped to compliance/tax/business topics so entertainment, sports and
// infra stories that NewsData still tags "business" get filtered out.
const SEARCH_QUERY = "GST OR tax OR RBI OR MSME OR startup OR trademark OR compliance";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  image: string | null;
  category: string;
  date: string;
}

const CATEGORY_KEYWORDS: [string, RegExp][] = [
  ["GST", /\bgst\b/i],
  ["Income Tax", /income[\s-]?tax|\bitr\b/i],
  ["Trademark", /trademark|\bip\b|patent|copyright/i],
  ["Company Registration", /company registration|incorporat|\bllp\b|\bopc\b|startup/i],
  ["Accounting", /accounting|audit|bookkeeping/i],
  ["Compliance", /compliance|\brbi\b|\bmsme\b|regulat/i],
];

function deriveCategory(title: string, excerpt: string): string {
  const text = `${title} ${excerpt}`;
  for (const [label, pattern] of CATEGORY_KEYWORDS) {
    if (pattern.test(text)) return label;
  }
  return "Business";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export async function GET() {
  if (!NEWSDATA_API_KEY) {
    return NextResponse.json({ articles: [] as NewsArticle[] });
  }

  const params = new URLSearchParams({
    apikey: NEWSDATA_API_KEY,
    country: "in",
    language: "en",
    category: "business",
    q: SEARCH_QUERY,
  });

  try {
    const res = await fetch(`${NEWSDATA_URL}?${params.toString()}`, {
      // Cache on the server for 30 minutes so we don't burn the free daily quota.
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ articles: [] as NewsArticle[] });
    }

    const data = await res.json();
    const results: unknown[] = Array.isArray(data.results) ? data.results : [];

    const articles: NewsArticle[] = results.slice(0, 12).map((item) => {
      const a = item as Record<string, unknown>;
      const title = String(a.title ?? "").trim();
      const excerpt = String(a.description ?? "").trim().slice(0, 160);
      return {
        id: String(a.article_id ?? a.link ?? crypto.randomUUID()),
        title,
        excerpt,
        link: String(a.link ?? ""),
        source: String(a.source_id ?? a.source_name ?? "News"),
        image: (a.image_url as string) || null,
        category: deriveCategory(title, excerpt),
        date: formatDate(String(a.pubDate ?? "")),
      };
    }).filter((a) => a.title && a.link);

    // Articles without an image render an empty placeholder — push them
    // to the back so image-bearing stories fill the first grid rows.
    articles.sort((a, b) => Number(!a.image) - Number(!b.image));

    return NextResponse.json({ articles });
  } catch (err) {
    console.error("[news API]", err);
    return NextResponse.json({ articles: [] as NewsArticle[] });
  }
}
