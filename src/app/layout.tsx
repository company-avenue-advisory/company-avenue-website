import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics, GtmNoScript } from "@/components/analytics/Analytics";
import { organizationSchema, SITE_URL } from "@/lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // NOTE: no site-wide `alternates.canonical` — a root canonical would be
  // inherited by every page that doesn't set its own, pointing them all at "/".
  // Each page sets its own canonical; unset pages self-canonicalize to their URL.
  title: {
    default: "Company Avenue Advisory Pvt. Ltd. | Business Registration & Compliance Experts",
    template: "%s | Company Avenue Advisory",
  },
  description:
    "India's trusted business compliance partner. Company registration, GST, Income Tax, Trademark, Accounting, Payroll, and Secretarial services for startups and SMEs.",
  keywords: [
    "company registration india",
    "GST registration",
    "income tax return",
    "trademark registration",
    "startup india",
    "MSME registration",
    "ROC filing",
    "business compliance",
    "accounting services",
    "IEC registration",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://companyavenueadvisory.com",
    siteName: "Company Avenue Advisory",
    title: "Company Avenue Advisory Pvt. Ltd. | Business Registration & Compliance Experts",
    description:
      "India's trusted business compliance partner for startups, MSMEs, and growing companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Avenue Advisory Pvt. Ltd.",
    description: "India's trusted business compliance partner.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: overflow-x-CLIP, not -hidden. Per the CSS overflow spec, setting
  // `overflow-x: hidden` makes a `visible` overflow-y compute to `auto`, which
  // turns <html>/<body> into a scroll container and silently breaks every
  // `position: sticky` on the site (the service-page sidebars scrolled away
  // instead of pinning). `clip` gives the same horizontal-overflow protection
  // while leaving overflow-y as `visible`. Verified in Chrome.
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} overflow-x-clip`}>
      <head>
        <JsonLd data={organizationSchema} />
        <Analytics />
        {/* Anti-FOUC: hide body until stylesheet is parsed */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { visibility: hidden; }
          body.ready { visibility: visible; }
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function ready() { document.body.classList.add('ready'); }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', ready);
            } else {
              ready();
            }
          })();
        `}} />
      </head>
      <body className="font-body bg-background text-dark antialiased overflow-x-clip w-full max-w-full">
        <GtmNoScript />
        <SmoothScroll>
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
