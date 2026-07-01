import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Lightbulb } from "lucide-react";
import { BusinessStructureAdvisor } from "@/components/calculators/BusinessStructureAdvisor";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Business Structure Advisor — Which Entity Should You Register? | Company Avenue Advisory",
  description:
    "Answer 6 quick questions and get a personalized recommendation on the right business structure — Private Limited, LLP, OPC, Partnership, or Sole Proprietorship. Free quiz tool.",
  keywords: [
    "what type of company should I register India",
    "business structure advisor India",
    "pvt ltd or LLP quiz",
    "best business structure for startup India",
    "which entity to register for business India",
  ],
};

export default function BusinessStructureAdvisorPage() {
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
            <span className="text-white/70">Business Structure Advisor</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Lightbulb size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Interactive Quiz
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Business Structure Advisor
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Not sure whether to register a Pvt Ltd, LLP, OPC, or Partnership? Answer 6
            simple questions and get a personalised recommendation with reasoning — in under
            2 minutes.
          </p>
        </div>
      </div>

      {/* Tool */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <BusinessStructureAdvisor />

          {/* Quick entity overview */}
          <div className="mt-16">
            <h2 className="font-heading font-bold text-dark text-xl mb-6 text-center">
              Entity Types at a Glance
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Private Limited", emoji: "🏢", best: "Startups, funded businesses, scalable ventures", href: "/services/private-limited-company" },
                { name: "LLP", emoji: "🤝", best: "Professionals, consultants, service businesses", href: "/services/llp-registration" },
                { name: "One Person Company", emoji: "👤", best: "Solo founders wanting limited liability", href: "/services/one-person-company" },
                { name: "Partnership Firm", emoji: "👥", best: "Very small local/family businesses (2–20 partners)", href: "/services/partnership-firm" },
                { name: "Section 8 (NGO)", emoji: "🤲", best: "Charities, foundations, social enterprises", href: "/services/section-8-company" },
                { name: "Sole Proprietorship", emoji: "🧑‍💼", best: "Individual traders, micro-businesses, early-stage freelancers", href: "/services/sole-proprietorship" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:border-primary/20 p-5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-heading font-bold text-dark text-sm group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{item.best}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
