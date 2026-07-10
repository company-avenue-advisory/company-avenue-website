import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export function CalcPageShell({
  title,
  breadcrumb,
  intro,
  children,
  faqs,
}: {
  title: string;
  breadcrumb: string;
  intro: string;
  children: React.ReactNode;
  faqs?: { title: string; content: string }[];
}) {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/calculators" className="hover:text-white/70 transition-colors">Calculators</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{breadcrumb}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Calculator size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">Free Tool</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">{title}</h1>
          <p className="text-white/50 text-base max-w-2xl">{intro}</p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          {children}

          {faqs && faqs.length > 0 && (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {faqs.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
