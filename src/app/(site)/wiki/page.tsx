import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/home2/FadeIn";
import { EntityCard } from "@/components/wiki/EntityCard";
import { WikiSearch } from "@/components/wiki/WikiSearch";
import { site } from "@/lib/site";
import {
  WIKI_TYPES,
  listEntities,
  searchIndex,
  breadcrumbJsonLd,
} from "@/lib/wiki";

const title = "Malaysia Esports Wiki";
const description =
  "KITAMEN's knowledge base on Malaysian esports — games, teams, players, tournaments and terminology, structured for quick answers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wiki" },
  openGraph: {
    type: "website",
    title: `${title} — KITAMEN`,
    description,
    url: "/wiki",
  },
};

export default async function WikiHome() {
  const sections = await Promise.all(
    WIKI_TYPES.map(async (type) => ({
      type,
      entities: await listEntities(type.key),
    })),
  );

  const index = await searchIndex();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Wiki", path: "/wiki" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1100px]">
          <FadeIn>
            <p className="text-h6sm text-accent">Knowledge Base</p>
            <h1 className="text-h1 mt-6 text-white">{title}</h1>
            <p className="text-body-lg mt-8 max-w-[640px] text-zinc-400">
              {description}
            </p>
            <div className="mt-10">
              <WikiSearch index={index} />
            </div>
          </FadeIn>

          {sections.map(({ type, entities }) => (
            <section key={type.key} className="mt-20">
              <FadeIn className="flex items-end justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-h3 text-white">{type.plural}</h2>
                  <p className="text-body-sm mt-2 text-zinc-500">
                    {type.blurb}
                  </p>
                </div>
                {entities.length ? (
                  <Link
                    href={`/wiki/${type.key}`}
                    className="text-h6sm shrink-0 text-zinc-500 transition-colors hover:text-accent"
                  >
                    All {type.plural} →
                  </Link>
                ) : null}
              </FadeIn>

              {entities.length ? (
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {entities.slice(0, 4).map(({ slug, meta }) => (
                    <EntityCard
                      key={slug}
                      type={type.key}
                      slug={slug}
                      meta={meta}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-body-sm mt-8 text-zinc-600">
                  No entries yet.
                </p>
              )}
            </section>
          ))}
        </div>
      </article>

      <CTASection />
    </>
  );
}
