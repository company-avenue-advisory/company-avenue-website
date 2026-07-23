import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, canonical, breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_SERVICE } from "@/lib/content-links";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// Posts store a human date ("2 Jul 2026"). Schema.org wants ISO-8601.
function isoDate(human: string): string | undefined {
  const d = new Date(human);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title}`,
    description: post.excerpt,
    alternates: canonical(`/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: post.image }],
      publishedTime: isoDate(post.date),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  // Internal linking: same-category posts first, topped up with recent ones so
  // every article always links onward to three others.
  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const service = CATEGORY_SERVICE[post.category];
  const published = isoDate(post.date);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            url: `${SITE_URL}/blog/${post.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_URL}/blog/${post.slug}`,
            },
            articleSection: post.category,
            ...(published ? { datePublished: published, dateModified: published } : {}),
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        {/* Hero */}
        <header className="relative pt-32 pb-16 bg-gradient-to-br from-dark to-primary-900">
          <div className="container-custom max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-heading font-semibold mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>
            <span className="block text-accent text-xs font-heading font-semibold uppercase tracking-widest mb-3">
              {post.category}
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-white/40 text-xs">
              <time dateTime={published}>{post.date}</time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="container-custom max-w-3xl -mt-8 md:-mt-10 relative z-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Body */}
        <div className="py-12 md:py-16 bg-background">
          <div className="container-custom max-w-3xl">
            <div className="legal-prose">
              {post.content.map((block, i) => {
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

            {/* Contextual link down to the money page for this topic */}
            {service && (
              <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-100 shadow-card">
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Need help with this in practice? Our CA-led team handles{" "}
                  <Link href={service.href} className="text-primary font-semibold hover:underline">
                    {service.label}
                  </Link>{" "}
                  end to end — documents, filing and follow-up.
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-heading font-semibold hover:gap-2.5 transition-all"
                >
                  View {service.label} <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Related posts — internal linking */}
            {related.length > 0 && (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <h2 className="font-heading font-bold text-xl text-dark mb-6">
                  Continue reading
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-primary text-[11px] font-heading font-semibold uppercase tracking-wide mb-1.5">
                          {r.category}
                        </span>
                        <h3 className="font-heading font-semibold text-dark text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <CTABanner />
    </>
  );
}
