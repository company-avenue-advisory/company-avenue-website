import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PenLine, FileType2, ArrowLeft } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { TemplateActions } from "@/components/templates/TemplateActions";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, canonical, breadcrumbSchema } from "@/lib/seo";
import { TEMPLATE_CATEGORY_SERVICE } from "@/lib/content-links";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug);
  if (!template) return {};

  return {
    title: `${template.title} — Free Template (India)`,
    description: template.description,
    alternates: canonical(`/templates/${template.slug}`),
    openGraph: {
      title: `${template.title} — Free Template`,
      description: template.description,
      type: "article",
      url: `${SITE_URL}/templates/${template.slug}`,
    },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug);
  if (!template) notFound();

  const related = TEMPLATES.filter(
    (t) => t.slug !== template.slug && t.category === template.category
  ).slice(0, 3);
  const service = TEMPLATE_CATEGORY_SERVICE[template.category];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: template.title,
            description: template.description,
            url: `${SITE_URL}/templates/${template.slug}`,
            genre: template.category,
            inLanguage: "en-IN",
            isAccessibleForFree: true,
            learningResourceType: "Document template",
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Templates", path: "/templates" },
            { name: template.title, path: `/templates/${template.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-12">
          <div className="container-custom max-w-3xl">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-heading font-semibold mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> All Templates
            </Link>
            <span className="block text-accent text-xs font-heading font-semibold uppercase tracking-widest mb-3">
              {template.category}
            </span>
            <h1 className="font-heading font-bold text-2xl md:text-4xl text-white leading-tight mb-3">
              {template.title}
            </h1>
            <p className="text-white/55 text-sm md:text-base leading-relaxed mb-4">
              {template.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold text-white/60 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">
              <FileType2 size={12} /> {template.format}
            </span>
          </div>
        </header>

        <div className="py-12 bg-background">
          <div className="container-custom max-w-3xl">
            {/* Placeholders you must fill */}
            {template.fields.length > 0 && (
              <div className="mb-8 p-4 rounded-2xl bg-accent/[0.05] border border-accent/15">
                <div className="flex items-start gap-2.5">
                  <PenLine size={15} className="text-accent mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs text-slate-600 font-medium mr-1">
                      You&rsquo;ll need to fill:
                    </span>
                    {template.fields.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] font-body text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <TemplateActions template={template} />
            </div>

            {/* Server-rendered document body — this is the crawlable part */}
            <div className="bg-slate-100/70 rounded-2xl p-4 md:p-6">
              <pre className="bg-white rounded-xl shadow-card border border-slate-200 p-6 md:p-10 whitespace-pre-wrap font-body text-[13px] leading-relaxed text-slate-700 overflow-x-auto">
                {template.body}
              </pre>
            </div>

            {service && (
              <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-100 shadow-card">
                <p className="text-muted text-sm leading-relaxed">
                  Using this template as part of setting up or running your business? We also
                  handle{" "}
                  <Link href={service.href} className="text-primary font-semibold hover:underline">
                    {service.label}
                  </Link>{" "}
                  — done properly, the first time.
                </p>
              </div>
            )}

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="font-heading font-bold text-xl text-dark mb-5">
                  More {template.category} templates
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/templates/${r.slug}`}
                      className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
                    >
                      <h3 className="font-heading font-semibold text-dark text-sm leading-snug group-hover:text-primary transition-colors mb-1.5">
                        {r.title}
                      </h3>
                      <p className="text-muted text-xs leading-relaxed line-clamp-2">
                        {r.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-100 shadow-card">
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-dark">Disclaimer:</strong> This template is a general
                draft provided for convenience and does not constitute legal advice. Replace all
                [BRACKETED] placeholders and have important contracts reviewed by a qualified
                CA/CS or lawyer before signing. Company Avenue Advisory accepts no liability for
                its use as-is.
              </p>
            </div>
          </div>
        </div>
      </article>

      <CTABanner />
    </>
  );
}
