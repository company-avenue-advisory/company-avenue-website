"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";
import { useLiveNews } from "@/hooks/useLiveNews";

const LIVE_CATEGORIES = ["All", "GST", "Income Tax", "Trademark", "Company Registration", "Accounting", "Compliance", "Business"];
const STATIC_CATEGORIES = ["All", "GST", "Company Registration", "Trademark", "Tax", "Business Tips"];

export default function ResourcesClient() {
  const liveArticles = useLiveNews();
  const isLive = !!liveArticles?.length;
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = isLive ? LIVE_CATEGORIES : STATIC_CATEGORIES;

  const filteredLive = useMemo(() => {
    if (!liveArticles) return [];
    if (activeCategory === "All") return liveArticles;
    return liveArticles.filter((a) => a.category === activeCategory);
  }, [liveArticles, activeCategory]);

  const filteredStatic = useMemo(() => {
    const posts = [...BLOG_POSTS, ...BLOG_POSTS];
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Knowledge Hub
          </span>
          <h1 className="heading-lg text-white mb-4">Compliance Insights & Guides</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {isLive
              ? "Real-time business and tax news from India, updated throughout the day."
              : "Practical, expert-written articles to help you navigate Indian business compliance."}
          </p>
        </div>
      </div>

      <section className="section-pad bg-background">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-heading font-medium transition-colors ${
                  cat === activeCategory
                    ? "bg-primary text-white"
                    : "bg-white border border-slate-200 text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLive ? (
            filteredLive.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLive.map((article) => (
                  <a
                    key={article.id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-300">
                          <Newspaper size={32} />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge variant="default" className="bg-white/90 text-primary backdrop-blur-sm">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-muted text-xs mb-3">
                        <span className="font-medium">{article.source}</span>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                        Read Article
                        <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">No live articles in this category right now — try another filter.</p>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStatic.map((post, i) => (
                <Link
                  key={`${post.id}-${i}`}
                  href={`/resources/${post.id}`}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" className="bg-white/90 text-primary backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-muted text-xs mb-3">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Read Article
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
