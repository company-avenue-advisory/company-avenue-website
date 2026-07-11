"use client";

import { usePathname } from "next/navigation";
import { waLink, PHONE_E164 } from "@/lib/seo";
import { trackEvent } from "@/lib/gtag";

// Per-page prefilled WhatsApp message (Section H).
function prefilledMessage(pathname: string): string {
  if (pathname.startsWith("/services/gst")) return "Hi, I want to know about GST registration.";
  if (pathname.startsWith("/services/private-limited-company"))
    return "Hi, I want to register a Private Limited company.";
  if (pathname.startsWith("/services/trademark"))
    return "Hi, I want to register a trademark.";
  if (pathname.startsWith("/services/"))
    return "Hi, I need help with a compliance service.";
  return "Hi, I need help with company registration / compliance.";
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.18 2.18z" />
  </svg>
);

export function FloatingCTA() {
  const pathname = usePathname() || "/";
  if (pathname.startsWith("/admin")) return null;

  const wa = waLink(prefilledMessage(pathname));

  return (
    <>
      {/* NOTE: the round floating WhatsApp button lives in the AvenueAI widget
          (bottom-right, directly below the chatbot). We only render the mobile
          sticky Call/WhatsApp bar here (Section G4). */}

      {/* Mobile sticky CTA bar — Call Now + WhatsApp, all pages */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-black/10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] md:hidden">
        <a
          href={`tel:${PHONE_E164}`}
          onClick={() => trackEvent("call_click", { page_path: pathname })}
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-dark"
        >
          <PhoneIcon className="h-5 w-5 text-primary" />
          Call Now
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { page_path: pathname })}
          className="flex items-center justify-center gap-2 bg-[#25D366] py-3 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
