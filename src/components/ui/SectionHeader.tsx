"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-3 md:mb-4">
          <span className="w-6 h-px bg-accent" />
          {eyebrow}
          <span className="w-6 h-px bg-accent" />
        </span>
      )}
      <h2
        className={cn(
          "heading-lg text-dark mb-3 md:mb-4 text-balance",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-sm md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
