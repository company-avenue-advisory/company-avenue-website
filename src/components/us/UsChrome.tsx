import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import { FIRM_FOUNDED } from "@/lib/us-content";
import { UsThemeToggle } from "./UsThemeToggle";

/* ─────────────────────────────────────────────────────────────────────────────
   Header and footer for the US property.

   Deliberately NOT the India Navbar/Footer: those carry GST, ROC and MSME
   navigation that would disqualify the firm in front of a US CPA, and every
   one of those links 404s on the us. host anyway (middleware serves only /us
   there). Both are server components — the US page ships no navigation JS
   beyond the theme toggle.
───────────────────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "How it works", href: "#pod" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
];

/* The full firm name, set as a two-line lockup beside the crest — the same
   structure as the printed logo (COMPANY AVENUE / ADVISORY).

   The full logo PNG is not used directly: its wordmark is a gold 3D gradient
   that fights this page's flat Plus Jakarta typography, and it carries its own
   "business assurance & compliance advisors" tagline. Cropping the crest out
   and re-setting the name keeps the brand and the page in one voice. Set on
   one line, "Company Avenue Advisory" also costs ~190px, which does not fit
   beside the toggle and CTA on a 390px screen. */
function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <Image
        src="/images/caa-mark.png"
        alt=""
        width={160}
        height={227}
        priority={!lg}
        className={lg ? "h-11 w-auto" : "h-9 w-auto"}
      />
      {/* whitespace-nowrap is load-bearing: without it "Company Avenue" breaks
          to a third line at 360px, and a three-line wordmark beside a 36px
          crest looks broken rather than deliberate. */}
      <span
        className={
          "font-heading font-extrabold uppercase leading-[1.15] tracking-[0.01em] text-us-fg " +
          (lg ? "text-[0.85rem] sm:text-[0.92rem]" : "text-[0.72rem] sm:text-[0.8rem]")
        }
      >
        <span className="block whitespace-nowrap">Company Avenue</span>
        <span className="block whitespace-nowrap">Advisory</span>
      </span>
    </a>
  );
}

export function UsHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-us-line bg-us-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.875rem] text-us-muted transition-colors hover:text-us-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <UsThemeToggle />
          <a
            href="#call"
            className="rounded-full bg-us-lime px-4 py-2.5 font-heading text-[0.82rem] font-bold tracking-[-0.01em] text-us-ink transition-transform hover:scale-[1.03] sm:px-5"
          >
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}

export function UsFooter() {
  return (
    <footer className="border-t border-us-line bg-us-alt pb-12 pt-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Wordmark size="lg" />
            <p className="mt-5 text-[0.875rem] leading-relaxed text-us-muted">
              Dedicated offshore accounting pods for US firms and businesses.
              Established {FIRM_FOUNDED}.
            </p>
          </div>

          <div className="flex gap-14 text-[0.875rem]">
            <div>
              <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.16em] text-us-muted/70">
                Page
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-us-muted transition-colors hover:text-us-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.16em] text-us-muted/70">
                Talk to us
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-us-muted transition-colors hover:text-us-fg"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <a href="#call" className="text-us-muted transition-colors hover:text-us-fg">
                    Book a discovery call
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-us-line pt-7 text-[0.75rem] leading-relaxed text-us-muted/75">
          <p className="max-w-3xl">
            Every engagement runs under a signed NDA and an IRS §7216 consent workflow.
            We prepare to review-ready state; your licensed professional reviews, signs
            and files. We are not a CPA firm and do not provide attest services or US
            tax advice.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} {COMPANY.fullName} · Delivery operations, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
