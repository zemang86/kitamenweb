import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { WIKI_TYPES, allEntityParams } from "@/lib/wiki";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Wiki: landing + per-type index + every published entity.
  const wikiLanding: MetadataRoute.Sitemap = [
    { url: `${site.url}/wiki`, changeFrequency: "weekly", priority: 0.8 },
  ];
  const wikiTypes: MetadataRoute.Sitemap = WIKI_TYPES.map((t) => ({
    url: `${site.url}/wiki/${t.key}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const wikiEntities: MetadataRoute.Sitemap = (await allEntityParams()).map(
    ({ type, slug }) => ({
      url: `${site.url}/wiki/${type}/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    ...routes,
    ...projects,
    ...wikiLanding,
    ...wikiTypes,
    ...wikiEntities,
  ];
}
