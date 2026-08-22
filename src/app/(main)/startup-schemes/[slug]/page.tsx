import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SCHEMES, getScheme, relatedSchemes } from "@/lib/schemes";
import { SchemeArticle } from "@/components/schemes/SchemeArticle";
import { SchemeCard } from "@/components/schemes/scheme-ui";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, canonical, breadcrumbSchema, OG_IMAGE } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCHEMES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scheme = getScheme(slug);
  if (!scheme) return {};

  const label = scheme.abbr ? `${scheme.name} (${scheme.abbr})` : scheme.name;
  const description = `${scheme.headline} Eligibility, benefits, documents, step-by-step application process and CA-led support from Company Avenue Advisory. ${scheme.amount}.`;

  return {
    title: `${label} — Eligibility, Benefits & How to Apply`,
    description: description.slice(0, 300),
    keywords: [
      `${scheme.name} scheme`,
      ...(scheme.abbr ? [`${scheme.abbr} scheme apply`, `${scheme.abbr} eligibility`] : []),
      `${scheme.name} how to apply`,
      "government scheme for startups india",
      scheme.ministry,
    ],
    alternates: canonical(`/startup-schemes/${scheme.slug}`),
    openGraph: {
      title: `${label} — How to Apply`,
      description: scheme.headline,
      type: "article",
      url: `${SITE_URL}/startup-schemes/${scheme.slug}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function SchemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scheme = getScheme(slug);
  if (!scheme) notFound();

  const related = relatedSchemes(scheme, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to apply for ${scheme.name}`,
            description: scheme.headline,
            url: `${SITE_URL}/startup-schemes/${scheme.slug}`,
            ...(scheme.documents?.length
              ? { supply: scheme.documents.map((d) => ({ "@type": "HowToSupply", name: d })) }
              : {}),
            step: scheme.howToApply.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.detail,
              url: `${SITE_URL}/startup-schemes/${scheme.slug}#step-${i + 1}`,
            })),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            name: scheme.name,
            alternateName: scheme.abbr,
            description: scheme.whatIsThis,
            url: `${SITE_URL}/startup-schemes/${scheme.slug}`,
            serviceType: scheme.support,
            provider: {
              "@type": "GovernmentOrganization",
              name: scheme.ministry,
            },
            areaServed: { "@type": "Country", name: "India" },
            audience: {
              "@type": "Audience",
              audienceType: "Startups and early-stage businesses in India",
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Startup Schemes", path: "/startup-schemes" },
            { name: scheme.abbr ?? scheme.name, path: `/startup-schemes/${scheme.slug}` },
          ]),
        ]}
      />

      <SchemeArticle scheme={scheme} />

      {/* Related schemes — internal linking across the directory */}
      <section className="pb-16 bg-background">
        <div className="container-custom max-w-4xl">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="font-heading font-bold text-xl text-dark">
              Founders looking at this also consider
            </h2>
            <Link
              href="/startup-schemes#directory"
              className="shrink-0 text-xs font-heading font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Browse all {SCHEMES.length} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <SchemeCard key={r.slug} scheme={r} />
            ))}
          </div>

          <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-100 shadow-card text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Note:</strong> Details above are compiled from the
              DPIIT Playbook of Government Schemes and Initiatives for Startups (June 2026) and
              the official sources linked on this page. Scheme windows, amounts and eligibility
              conditions change through calls and notifications — verify on the official portal
              before filing, and consult a qualified CA/CS on your specific facts.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
