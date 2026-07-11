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
