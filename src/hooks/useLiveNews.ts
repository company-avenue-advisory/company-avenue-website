import { useEffect, useState } from "react";
import type { NewsArticle } from "@/app/api/news/route";

export function useLiveNews() {
  const [articles, setArticles] = useState<NewsArticle[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news")
      .then((res) => res.json())
      .then((data: { articles: NewsArticle[] }) => {
        if (!cancelled) setArticles(data.articles ?? []);
      })
      .catch(() => {
        if (!cancelled) setArticles([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return articles;
}
