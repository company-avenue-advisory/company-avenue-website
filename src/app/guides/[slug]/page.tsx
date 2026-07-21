import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, canonical, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: `${guide.title} | Step-by-Step Guide`,
    description: guide.excerpt,
    alternates: canonical(`/guides/${guide.slug}`),
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      url: `${SITE_URL}/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const related = [
    ...GUIDES.filter((g) => g.slug !== guide.slug && g.category === guide.category),
    ...GUIDES.filter((g) => g.slug !== guide.slug && g.category !== guide.category),
  ].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: guide.title,
            description: guide.excerpt,
            url: `${SITE_URL}/guides/${guide.slug}`,
            totalTime: guide.readTime,
            ...(guide.documents?.length
              ? { supply: guide.documents.map((d) => ({ "@type": "HowToSupply", name: d })) }
              : {}),
            step: guide.steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.detail,
              url: `${SITE_URL}/guides/${guide.slug}#step-${i + 1}`,
            })),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]),
          ...(guide.faqs?.length
            ? [faqSchema(guide.faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ]}
      />

      <GuideArticle guide={guide} />

      {/* Related guides — internal linking */}
      {related.length > 0 && (
        <section className="pb-16 bg-background">
          <div className="container-custom max-w-3xl">
            <h2 className="font-heading font-bold text-xl text-dark mb-6">Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/guides/${r.slug}`}
                  className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <span className="text-[11px] font-heading font-semibold text-accent uppercase tracking-wider block mb-1.5">
                    {r.category}
                  </span>
                  <h3 className="font-heading font-semibold text-dark text-sm leading-snug group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-100 shadow-card text-center">
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-dark">Note:</strong> This guide is for general
                informational purposes and reflects rules as reviewed on {guide.updated}.
                Government fees, thresholds and procedures change — always confirm on the linked
                official portal before filing, and consult a qualified CA/CS for advice specific
                to your situation.
              </p>
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
