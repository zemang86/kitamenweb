import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { Infobox } from "@/components/wiki/Infobox";
import {
  getWikiType,
  loadEntity,
  allEntityParams,
  entityJsonLd,
  breadcrumbJsonLd,
  type WikiTypeKey,
} from "@/lib/wiki";

export async function generateStaticParams() {
  return allEntityParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  const config = getWikiType(type);
  if (!config) return { title: "Wiki" };
  const mod = await loadEntity(config.key, slug);
  if (!mod) return { title: "Wiki" };

  const { meta } = mod;
  const url = `/wiki/${config.key}/${slug}`;
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${meta.title} — KITAMEN Wiki`,
      description: meta.summary,
      url,
      images: meta.hero ? [{ url: meta.hero, alt: meta.title }] : undefined,
    },
  };
}

export default async function WikiEntity({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  const config = getWikiType(type);
  if (!config) notFound();
  const mod = await loadEntity(config.key, slug);
  if (!mod) notFound();

  const { default: Body, meta } = mod;
  const typeKey = config.key as WikiTypeKey;

  const jsonLd = [
    entityJsonLd(typeKey, slug, meta),
    breadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: "Wiki", path: "/wiki" },
      { name: config.plural, path: `/wiki/${config.key}` },
      { name: meta.title, path: `/wiki/${config.key}/${slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1100px]">
          <nav className="text-h6sm flex flex-wrap gap-2 text-zinc-500">
            <Link href="/wiki" className="transition-colors hover:text-accent">
              Wiki
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/wiki/${config.key}`}
              className="transition-colors hover:text-accent"
            >
              {config.plural}
            </Link>
          </nav>

          <h1 className="text-h1 mt-6 text-white">{meta.title}</h1>
          <p className="text-body-lg mt-6 max-w-[680px] text-zinc-300">
            {meta.summary}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            {/* Body */}
            <div className="rich-text max-w-[720px] lg:order-1">
              <Body />

              {meta.related?.length ? (
                <>
                  <h2>See also</h2>
                  <ul>
                    {meta.related.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href}>{r.label}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {meta.reading?.length ? (
                <>
                  <h2>From the KITAMEN blog</h2>
                  <ul>
                    {meta.reading.map((r) => (
                      <li key={r.href}>
                        <a href={r.href}>{r.label}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {meta.sources?.length ? (
                <>
                  <h2>Sources</h2>
                  <ul>
                    {meta.sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            {/* Infobox — appears first on mobile, right rail on desktop */}
            <div className="lg:order-2">
              <div className="lg:sticky lg:top-32">
                <Infobox meta={meta} type={config} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
