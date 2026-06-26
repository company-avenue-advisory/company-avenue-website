"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const posts = [
  {
    id: "private-limited-company-registration-guide",
    title: "Complete Guide to Private Limited Company Registration in India (2024)",
    excerpt: "Everything you need to know — documents, timeline, costs, and compliance requirements for incorporating a Pvt. Ltd.",
    category: "Company Registration",
    readTime: "8 min read",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80",
    categoryColor: "bg-blue-50 text-blue-700",
  },
  {
    id: "gst-registration-process",
    title: "GST Registration: Step-by-Step Guide for New Businesses",
    excerpt: "A clear walkthrough of the process, eligibility criteria, required documents and common mistakes to avoid.",
    category: "GST",
    readTime: "6 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    categoryColor: "bg-green-50 text-green-700",
  },
  {
    id: "trademark-registration-india",
    title: "Why Trademark Registration is Critical for Your Brand in India",
    excerpt: "Protect your brand identity before someone else does. Classes, filing timelines and enforcement explained.",
    category: "Trademark",
    readTime: "5 min read",
    date: "Nov 28, 2024",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80",
    categoryColor: "bg-purple-50 text-purple-700",
  },
];

const categories = ["GST", "Company Registration", "Trademark", "Income Tax", "Accounting", "Compliance"];

export function BlogSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Knowledge Hub"
            title="Latest Business & Tax Insights"
            subtitle="Expert articles to help you navigate compliance, tax and business registration."
            align="left"
            className="mb-0"
          />
          <Link
            href="/resources"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-heading font-medium rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            View All Articles
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-heading font-medium text-slate-600 hover:border-primary hover:text-primary cursor-pointer transition-all"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/resources/${post.id}`}
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
      </div>
    </section>
  );
}
