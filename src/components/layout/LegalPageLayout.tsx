import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, intro, children }: LegalPageLayoutProps) {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">{title}</h1>
          <p className="text-white/40 text-xs font-heading uppercase tracking-wide mb-4">
            Last updated: {lastUpdated}
          </p>
          <p className="text-white/55 text-base max-w-2xl leading-relaxed">{intro}</p>
        </div>
      </div>

      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto legal-prose">{children}</div>
        </div>
      </section>
    </>
  );
}
