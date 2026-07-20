import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI / answer-engine crawlers we explicitly welcome. If these are blocked (or a
// future CDN rule blocks them), the site simply cannot be cited by ChatGPT,
// Perplexity, Claude, Gemini or Google AI Overviews — so keep them allowed.
const AI_CRAWLERS = [
  "GPTBot",          // OpenAI — training/crawl
  "OAI-SearchBot",   // OpenAI — ChatGPT Search retrieval
  "ChatGPT-User",    // ChatGPT browsing on a user's behalf
  "PerplexityBot",   // Perplexity index
  "Perplexity-User", // Perplexity live fetch
  "ClaudeBot",       // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",         // powers ChatGPT's web results
  "cohere-ai",
];

const DISALLOW = ["/admin", "/api/", "/thank-you"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
