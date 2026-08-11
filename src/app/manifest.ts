import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.fullName,
    short_name: COMPANY.name,
    description:
      "India's trusted business compliance partner. Company registration, GST, Income Tax, Trademark, Accounting and Secretarial services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f2d52",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
