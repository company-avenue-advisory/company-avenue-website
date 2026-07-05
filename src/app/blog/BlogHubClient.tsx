"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, ArrowRight, ArrowUpRight, Newspaper, X } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from "@/lib/blog-posts";
import { useLiveNews } from "@/hooks/useLiveNews";

const FILTERS = ["All", ...BLOG_CATEGORIES, "Industry News"];

export function BlogHubClient() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<BlogPost | null>(null);
  const liveArticles = useLiveNews();

  const [featured, ...rest] = BLOG_POSTS;

  const filteredPosts = useMemo(() => {
    if (filter === "Industry News") return [];
    if (filter === "All") return rest;
    return rest.filter((p) => p.category === filter);
  }, [filter, rest]);

  const showNews = filter === "All" || filter === "Industry News";
  const newsToShow = filter === "Industry News" ? liveArticles ?? [] : (liveArticles ?? []).slice(0, 3);

  // Lock background scroll + support Escape while a post is expanded.
  // The site uses Lenis for smooth scrolling, which hijacks wheel/touch
  // input itself — toggling body overflow alone doesn't stop it, so we
  // also have to pause Lenis directly via the instance SmoothScroll exposes.
  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <>
      {/* Featured post */}
      {filter === "All" && (
        <button
          onClick={() => setExpanded(featured)}
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
        </button>
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
          <button
            key={post.slug}
            onClick={() => setExpanded(post)}
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
          </button>
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

      {/* Expand-in-place article overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997] bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setExpanded(null)}
          >
            <motion.article
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative bg-white rounded-3xl w-full max-w-3xl md:min-h-[50vh] max-h-[88vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setExpanded(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={16} className="text-dark" />
              </button>

              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image src={expanded.image} alt={expanded.title} fill className="object-cover" sizes="768px" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-flex text-accent text-xs font-heading font-semibold uppercase tracking-widest mb-2">
                    {expanded.category}
                  </span>
                  <h2 className="font-heading font-bold text-xl md:text-3xl text-white leading-tight mb-2">
                    {expanded.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <span>{expanded.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {expanded.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 legal-prose">
                {expanded.content.map((block, i) => {
                  if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
                  if (block.type === "list")
                    return (
                      <ul key={i}>
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  return <p key={i}>{block.text}</p>;
                })}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
