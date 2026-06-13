import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projects: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${site.url}/projects/${w.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
    images: [w.mainImage],
  }));

  return [...routes, ...projects];
}
