import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // /resources is now a live Business Resources hub. Any legacy sub-paths
      // fall back to the hub itself.
      { source: "/resources/:slug", destination: "/resources", permanent: true },
    ];
  },
};

export default nextConfig;
