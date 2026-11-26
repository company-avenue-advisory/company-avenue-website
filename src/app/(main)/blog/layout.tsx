import { BLOG_POSTS } from "@/lib/blog-posts";
import { getRankAiArticles } from "@/lib/rank-ai";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const handWritten = new Set(BLOG_POSTS.map((p) => p.slug));
  const rankAi = (await getRankAiArticles()).filter((a) => !handWritten.has(a.slug));
  const items = [
    ...BLOG_POSTS.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
    ...rankAi.map((a) => ({ href: `/blog/${a.slug}`, label: a.title })),
  ];
  return (
    <>
      {children}
      <RelatedLinks title="More articles" items={items} />
    </>
  );
}
