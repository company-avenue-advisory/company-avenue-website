"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, ArrowRight, Phone, MessageCircle, Mail,
  Clock, CalendarCheck, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

type NavGroup = { group: string; items: { label: string; href: string }[] };

interface PopularCard {
  badge: string; title: string; desc: string; href: string; cta: string;
}

const POPULAR_CARDS: Record<string, PopularCard> = {
  "Start Business": {
    badge: "Popular Choice",
    title: "Private Limited Company",
    desc: "India's most trusted business structure. Get complete incorporation with CA/CS support from Day 1.",
    href: "/services/private-limited-company",
    cta: "Register Now",
  },
  "IPR & Registrations": {
    badge: "Popular Choice",
    title: "Trademark Registration",
    desc: "Protect your brand under the Trade Marks Act, 1999. Expert filing, objection & renewal support.",
    href: "/services/trademark-registration",
    cta: "Register Trademark",
  },
  "Tax & Payroll": {
    badge: "Popular Choice",
    title: "Virtual CFO Service",
    desc: "Outsourced accounting, GST & TDS compliance, financial reporting — full CFO support for SMEs.",
    href: "/services/virtual-cfo",
    cta: "Learn More",
  },
  "Compliance": {
    badge: "Popular Choice",
    title: "Company Annual Return",
    desc: "File MGT-7 & AOC-4 under Companies Act, 2013. Avoid penalties with expert CA/CS filing.",
    href: "/services/roc-compliance",
    cta: "File Now",
  },
};

const MEGA_LABELS = ["Start Business", "IPR & Registrations", "Tax & Payroll", "Compliance", "Tools"];

