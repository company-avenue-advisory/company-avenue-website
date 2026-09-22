// Central GA4 / GTM helpers. Reads container ID from env at build time.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a GA4 event through the dataLayer (works with GTM and gtag.js).
 * Named events from Section J: generate_lead, calculator_lead,
 * lead_magnet_download, whatsapp_click, call_click, consultation_booked, etc.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/**
 * Track an event, THEN navigate — for a conversion that is immediately
 * followed by leaving the domain (e.g. the /lp/* quote forms handing off to
 * wa.me). A bare `trackEvent(); location.href = …` races the tag against the
 * navigation: GTM fires tags asynchronously, and a same-tick redirect can cut
 * the Google Ads conversion pixel off before it sends, especially on mobile.
 *
 * eventCallback/eventTimeout is GTM's own documented pattern for this exact
 * case — every tag bound to the trigger calls back when done, and the
 * eventTimeout is a hard ceiling so one blocked/slow tag (or an ad blocker
 * eating it entirely) can never strand the visitor on the page.
 */
export function trackEventAndRedirect(name: string, params: EventParams, url: string): void {
  if (typeof window === "undefined") return;
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params, eventCallback: go, eventTimeout: 1000 });
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  setTimeout(go, 1000);
}
