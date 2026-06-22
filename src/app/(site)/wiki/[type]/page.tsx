import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/home2/FadeIn";
import { EntityCard } from "@/components/wiki/EntityCard";
import { site } from "@/lib/site";
import {
  WIKI_TYPES,
  getWikiType,
  listEntities,
  breadcrumbJsonLd,
} from "@/lib/wiki";

export function generateStaticParams() {
  return WIKI_TYPES.map((t) => ({ type: t.key }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const config = getWikiType(type);
  if (!config) return { title: "Wiki" };

  const title = `Malaysia Esports ${config.plural}`;
  return {
    title,
    description: config.blurb,
    alternates: { canonical: `/wiki/${config.key}` },
    openGraph: {
      type: "website",
      title: `${title} — KITAMEN`,
      description: config.blurb,
      url: `/wiki/${config.key}`,
    },
  };
}

export default async function WikiTypeIndex({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getWikiType(type);
  if (!config) notFound();

  const entities = await listEntities(config.key);

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: "Wiki", path: "/wiki" },
      { name: config.plural, path: `/wiki/${config.key}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Malaysia Esports ${config.plural}`,
      description: config.blurb,
      url: `${site.url}/wiki/${config.key}`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1100px]">
          <FadeIn>
            <Link
              href="/wiki"
              className="text-h6sm text-zinc-500 transition-colors hover:text-accent"
            >
              ← Wiki
            </Link>
            <h1 className="text-h1 mt-8 text-white">{config.plural}</h1>
            <p className="text-body-lg mt-6 max-w-[640px] text-zinc-400">
              {config.blurb}
            </p>
          </FadeIn>

          {entities.length ? (
            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              {entities.map(({ slug, meta }) => (
                <EntityCard
                  key={slug}
                  type={config.key}
                  slug={slug}
                  meta={meta}
                />
              ))}
            </div>
          ) : (
            <p className="text-body mt-14 text-zinc-600">
              No entries yet — check back soon.
            </p>
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
}
