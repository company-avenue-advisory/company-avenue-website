"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

/* ─────────────────────────────────────────────────────────────────────────────
   WS-3.2 — site-wide conversion events.

   Four of the eight required events are inherently global: they fire on any
   tel: link, any wa.me link, a scroll depth, or the referrer of the landing
   session. This component owns those four so they cannot be missed:

     click_to_call            any tel: link            page_path, link_position
     whatsapp_click           any wa.me link           page_path, link_position
     service_page_scroll_75   75% scroll, /services/*  page_path
     social_referral_landing  session from social      source, campaign, landing_page

   The other four are fired where the success actually happens, because only
   that code knows it succeeded:
     contact_form_submit  → components/sections/ContactPage.tsx
     newsletter_signup    → components/forms/NewsletterForm.tsx
     calculator_complete  → components/calculators/CalcInteractionTracker.tsx
     verify_tool_use      → components/tools/*.tsx

   ── WHY DELEGATION RATHER THAN onClick HANDLERS ─────────────────────────────
   There are 136 tel: links and 50 wa.me links across this codebase, and every
   new service page adds more. Per-link onClick handlers guarantee that some
   page ships untracked, and they only work in React-rendered trees. One
   capture-phase listener on the document catches every one of them, including
   links inside markup this component has never heard of.

   Capture phase specifically: a bubbling listener can be beaten by a handler
   that calls stopPropagation, and the page may navigate away (tel: opens the
   dialer) before a bubbled event is seen.
───────────────────────────────────────────────────────────────────────────── */

/**
 * Where on the page the clicked link sits. GA4 needs this to answer "which
 * CTA actually earns calls" — the header number and the sticky mobile bar
 * perform very differently and are worth distinguishing.
 *
 * Resolution order, most explicit first:
 *   1. an ancestor's data-track-position (opt-in override)
 *   2. the sticky mobile CTA bar
 *   3. semantic landmarks — header/nav, footer
 *   4. the hero section on any page
 *   5. "body" for everything else
 */
function linkPosition(el: HTMLElement): string {
  const explicit = el.closest<HTMLElement>("[data-track-position]");
  if (explicit?.dataset.trackPosition) return explicit.dataset.trackPosition;

  if (el.closest("[data-sticky-cta]")) return "sticky";
  if (el.closest("header, nav")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("[data-hero], section:first-of-type")) return "hero";
  return "body";
}

/** Social referrers we care about, matched against the referring hostname. */
const SOCIAL_HOSTS: { match: RegExp; source: string }[] = [
  { match: /(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, source: "linkedin" },
  { match: /(^|\.)instagram\.com$/, source: "instagram" },
  { match: /(^|\.)facebook\.com$|(^|\.)fb\.com$|(^|\.)fb\.me$/, source: "facebook" },
  { match: /(^|\.)youtube\.com$|(^|\.)youtu\.be$/, source: "youtube" },
  { match: /(^|\.)t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, source: "x" },
  { match: /(^|\.)whatsapp\.com$/, source: "whatsapp" },
  { match: /(^|\.)t\.me$|(^|\.)telegram\.org$/, source: "telegram" },
];

function socialSourceFromReferrer(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return SOCIAL_HOSTS.find((s) => s.match.test(host))?.source ?? null;
  } catch {
    return null;
  }
}

export function EventTracking() {
  const pathname = usePathname() || "/";

  // ── click_to_call / whatsapp_click ────────────────────────────────────────
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      // getAttribute, not .href: the DOM property resolves tel:/mailto: and
      // would break the prefix test on some engines.
      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      const position = linkPosition(anchor as HTMLElement);
      const page_path = window.location.pathname;

      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", { page_path, link_position: position });
        return;
      }

      // Covers wa.me, api.whatsapp.com and web.whatsapp.com send links.
      if (/(^https?:\/\/)?(wa\.me|(api|web)\.whatsapp\.com)\//i.test(href)) {
        trackEvent("whatsapp_click", { page_path, link_position: position });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // ── service_page_scroll_75 ────────────────────────────────────────────────
  // Service pages are the commercial pages; 75% depth is the signal that the
  // visitor actually read one rather than bouncing off the hero. One event per
  // page view — the ref resets when `pathname` changes.
  const scrollFired = useRef(false);
  useEffect(() => {
    scrollFired.current = false;
    if (!pathname.startsWith("/services/")) return;

    function onScroll() {
      if (scrollFired.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Pages shorter than the viewport can never reach 75% of a scroll they
      // do not have; treat them as unmeasurable rather than instantly-read.
      if (scrollable <= 0) return;
      if ((window.scrollY / scrollable) * 100 >= 75) {
        scrollFired.current = true;
        trackEvent("service_page_scroll_75", { page_path: pathname });
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // ── social_referral_landing ───────────────────────────────────────────────
  // Once per session (sessionStorage), on the landing page only. UTM params
  // win over the referrer header, since a tagged link is a deliberate claim
  // about the campaign and referrers are increasingly stripped.
  useEffect(() => {
    const KEY = "caa_social_referral_fired";
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      // Private browsing can throw on sessionStorage. Fire once per page load
      // rather than not at all.
    }

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    const taggedSocial = utmMedium === "social" ? utmSource : null;
    const source = taggedSocial || socialSourceFromReferrer(document.referrer);
    if (!source) return;

    trackEvent("social_referral_landing", {
      source,
      campaign: utmCampaign ?? "(not set)",
      landing_page: window.location.pathname,
    });

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* nothing to do — see above */
    }
  }, []);

  return null;
}
