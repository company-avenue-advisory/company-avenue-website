"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

type NavGroup = { group: string; items: { label: string; href: string }[] };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-white border-b border-slate-100"
        )}
      >
        <nav className="container-custom flex items-center justify-between h-[72px]" ref={navRef}>
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => setActiveDropdown(null)}>
            <div className="relative h-14 w-52">
              <Image
                src="/images/logo.webp"
                alt={COMPANY.fullName}
                fill
                className="object-contain object-left"
                priority
                sizes="208px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
                    aria-expanded={activeDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "text-slate-400 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                        className={cn(
                          "absolute top-full mt-1 bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.13)] border border-slate-100 overflow-hidden",
                          item.label === "Services"
                            ? "left-1/2 -translate-x-1/2 w-[860px]"
                            : "left-0 w-[280px]"
                        )}
                      >
                        {item.label === "Services" ? (
                          <ServicesMegaMenu
                            groups={item.children as NavGroup[]}
                            onClose={() => setActiveDropdown(null)}
                          />
                        ) : (
                          <SimpleDropdown
                            groups={item.children as NavGroup[]}
                            onClose={() => setActiveDropdown(null)}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
            >
              <Phone size={14} />
              Call Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-slate-100 shrink-0">
              <div className="relative h-12 w-44">
                <Image
                  src="/images/logo.webp"
                  alt={COMPANY.fullName}
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </div>
              <button
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <nav className="space-y-1">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors text-left"
                        >
                          {item.label}
                          <ChevronDown
                            size={15}
                            className={cn("text-slate-400 transition-transform", mobileExpanded === item.label ? "rotate-180" : "")}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-4">
                                {(item.children as NavGroup[]).map((group) => (
                                  <div key={group.group}>
                                    <p className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest px-2 mb-1.5">{group.group}</p>
                                    <div className="space-y-0.5">
                                      {group.items.map((child) => (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors"
                                        >
                                          <ArrowRight size={10} className="text-accent shrink-0" />
                                          {child.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-3.5 rounded-xl text-slate-700 font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-6 space-y-3 pb-6">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-heading font-semibold rounded-xl text-sm"
                >
                  Book Consultation
                </Link>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 text-slate-700 font-heading font-medium rounded-xl text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <Phone size={15} />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Services Mega-Menu ─── */
function ServicesMegaMenu({ groups, onClose }: { groups: NavGroup[]; onClose: () => void }) {
  const [hoveredGroup, setHoveredGroup] = useState<string>(groups[0]?.group ?? "");

  const activeGroup = groups.find((g) => g.group === hoveredGroup) ?? groups[0];

  return (
    <div className="flex" style={{ minHeight: 360 }}>
      {/* Left column — group tabs */}
      <div className="w-52 shrink-0 bg-slate-50 border-r border-slate-100 py-3 px-2">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest px-3 mb-2">All Services</p>
        {groups.map((group) => (
          <button
            key={group.group}
            onMouseEnter={() => setHoveredGroup(group.group)}
            onClick={() => setHoveredGroup(group.group)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-xl text-sm font-heading font-medium transition-all flex items-center justify-between group",
              hoveredGroup === group.group
                ? "bg-primary text-white"
                : "text-slate-600 hover:bg-primary/8 hover:text-primary"
            )}
          >
            {group.group}
            <ArrowRight
              size={12}
              className={cn(
                "transition-opacity shrink-0",
                hoveredGroup === group.group ? "opacity-100" : "opacity-0 group-hover:opacity-60"
              )}
            />
          </button>
        ))}

        <div className="mt-3 pt-3 border-t border-slate-200 px-2">
          <Link
            href="/services"
            onClick={onClose}
            className="flex items-center justify-between w-full text-xs font-heading font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            View all services <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* Right panel — items grid */}
      <div className="flex-1 p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup?.group}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.12 }}
          >
            <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3">
              {activeGroup?.group}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {activeGroup?.items.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-all group"
                >
                  <ArrowRight
                    size={10}
                    className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom popular CTA */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
          <div className="flex-1 bg-primary/5 rounded-xl px-4 py-3">
            <p className="text-xs font-heading font-semibold text-dark">Need help choosing?</p>
            <p className="text-[11px] text-muted mt-0.5">Book a free consultation with our experts</p>
          </div>
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors whitespace-nowrap"
          >
            Book Now <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Simple Dropdown (Industries etc) ─── */
function SimpleDropdown({ groups, onClose }: { groups: NavGroup[]; onClose: () => void }) {
  return (
    <div className="p-3">
      {groups.map((group) => (
        <div key={group.group}>
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest px-3 mb-1.5 mt-1">
            {group.group}
          </p>
          {group.items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-all group"
            >
              <ArrowRight size={10} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              {child.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