const MEGA_VIEW_ALL: Record<string, { label: string; href: string }> = {
  Tools: { label: "All Tools", href: "/calculators" },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Store trigger button positions so mega menu can align to them
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [dropdownLeft, setDropdownLeft] = useState(0);

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

  const open = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Compute dropdown position relative to nav container
    const btn = triggerRefs.current[label];
    const nav = navRef.current;
    if (btn && nav) {
      const btnRect = btn.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const dropdownWidth = MEGA_LABELS.includes(label) ? 840 : 280;
      // Ideal: center dropdown under trigger (for mega) or left-align (for simple)
      const idealLeft = MEGA_LABELS.includes(label)
        ? (btnRect.left - navRect.left) + btnRect.width / 2 - dropdownWidth / 2
        : btnRect.left - navRect.left;
      // Clamp: don't overflow viewport
      const maxLeft = window.innerWidth - navRect.left - dropdownWidth - 8;
      const clampedLeft = Math.max(0, Math.min(idealLeft, maxLeft));
      setDropdownLeft(clampedLeft);
    }
    setActiveDropdown(label);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const navItems = NAV_LINKS.filter((item) => (item as { variant?: string }).variant !== "gethelp");
  const getHelpItem = NAV_LINKS.find((item) => (item as { variant?: string }).variant === "gethelp");
  const activeMegaItem = navItems.find(
    (item) => item.label === activeDropdown && MEGA_LABELS.includes(item.label)
  );
  const activeSimpleItem = navItems.find(
    (item) => item.label === activeDropdown && !MEGA_LABELS.includes(item.label) && !!item.children
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-primary-900/95 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-white border-b border-slate-100"
        )}
      >
        <nav className="container-custom flex items-center justify-between h-[72px] relative" ref={navRef}>
          {/* Logo — light on white bar, dark variant once the bar turns navy */}
          <Link href="/" className="shrink-0" onClick={() => setActiveDropdown(null)}>
            <div className="relative h-14 w-56">
              <Image src="/images/new_logo.png" alt={COMPANY.fullName} fill priority sizes="224px"
                className={cn("object-contain object-left transition-opacity duration-300",
                  scrolled ? "opacity-0" : "opacity-100")} />
              <Image src="/images/new_logo_dark.png" alt={COMPANY.fullName} fill sizes="224px"
                className={cn("object-contain object-left transition-opacity duration-300",
                  scrolled ? "opacity-100" : "opacity-0")} />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => (
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => open(item.label)}
                  onMouseLeave={close}
                >
                  <button
                    ref={(el) => { triggerRefs.current[item.label] = el; }}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={cn(
                      "inline-flex items-center gap-1 px-3.5 py-2 text-sm font-heading font-medium rounded-lg transition-all",
                      activeDropdown === item.label
                        ? (scrolled ? "text-white bg-white/10" : "text-primary bg-primary/5")
                        : (scrolled
                            ? "text-white/85 hover:text-white hover:bg-white/10"
                            : "text-slate-600 hover:text-primary hover:bg-slate-50")
                    )}
                  >
                    {item.label}
                    <ChevronDown size={13} className={cn(
                      "transition-transform duration-200",
                      scrolled ? "text-white/60" : "text-slate-400",
                      activeDropdown === item.label ? cn("rotate-180", scrolled ? "text-white" : "text-primary") : ""
                    )} />
                  </button>

                  {/* Simple dropdown rendered at nav level — see overlay below */}
                </div>
              ) : (
                <Link key={item.label} href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-heading font-medium rounded-lg transition-all",
                    scrolled
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  )}>
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Get Help button */}
          <div className="hidden lg:flex items-center">
            {getHelpItem && (
              <div
                className="relative"
                onMouseEnter={() => open("Get Help")}
                onMouseLeave={close}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "Get Help" ? null : "Get Help")}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading font-semibold rounded-xl transition-colors shadow-sm",
                    scrolled
                      ? "bg-accent text-primary-900 hover:bg-accent-light"
                      : "bg-primary text-white hover:bg-primary-800"
                  )}
                >
                  Get Help
                  <ChevronDown size={13} className={cn("transition-transform duration-200", activeDropdown === "Get Help" ? "rotate-180" : "")} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "Get Help" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.14 }}
                      onMouseEnter={() => open("Get Help")}
                      onMouseLeave={close}
                      className="absolute right-0 top-full mt-1 w-[300px] bg-white rounded-2xl shadow-[0_8px_56px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden z-50"
                    >
                      <GetHelpDropdown onClose={() => setActiveDropdown(null)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* ── Mega menu: single overlay anchored to nav container ── */}
          <AnimatePresence>
            {activeMegaItem && (
              <motion.div
                key={activeMegaItem.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.14 }}
                onMouseEnter={() => open(activeMegaItem.label)}
                onMouseLeave={close}
                className="absolute top-full mt-1 w-[840px] bg-white rounded-2xl shadow-[0_8px_56px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden z-50"
                style={{ left: dropdownLeft }}
              >
                <MegaMenuDropdown
                  label={activeMegaItem.label}
                  groups={activeMegaItem.children as NavGroup[]}
                  popular={POPULAR_CARDS[activeMegaItem.label]}
                  viewAll={MEGA_VIEW_ALL[activeMegaItem.label]}
                  onClose={() => setActiveDropdown(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Simple dropdown (Tools): same overlay approach ── */}
          <AnimatePresence>
            {activeSimpleItem && (
              <motion.div
                key={activeSimpleItem.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.14 }}
                onMouseEnter={() => open(activeSimpleItem.label)}
                onMouseLeave={close}
                className="absolute top-full mt-1 w-[280px] bg-white rounded-2xl shadow-[0_8px_56px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden z-50"
                style={{ left: dropdownLeft }}
              >
                <SimpleDropdown
                  groups={activeSimpleItem.children as NavGroup[]}
                  showViewAll={
                    activeSimpleItem.label === "Tools"
                      ? { label: "View all tools", href: "/calculators" }
                      : undefined
                  }
                  onClose={() => setActiveDropdown(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile menu */}
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
              <div className="relative h-12 w-48">
                <Image src="/images/new_logo.png" alt={COMPANY.fullName} fill
                  className="object-contain object-left" sizes="192px" />
              </div>
              <button className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <nav className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors text-left"
                        >
                          {item.label}
                          <ChevronDown size={15} className={cn("text-slate-400 transition-transform", mobileExpanded === item.label ? "rotate-180" : "")} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-4">
                                {(item.children as NavGroup[]).map((group) => (
                                  <div key={group.group}>
                                    <p className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest px-2 mb-1.5">
                                      {group.group}
                                    </p>
                                    <div className="space-y-0.5">
                                      {group.items.map((child) => (
                                        <Link key={child.href} href={child.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors">
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
                      <Link href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-3.5 rounded-xl text-slate-700 font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-6 space-y-2 pb-8">
                <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest px-1 mb-3">
                  Contact Us
                </p>
                <a href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-primary/5 rounded-xl text-sm font-heading font-medium text-primary hover:bg-primary/10 transition-colors">
                  <Phone size={15} /> {COMPANY.phone}
                </a>
                <a href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-green-50 rounded-xl text-sm font-heading font-medium text-green-700 hover:bg-green-100 transition-colors">
                  <MessageCircle size={15} className="text-green-600" /> WhatsApp Us
                </a>
                <Link href="/contact" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-heading font-semibold rounded-xl text-sm">
                  <CalendarCheck size={15} /> Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Mega Menu ─── */
function MegaMenuDropdown({ label, groups, popular, viewAll, onClose }: {
  label: string; groups: NavGroup[]; popular?: PopularCard;
  viewAll?: { label: string; href: string }; onClose: () => void;
}) {
  const [activeGroup, setActiveGroup] = useState(groups[0]?.group ?? "");
  const current = groups.find((g) => g.group === activeGroup) ?? groups[0];
  const viewAllLink = viewAll ?? { label: "All Services", href: "/services" };

  return (
    <div className="flex" style={{ minHeight: 340 }}>
      {/* Left: group tabs */}
      <div className="w-48 shrink-0 bg-slate-50 border-r border-slate-100 py-3 px-2">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest px-3 mb-2">
          {label}
        </p>
        {groups.map((g) => (
          <button key={g.group}
            onMouseEnter={() => setActiveGroup(g.group)}
            onClick={() => setActiveGroup(g.group)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-xl text-sm font-heading font-medium transition-all flex items-center justify-between group",
              activeGroup === g.group ? "bg-primary text-white" : "text-slate-600 hover:bg-primary/8 hover:text-primary"
            )}
          >
            <span className="leading-snug">{g.group}</span>
            <ArrowRight size={11} className={cn("shrink-0 transition-opacity", activeGroup === g.group ? "opacity-100" : "opacity-0 group-hover:opacity-50")} />
          </button>
        ))}
        <div className="mt-3 pt-3 border-t border-slate-200 px-2">
          <Link href={viewAllLink.href} onClick={onClose}
            className="flex items-center justify-between w-full text-xs font-heading font-semibold text-accent hover:text-accent-dark transition-colors">
            {viewAllLink.label} <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* Center: items */}
      <div className="flex-1 p-5 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={activeGroup}
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.1 }}
          >
            <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3">
              {activeGroup}
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              {current?.items.map((child) => (
                <Link key={child.href} href={child.href} onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-slate-600 hover:text-primary hover:bg-primary/5 transition-all group">
                  <ArrowRight size={10} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
          <div className="flex-1 bg-primary/5 rounded-xl px-4 py-2.5">
            <p className="text-xs font-heading font-semibold text-dark">Not sure which service?</p>
            <p className="text-[11px] text-muted mt-0.5">Book a free 30-min expert consultation</p>
          </div>
          <Link href="/contact" onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors whitespace-nowrap">
            Book Now <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* Right: Popular card */}
      {popular && (
        <div className="w-[200px] shrink-0 border-l border-slate-100 bg-slate-50/60 p-4 flex flex-col">
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={10} className="text-accent fill-accent" />
            <span className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest">{popular.badge}</span>
          </div>
          <h4 className="font-heading font-bold text-dark text-sm leading-snug mb-2">{popular.title}</h4>
          <p className="text-[11px] text-muted leading-relaxed flex-1">{popular.desc}</p>
          <Link href={popular.href} onClick={onClose}
            className="mt-4 inline-flex items-center justify-between w-full px-3 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors">
            {popular.cta} <ArrowRight size={11} />
          </Link>
          <div className="mt-2">
            <Link href="/contact" onClick={onClose}
              className="inline-flex items-center justify-center w-full px-3 py-2 border border-slate-200 text-slate-600 text-xs font-heading font-medium rounded-xl hover:border-primary hover:text-primary transition-colors">
              Need Guidance?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Simple Dropdown (Tools) ─── */
function SimpleDropdown({ groups, showViewAll, onClose }: {
  groups: NavGroup[]; showViewAll?: { label: string; href: string }; onClose: () => void;
}) {
  return (
    <div className="p-3">
      {groups.map((group) => (
        <div key={group.group}>
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest px-3 mb-1.5 mt-1">
            {group.group}
          </p>
          {group.items.map((child) => (
            <Link key={child.href} href={child.href} onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-all group">
              <ArrowRight size={10} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              {child.label}
            </Link>
          ))}
        </div>
      ))}
      {showViewAll && (
        <div className="mt-2 pt-2 border-t border-slate-100 px-3">
          <Link href={showViewAll.href} onClick={onClose}
            className="flex items-center justify-between w-full text-xs font-heading font-semibold text-accent hover:text-accent-dark transition-colors py-1">
            {showViewAll.label} <ArrowRight size={11} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Get Help Dropdown ─── */
function GetHelpDropdown({ onClose }: { onClose: () => void }) {
  const options = [
    { icon: Phone, label: "Call Us", sub: COMPANY.phone, href: `tel:${COMPANY.phone}`, iconBg: "bg-primary/8", iconColor: "text-primary" },
    { icon: MessageCircle, label: "WhatsApp", sub: COMPANY.whatsapp, href: `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`, iconBg: "bg-green-50", iconColor: "text-green-600", external: true },
    { icon: Mail, label: "Email Us", sub: COMPANY.email, href: `mailto:${COMPANY.email}`, iconBg: "bg-accent/8", iconColor: "text-accent" },
  ];
  return (
    <div className="p-4 space-y-1.5">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <a key={opt.label} href={opt.href}
            target={(opt as { external?: boolean }).external ? "_blank" : undefined}
            rel={(opt as { external?: boolean }).external ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconBg}`}>
              <Icon size={17} className={opt.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading font-semibold text-dark group-hover:text-primary transition-colors">{opt.label}</p>
              <p className="text-xs text-muted truncate">{opt.sub}</p>
            </div>
            <ArrowRight size={12} className="text-slate-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </a>
        );
      })}
      <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-muted border-t border-slate-100 pt-3 mt-1">
        <Clock size={11} className="text-slate-400 shrink-0" />
        <span>{COMPANY.workingHours}</span>
      </div>
      <Link href="/contact" onClick={onClose}
        className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-800 text-white text-sm font-heading font-semibold rounded-xl transition-colors mt-1">
        <CalendarCheck size={14} /> Book Free Consultation
      </Link>
    </div>
  );
}
