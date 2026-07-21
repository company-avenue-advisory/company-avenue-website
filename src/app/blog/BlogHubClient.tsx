"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-posts";
import { useLiveNews } from "@/hooks/useLiveNews";

const FILTERS = ["All", ...BLOG_CATEGORIES, "Industry News"];

export function BlogHubClient() {
  const [filter, setFilter] = useState("All");
  const liveArticles = useLiveNews();

  const [featured, ...rest] = BLOG_POSTS;

  const filteredPosts = useMemo(() => {
    if (filter === "Industry News") return [];
    if (filter === "All") return rest;
    return rest.filter((p) => p.category === filter);
  }, [filter, rest]);

  const showNews = filter === "All" || filter === "Industry News";
  const newsToShow = filter === "Industry News" ? liveArticles ?? [] : (liveArticles ?? []).slice(0, 3);

  return (
    <>
      {/* Featured post */}
      {filter === "All" && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block w-full text-left rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-16"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <span className="inline-flex w-fit items-center gap-1.5 text-accent text-xs font-heading font-semibold uppercase tracking-widest mb-3">
              Featured · {featured.category}
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-white mb-3 max-w-2xl leading-tight">
              {featured.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mb-4 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
          <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </Link>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-heading font-medium transition-colors ${
              filter === cat
                ? "bg-primary text-white"
                : "bg-white border border-slate-200 text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group text-left bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full bg-white/90 text-primary backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="text-muted text-xs flex items-center gap-1.5"><Clock size={11} /> {post.readTime}</span>
                <span className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                  Read
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {showNews && newsToShow.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
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
                <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                  Industry News
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-muted text-xs mb-3">
                <Clock size={11} />
                <span>{article.source}</span>
                <span>· {article.date}</span>
              </div>
              <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold mt-auto pt-3 border-t border-slate-50">
                Read on {article.source}
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {filter === "Industry News" && newsToShow.length === 0 && (
        <p className="text-muted text-sm text-center py-12">
          Live news isn&rsquo;t configured right now — check back soon.
        </p>
      )}

    </>
  );
}
