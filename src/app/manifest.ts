import type { MetadataRoute } from "next";
import { personalInfo, siteConfig } from "@/config/personal";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: personalInfo.name,
    short_name: "Raditya",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
