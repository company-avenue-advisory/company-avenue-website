import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    // AVIF first (~30% smaller than WebP on photos); WebP is the fallback for
    // the handful of clients that still lack AVIF.
    formats: ["image/avif", "image/webp"],
    // Optimised derivatives are immutable — cache them for a year instead of
    // Next's 60-second default, which made repeat visitors re-fetch every image.
    minimumCacheTTL: 31536000,
  },
  // Strips the "X-Powered-By: Next.js" fingerprint from every response.
  poweredByHeader: false,
  // Emits a trailing-slash-free canonical URL shape consistently.
  trailingSlash: false,
  // WS-2: hands trailing-slash normalisation to middleware.
  //
  // Next's built-in normalisation runs before both redirects() and middleware,
  // so a legacy URL like /books-keeping-outsourcing/ was 308'd to the
  // slash-free form and only then 301'd onward — a two-hop chain on every
  // legacy URL, which WS-2.4 fails. With this flag, middleware sees the
  // original path and answers in one hop.
  //
  // Consequence: middleware is now responsible for normalising trailing
  // slashes site-wide. That logic lives at the top of src/middleware.ts and
  // must not be removed, or /about/ and /about would both serve 200 as
  // duplicate content.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // /resources is now a live Business Resources hub. Any legacy sub-paths
      // fall back to the hub itself.
      { source: "/resources/:slug", destination: "/resources", permanent: true },
    ];
  },
};

export default nextConfig;
