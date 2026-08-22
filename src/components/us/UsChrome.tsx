import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import { FIRM_FOUNDED } from "@/lib/us-content";
import { UsThemeToggle } from "./UsThemeToggle";

/* ─────────────────────────────────────────────────────────────────────────────
   Header and footer for the US property.

   Deliberately NOT the India Navbar/Footer: those carry GST, ROC and MSME
   navigation that would disqualify the firm in front of a US CPA, and every
   one of those links 404s on the us. host anyway (middleware serves only /us
   there). Both are server components — the US page ships no navigation JS.

   The header stays ink-on-dark down the whole page rather than inverting over
   the light sections. A landing page with one destination does not need a
   colour-changing nav; it needs the CTA to stay findable.
───────────────────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "How it works", href: "#pod" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
];

function Wordmark() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      {/* The real CAA crest, cropped out of /images/new_logo_dark.png (the full
          lockup carries its own wordmark and tagline, which would collide with
          the one beside it). Decorative: the wordmark next to it is the
          accessible name, so alt is intentionally empty. */}
      <Image
        src="/images/caa-mark.png"
        alt=""
        width={160}
        height={227}
        priority
        className="h-9 w-auto"
      />
      <span className="font-heading text-[0.95rem] font-bold tracking-[-0.02em] text-white">
        Avenue Advisory
      </span>
      <span className="hidden rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-us-chalk sm:inline">
        US
      </span>
    </a>
  );
}

export function UsHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-us-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.875rem] text-us-chalk transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <UsThemeToggle />
          <a
            href="#call"
            className="rounded-full bg-us-lime px-4 py-2 font-heading text-[0.82rem] font-bold tracking-[-0.01em] text-us-ink transition-colors hover:bg-white sm:px-5"
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
    <footer className="bg-us-ink pb-12 pt-16 text-us-chalk">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-[0.875rem] leading-relaxed">
              Dedicated offshore accounting pods for US firms and businesses.
              Established {FIRM_FOUNDED}.
            </p>
          </div>

          <div className="flex gap-14 text-[0.875rem]">
            <div>
              <p className="font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                Page
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                Talk to us
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <a href="#call" className="transition-colors hover:text-white">
                    Book a discovery call
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.07] pt-7 text-[0.75rem] leading-relaxed text-white/35">
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
