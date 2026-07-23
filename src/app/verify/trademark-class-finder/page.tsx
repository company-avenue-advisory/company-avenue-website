import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Tag } from "lucide-react";
import { TrademarkClassFinder } from "@/components/tools/TrademarkClassFinder";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Trademark Class Finder — Which NICE Class Fits Your Brand?",
  description:
    "Free trademark class finder for India. Describe your business and instantly see which of the 45 NICE trademark classes it falls under, then check name availability.",
  keywords: ["trademark classes India", "NICE classification trademark", "trademark class finder", "which trademark class"],
};

export default function TrademarkClassFinderPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Trademark Class Finder</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Tag size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Trademark Class Finder
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Trademarks are registered under one or more of 45 NICE classes. Describe what your
            business does and we&rsquo;ll suggest the classes most relevant to you.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <TrademarkClassFinder />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Why does the class matter?",
                content:
                  "Trademark protection is class-specific. Registering \"Apple\" in Class 25 (clothing) doesn't stop someone else using it in Class 9 (electronics) — pick the right class(es) for your actual business.",
              },
              {
                title: "Goods vs Services",
                content:
                  "Classes 1–34 cover physical goods (cosmetics, food, electronics). Classes 35–45 cover services (advertising, IT, restaurants, legal). Most businesses need at least one class from each if they sell both.",
              },
              {
                title: "Next Step",
                content:
                  "Once you know your class, search the exact name on the official IP India registry before filing — an identical or confusingly similar mark already registered in your class can get your application rejected.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
