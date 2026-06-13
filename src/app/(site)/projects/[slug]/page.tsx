import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/home2/FadeIn";
import { works, getWork } from "@/lib/works";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

/** Strip HTML tags + decode the few entities we emit, then trim to ~160 chars. */
function workSummary(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work" };

  const description =
    workSummary(work.content) || `${work.category} · ${work.client} · ${work.year}`;
  const url = `/projects/${work.slug}`;

  return {
    title: work.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${work.title} — KITAMEN`,
      description,
      url,
      images: [{ url: work.mainImage, alt: work.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} — KITAMEN`,
      description,
      images: [work.mainImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const index = works.findIndex((w) => w.slug === slug);
  const next = works[(index + 1) % works.length];

  const gallery = [work.mainImage, work.hoverImage, ...work.gallery];

  const url = `${site.url}/projects/${work.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: work.title,
        description: workSummary(work.content),
        url,
        image: [work.mainImage, work.hoverImage, ...work.gallery],
        dateCreated: work.year,
        genre: work.category,
        creator: { "@type": "Organization", name: site.name, url: site.url },
        about: { "@type": "Organization", name: work.client },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Works",
            item: `${site.url}/projects`,
          },
          { "@type": "ListItem", position: 3, name: work.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/projects"
            className="text-h6sm text-zinc-500 transition-colors hover:text-accent"
          >
            ← All Works
          </Link>

          <h1 className="text-h1 mt-8 text-white">{work.title}</h1>

          {/* Meta row */}
          <dl className="mt-12 grid grid-cols-2 gap-8 border-y border-zinc-800 py-8 md:grid-cols-4">
            <Meta label="Category" value={work.category} />
            <Meta label="Product Type" value={work.productType} />
            <Meta label="Client" value={work.client} />
            <Meta label="Year" value={work.year} />
          </dl>

          {/* Hero image */}
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-900">
            <Image
              src={work.mainImage}
              alt={work.title}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
              priority
            />
          </div>

          {/* Rich content */}
          <div
            className="rich-text mx-auto mt-16 max-w-[760px]"
            dangerouslySetInnerHTML={{ __html: work.content }}
          />

          {/* Gallery */}
          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
            {gallery.map((src, i) => (
              <FadeIn
                key={i}
                delay={(i % 2) * 0.1}
                className={`relative overflow-hidden rounded-2xl bg-zinc-900 ${
                  i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${work.title} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </article>

      {/* Next project */}
      <section className="border-t border-zinc-800 px-6 py-16 md:px-10">
        <FadeIn className="mx-auto flex max-w-[1100px] items-center justify-between">
          <span className="text-h6sm text-zinc-500">Next Project</span>
          <Link
            href={`/projects/${next.slug}`}
            className="text-h3 text-white transition-colors hover:text-accent"
          >
            {next.title} →
          </Link>
        </FadeIn>
      </section>

      <CTASection />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-h6sm text-zinc-500">{label}</dt>
      <dd className="text-body-sm mt-2 text-zinc-200">{value}</dd>
    </div>
  );
}
