"use client";
import { motion } from "framer-motion";
import {
  Rocket, ShoppingBag, Heart, Factory, Monitor,
  Briefcase, Globe, UtensilsCrossed, GraduationCap,
  TrendingUp, Building, Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const industries = [
  { name: "Startups", icon: Rocket },
  { name: "Retail", icon: ShoppingBag },
  { name: "Healthcare", icon: Heart },
  { name: "Manufacturing", icon: Factory },
  { name: "IT Companies", icon: Monitor },
  { name: "Consulting Firms", icon: Briefcase },
  { name: "E-commerce", icon: Globe },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Import & Export", icon: Layers },
  { name: "Education", icon: GraduationCap },
  { name: "Financial Services", icon: TrendingUp },
  { name: "Real Estate", icon: Building },
];

export function Industries() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Industries"
          title="Businesses We Serve"
          subtitle="Across every sector — from early-stage startups to established enterprises — we bring the same level of expertise and care."
          className="mb-10 md:mb-16"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center text-center py-5 px-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-primary hover:border-primary transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-white/15 flex items-center justify-center mb-3 shadow-sm transition-colors duration-300">
                  <Icon
                    size={20}
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <p className="font-heading font-semibold text-dark group-hover:text-white text-xs leading-snug transition-colors duration-300">
                  {ind.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
