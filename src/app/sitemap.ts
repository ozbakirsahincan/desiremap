import type { MetadataRoute } from "next";

const siteUrl = "https://desiremap.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      images: [`${siteUrl}/hero-bg.jpg`],
    },
  ];
}
