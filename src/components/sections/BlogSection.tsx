"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight, Newspaper } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLiveNews } from "@/hooks/useLiveNews";
import { BLOG_POSTS } from "@/lib/blog-posts";

const CATEGORY_COLORS = [
  "bg-blue-50 text-blue-700",
  "bg-green-50 text-green-700",
  "bg-purple-50 text-purple-700",
  "bg-amber-50 text-amber-700",
];

const staticPosts = BLOG_POSTS.slice(0, 3).map((post, i) => ({
  id: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  readTime: post.readTime,
  date: post.date,
  image: post.image,
  categoryColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
}));

const liveCategories = ["All", "GST", "Income Tax", "Trademark", "Company Registration", "Accounting", "Compliance", "Business"];
const staticCategories = ["GST", "Company Registration", "Trademark", "Income Tax", "Accounting", "Compliance"];

export function BlogSection() {
  const liveArticles = useLiveNews();
  const isLive = !!liveArticles?.length;
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = isLive ? liveCategories : staticCategories;

  const preview = useMemo(() => {
    if (!liveArticles) return [];
    const filtered = activeCategory === "All" ? liveArticles : liveArticles.filter((a) => a.category === activeCategory);
    return filtered.slice(0, 3);
  }, [liveArticles, activeCategory]);

  return (
    <section className="py-14 md:py-24 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9 md:mb-14">
          <SectionHeader
            eyebrow="Knowledge Hub"
            title="Latest Business & Tax Insights"
            subtitle={
              isLive
                ? "Real-time news from India's business and tax world."
                : "Expert articles to help you navigate compliance, tax and business registration."
            }
            align="left"
            className="mb-0"
          />
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-heading font-medium rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            View All Articles
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => isLive && setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-medium transition-all ${
                isLive && cat === activeCategory
                  ? "bg-primary text-white border border-primary"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary cursor-pointer"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLive && !preview.length && (
          <p className="text-muted text-sm mb-10">No live articles in this category right now — try another filter.</p>
        )}

        {isLive ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preview.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card hover:border-primary/10 transition-all duration-300 h-full"
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
                      <span className={`text-xs font-heading font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted text-xs mb-3">
                      <span className="font-medium">{article.source}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold mt-auto">
                      Read More
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card hover:border-primary/10 transition-all duration-300 h-full"
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
                      <span className={`text-xs font-heading font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted text-xs mb-3">
                      <Clock size={11} />
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold mt-auto">
                      Read More
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
