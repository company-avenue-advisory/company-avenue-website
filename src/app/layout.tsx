import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AvenueAILoader } from "@/components/AvenueAILoader";

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
    url: "https://companyavenue.in",
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
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
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
      <body className="font-body bg-background text-dark antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AvenueAILoader />
        </SmoothScroll>
      </body>
    </html>
  );
}
