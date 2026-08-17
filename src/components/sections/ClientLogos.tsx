"use client";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/clients";

/* ─────────────────────────────────────────────────────────────────────────────
   Client logo slider — replaces the old TrustBar.

   What it replaced: a marquee of grey pills reading "Startup India",
   "MSME / Udyam", "MCA", "GST Network", "Digital India", "IEC / DGFT", "ROC",
   "Google Reviews" under the heading "Trusted by Startups, MSMEs & Growing
   Businesses Across India". Those are registries and portals the firm files
   WITH, not organisations that vouch for it, so a visitor reading them as trust
   signals was reading something the section could not support. Real client
   marks say more and claim less.

   ── HOW THE LOOP WORKS ────────────────────────────────────────────────────
   The `animate-marquee` keyframe (tailwind.config.ts) translates the track from
   0 to -50%. That is only seamless if the track is EXACTLY two identical
   halves: at -50% the second half sits precisely where the first began, so the
   jump back to 0 is invisible. Hence `[...CLIENT_LOGOS, ...CLIENT_LOGOS]` and
   nothing else — a third copy, or an odd item, makes it visibly stutter.

   The duplicate half carries `aria-hidden`, so a screen reader hears each
   company once instead of all sixteen twice.

   ── VERTICAL CENTRING ─────────────────────────────────────────────────────
   These 16 marks have wildly different aspect ratios — from a 400x41 wordmark
   to a 124x122 badge. Each sits in a fixed-height flex cell with
   `object-contain`, so it is centred on both axes and scaled to fit rather than
   cropped or stretched. Wide wordmarks reach the width cap, square badges reach
   the height cap; that is what makes a mixed set look optically even instead of
   letting the square ones tower over the wordmarks.

   ── REDUCED MOTION ────────────────────────────────────────────────────────
   Simply stopping the animation would freeze the track at translateX(0) with
   `overflow-hidden` cutting off everything past the viewport — a visitor who
   asked for less motion would see five logos and never know there were
   sixteen. So under `prefers-reduced-motion` the track becomes a centred,
   wrapped grid: no movement, all sixteen visible, and the duplicate half is
   dropped from the DOM rather than shown twice.
───────────────────────────────────────────────────────────────────────────── */

/**
 * Optical balance across wildly different aspect ratios.
 *
 * A single `max-w` + `max-h` pair does not work for this set. Tata Cleantech is
 * a 9.8:1 lockup, so a 200px-wide cell renders it ~20px tall, while a squarish
 * mark like Acuité or Cargo Service Center fills the full 64px — the most
 * recognised name on the wall came out three times weaker than its neighbours.
 *
 * You cannot fully equalise a 9.8:1 mark without making it absurdly wide, so
 * this narrows the gap from both ends: ultra-wide lockups get a roomier cell,
 * and squarish marks get a lower height cap. Range tightens from ~3:1 to ~2:1,
 * which reads as even.
 */
function metrics(logo: ClientLogo) {
  const aspect = logo.width / logo.height;
  if (aspect >= 6) {
    // Ultra-wide wordmark (Tata, OneStack). Widest cell we can justify.
    return { cell: "w-[210px] sm:w-[248px]", cap: "max-h-10" };
  }
  if (aspect >= 3) {
    // Wide wordmark (Häfele, Fortum, factoHR, LifeSquare).
    return { cell: "w-[184px] sm:w-[216px]", cap: "max-h-12" };
  }
  // Squarish badge (ACFI, SMERA, AG, Hans Infomatic, Esscube, Vertex).
  return { cell: "w-[152px] sm:w-[176px]", cap: "max-h-[52px]" };
}

function LogoCell({ logo, duplicate }: { logo: ClientLogo; duplicate?: boolean }) {
  const { cell, cap } = metrics(logo);
  return (
    <li
      // Fixed height + centred content is the vertical-centring guarantee.
      // `motion-reduce:hidden` removes the duplicate half from the wrapped grid.
      className={`mx-5 flex h-20 shrink-0 items-center justify-center sm:mx-7 ${cell} ${
        duplicate ? "motion-reduce:hidden" : ""
      }`}
      {...(duplicate ? { "aria-hidden": true } : {})}
    >
      <Image
        src={`/images/clients/${logo.slug}.png`}
        alt={duplicate ? "" : logo.name}
        width={logo.width}
        height={logo.height}
        // Sized for the largest cell at 2x DPR. Decorative-scale assets, so a
        // full responsive srcset would be wasted bytes.
        sizes="248px"
        className={`w-auto max-w-full object-contain ${cap} ${
          // Light-on-dark lockup: keep its panel, but round it so it reads as an
          // intentional chip rather than a stray black box.
          logo.dark ? "rounded-md" : ""
        }`}
      />
    </li>
  );
}

export function ClientLogos() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="border-y border-slate-100 bg-white py-14 md:py-24">
      <div className="container-custom">
        {/* Uses the shared SectionHeader so the eyebrow rules, `heading-lg`
            title and subtitle size match every other section on the page —
            this block was previously hand-rolled at a smaller scale and read
            as a sub-section rather than a peer of "Our Services". */}
        <SectionHeader
          eyebrow="Clients"
          title="Organisations We've Worked With"
          /* Kept deliberately non-specific about individual companies. An
             earlier draft said "listed financial institutions", which is not
             accurate for this set — Tata Cleantech Capital is an unlisted NBFC.
             Naming sectors is checkable; characterising the companies is not. */
          subtitle="A selection of the organisations we have worked with — across financial services, manufacturing, logistics, technology and pharmaceuticals."
          className="mb-10 md:mb-14"
        />
      </div>

      {/* Full-bleed track: the marquee runs edge to edge, so it deliberately
          sits outside container-custom. */}
      <div className="group relative overflow-hidden">
        <ul
          className="animate-marquee flex w-max items-center
                     group-hover:[animation-play-state:paused]
                     motion-reduce:w-full motion-reduce:flex-wrap
                     motion-reduce:justify-center motion-reduce:gap-y-4
                     motion-reduce:animate-none"
        >
          {track.map((logo, i) => (
            <LogoCell
              key={`${logo.slug}-${i}`}
              logo={logo}
              duplicate={i >= CLIENT_LOGOS.length}
            />
          ))}
        </ul>

        {/* Edge fades, so logos dissolve instead of being chopped mid-mark.
            Hidden under reduced motion, where the grid has no moving edges. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent motion-reduce:hidden sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent motion-reduce:hidden sm:w-28" />
      </div>
    </section>
  );
}
