import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Users, TrendingUp, Target, Eye, Linkedin, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stats } from "@/components/sections/Stats";
import { CTABanner } from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/Badge";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "CA Jatin Aggarwal, Principal Consultant at Company Avenue Advisory — 20 years of experience in taxation, ROC compliance and business advisory for Indian startups and SMEs.",
};

const values = [
  { icon: CheckCircle, title: "Integrity", desc: "Ethical practice is the foundation of everything we do." },
  { icon: TrendingUp, title: "Excellence", desc: "We raise our standards with every client engagement." },
  { icon: Users, title: "Partnership", desc: "Your success is our success. We invest in long-term relationships." },
  { icon: Award, title: "Expertise", desc: "Qualified, experienced, and continually learning professionals." },
  { icon: Target, title: "Accountability", desc: "We own our commitments and deliver on them, every time." },
  { icon: Eye, title: "Transparency", desc: "Clear pricing, honest timelines, and open communication." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-24">
        <div className="container-custom">
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-5">Our Story</Badge>
            <h1 className="heading-lg text-white mb-5">
              Built on Trust. Driven by Expertise.
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Founded in {COMPANY.founded}, Company Avenue Advisory is led by a Chartered
              Accountant with 20 years of experience — helping entrepreneurs, startups, and
              growing businesses navigate the complex world of compliance with confidence and clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Who We Are"
                title="More Than a Filing Service"
                subtitle="We are compliance partners who understand that every business decision has a legal and financial implication. Our role is to protect you from pitfalls while clearing the path for growth."
                align="left"
              />
              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: Target,
                    title: "Our Mission",
                    desc: "To make business compliance accessible, affordable, and stress-free for every Indian entrepreneur.",
                  },
                  {
                    icon: Eye,
                    title: "Our Vision",
                    desc: "A India where every business, regardless of size, operates with full legal and financial compliance.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85"
                  alt="Modern office interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary rounded-2xl p-5 text-white shadow-lg">
                <p className="font-heading font-bold text-3xl">20+</p>
                <p className="text-white/60 text-sm">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Values */}
      <section className="section-pad bg-background">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Values"
            title="The Principles We Work By"
            subtitle="These aren't just words on a wall. They define how we treat every client, every document, and every deadline."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:shadow-card-hover transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-dark text-base mb-2">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Consultant */}
      <section className="section-pad bg-white" id="team">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Leadership"
            title="The Expert Behind Your Compliance"
            subtitle="Company Avenue Advisory is led by a Chartered Accountant with two decades of hands-on experience across taxation, ROC compliance, and business advisory."
            className="mb-16"
          />
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-2xl overflow-hidden border border-slate-100 shadow-card p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center font-heading font-bold text-white text-3xl shrink-0"
                style={{ background: "linear-gradient(135deg, #0F2D52 0%, #1a6fa8 100%)" }}
              >
                JA
              </div>
              <div>
                <p className="font-heading font-bold text-dark text-xl">CA Jatin Aggarwal</p>
                <p className="text-primary text-sm font-medium mb-2">Principal Consultant</p>
                <Badge variant="default" className="mb-3">Chartered Accountant (ICAI)</Badge>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  20 years of experience advising Indian startups and SMEs on GST, income tax,
                  ROC/MCA compliance, payroll, and virtual-CFO advisory — the principal advisor
                  behind every engagement at Company Avenue Advisory.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <a
                    href="https://www.linkedin.com/in/jatin-aggarwal-ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold hover:underline"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                  <a
                    href="mailto:jatin@companyavenueadvisory.com"
                    className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold hover:underline"
                  >
                    <Mail size={14} /> jatin@companyavenueadvisory.com
                  </a>
                </div>
              </div>
            </div>
            <p className="text-center text-muted text-xs mt-6">
              Supported by a dedicated team across taxation, ROC compliance, and payroll — every
              engagement is personally reviewed by the principal consultant.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
