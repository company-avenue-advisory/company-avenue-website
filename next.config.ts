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
  async redirects() {
    return [
      // /resources is now a live Business Resources hub. Any legacy sub-paths
      // fall back to the hub itself.
      { source: "/resources/:slug", destination: "/resources", permanent: true },
    ];
  },
};

export default nextConfig;
