import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2, Users, User, Receipt, FileText, IndianRupee,
  ShieldCheck, BookOpen, Wallet, Award, Rocket, Globe, ArrowRight,
  Handshake, Heart, PiggyBank, Sprout, MapPin, FilePen, ClipboardList,
  CalendarClock, Search, ArrowLeftRight, FolderOpen, Folder, IdCard,
  UserCog, TrendingUp, MapPinned, Pencil, XCircle, Plane, UtensilsCrossed,
  Briefcase, Store, Pill, Shield, Package, MessageSquareWarning, RefreshCw,
  Copyright, Lightbulb, Palette, Landmark, HeartPulse, HandHeart,
  LineChart, BarChart3, FileSpreadsheet, PersonStanding,
  BadgeDollarSign, Lightbulb as LightbulbIcon, LayoutGrid,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "All Services | Company Avenue Advisory",
  description: "Comprehensive business compliance services — company registration, GST, income tax, trademark, payroll, and more. All 49 services under one roof.",
};

const iconMap: Record<string, React.ElementType> = {
  Building2, Users, User, Receipt, FileText, IndianRupee,
  ShieldCheck, BookOpen, Wallet, Award, Rocket, Globe,
  Handshake, Heart, PiggyBank, Sprout, MapPin, FilePen, ClipboardList,
  CalendarClock, Search, ArrowLeftRight, FolderOpen, Folder, IdCard,
  UserCog, TrendingUp, MapPinned, Pencil, XCircle, Plane, UtensilsCrossed,
  Briefcase, Store, Pill, Shield, Package, MessageSquareWarning, RefreshCw,
  Copyright, Lightbulb, Palette, Landmark, HeartPulse, HandHeart,
  LineChart, BarChart3, FileSpreadsheet, PersonStanding,
};

const categories = [...new Set(SERVICES.map((s) => s.category))];

const categoryMeta: Record<string, { icon: React.ElementType; desc: string }> = {
  "Company Formation": { icon: Building2, desc: "Register any business structure — Pvt Ltd, LLP, OPC, Partnership, NGO and more." },
  "Tax & GST":         { icon: IndianRupee, desc: "GST registration, returns, income tax, TDS, advance tax and audit — full tax compliance." },
  "MCA / ROC Compliance": { icon: ClipboardList, desc: "Annual ROC filings, director KYC, company changes and corporate governance." },
  "Startup & MSME":   { icon: Rocket, desc: "DPIIT recognition, Udyam, IEC, FSSAI, trade license and sector-specific registrations." },
  "Intellectual Property": { icon: Lightbulb, desc: "Trademark, copyright, patent and design registration — protect your brand and innovations." },
  "Payroll & HR":     { icon: Users, desc: "PF, ESIC, payroll processing and gratuity — complete employee compliance." },
  "Accounting & Finance": { icon: BarChart3, desc: "Bookkeeping, financial statements, virtual CFO and business valuation." },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            All Services
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Complete Compliance. One Partner.
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            49 services across 7 categories — everything your business needs to stay registered, compliant, and growing. Handled by expert CAs, CSs, and legal professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ 15+ Years Experience</span>
            <span>✓ 1000+ Businesses Served</span>
            <span>✓ 100% Online Process</span>
            <span>✓ Transparent Pricing</span>
          </div>
        </div>
      </div>

      {/* Category quick-nav */}
      <div className="bg-white border-b border-slate-100 sticky top-[72px] z-30">
        <div className="container-custom py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-heading font-medium text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
              >
                {categoryMeta[cat]?.icon && (() => { const Icon = categoryMeta[cat].icon; return <Icon size={14} className="shrink-0" />; })()}
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services by category */}
      <section className="py-16 bg-background">
        <div className="container-custom space-y-20">
          {categories.map((cat) => {
            const catServices = SERVICES.filter((s) => s.category === cat);
            const meta = categoryMeta[cat];
            return (
              <div
                key={cat}
                id={cat.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}
                className="scroll-mt-36"
              >
                {/* Category header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 text-primary">
                    {meta?.icon && (() => { const Icon = meta.icon; return <Icon size={22} />; })()}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading font-bold text-dark text-2xl mb-1">{cat}</h2>
                    <p className="text-muted text-sm">{meta?.desc}</p>
                  </div>
                  <div className="hidden sm:block h-px flex-1 bg-slate-200 mt-5" />
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {catServices.map((service) => {
                    const Icon = iconMap[service.icon] || Globe;
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                            <Icon size={18} />
                          </div>
                          {(service as { popular?: boolean }).popular && (
                            <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-dark text-sm mb-2 group-hover:text-primary transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-muted text-xs leading-relaxed flex-1 mb-3">
                          {service.shortDesc}
                        </p>
                        <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                          Learn More
                          <ArrowRight size={11} className="transition-transform group-hover:translate-x-1 text-accent" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
