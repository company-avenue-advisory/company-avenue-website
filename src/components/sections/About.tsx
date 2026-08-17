"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Award, Users, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const milestones = [
  { year: "2009", label: "Founded in New Delhi" },
  { year: "2014", label: "500+ clients milestone" },
  { year: "2018", label: "Expanded to GST & Startup services" },
  { year: "2024", label: "1000+ businesses served" },
];

const values = [
  {
    icon: CheckCircle,
    title: "Integrity",
    desc: "We maintain the highest ethical standards in every engagement.",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    desc: "Continuous improvement in quality, accuracy, and client outcomes.",
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "Long-term relationships built on trust and consistent delivery.",
  },
  {
    icon: Award,
    title: "Expertise",
    desc: "CAs, CSs, and legal specialists with deep domain knowledge.",
  },
];

export function About() {
  return (
    <section className="section-pad bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=85"
                alt="Stock photograph of a team working in a modern office"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Accent block */}
            <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-primary rounded-2xl -z-10" />
            <div className="absolute -left-4 top-8 bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-sm">ISO Certified</p>
                  <p className="text-muted text-xs">Quality Assured Service</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-card space-y-3 max-w-[180px]">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <p className="font-heading font-bold text-primary text-xs">{m.year}</p>
                    <p className="text-muted text-xs leading-snug">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge variant="accent" className="mb-5">About Us</Badge>
            <SectionHeader
              title="Fifteen Years of Trusted Compliance Excellence"
              subtitle="We are a team of Chartered Accountants, Company Secretaries, and legal professionals committed to simplifying business compliance for Indian entrepreneurs and growing companies."
              align="left"
              className="mb-8"
            />

            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-4 rounded-xl bg-background border border-slate-100"
                >
                  <v.icon size={20} className="text-primary mb-2" />
                  <p className="font-heading font-semibold text-dark text-sm mb-1">
                    {v.title}
                  </p>
                  <p className="text-muted text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <Button href="/about" variant="primary" size="md" icon={<CheckCircle size={15} />} iconPosition="left">
              Learn Our Story
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
