import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { site } from "@/lib/site";

/* ---------------------------------------------------------------------------
   KITAMEN Wiki — a Malaysia-focused esports knowledge base.

   Content lives as MDX under `src/content/wiki/<type>/<slug>.mdx`. Each file
   default-exports its body and named-exports a `meta` object (the infobox +
   SEO/AEO data). This module is the build-time data layer: it scans the
   content tree, loads entities, and emits schema.org JSON-LD per entity type.
--------------------------------------------------------------------------- */

export type WikiFact = { label: string; value: string };
export type WikiLink = { href: string; label: string };

export type WikiMeta = {
  /** Display name / page H1. */
  title: string;
  /** 1–2 sentence answer-engine-friendly definition. Used for meta + schema. */
  summary: string;
  /** ISO date (YYYY-MM-DD) of last meaningful edit. */
  updated?: string;
  /** Optional hero/portrait image URL. */
  hero?: string;
  /** Infobox rows (right rail). */
  facts?: WikiFact[];
  /** "See also" internal links — the entity graph that AEO rewards. */
  related?: WikiLink[];
  /** Visible reference links that back the facts on the page (trust / E-E-A-T). */
  sources?: WikiLink[];
  /** Further reading on the KITAMEN blog (kitamen.my) — keeps readers on-brand. */
  reading?: WikiLink[];
  tags?: string[];
  /** Hide from indexes + sitemap until the entry is verified/ready. */
  draft?: boolean;

  /* Optional schema.org hints (type-specific) */
  foundingDate?: string;
  game?: string;
  startDate?: string;
  endDate?: string;
  locationName?: string;
  /** Person nationality — only set when verified; omitted entities assert none. */
  nationality?: string;
  /** Authoritative URLs for entity disambiguation (official site, liquipedia…). */
  sameAs?: string[];
};

export type WikiTypeKey =
  | "players"
  | "teams"
  | "tournaments"
  | "games"
  | "glossary";

export type WikiTypeConfig = {
  key: WikiTypeKey;
  /** Singular label, e.g. "Player". */
  label: string;
  /** Plural label, e.g. "Players". */
  plural: string;
  /** Short section intro. */
  blurb: string;
  /** schema.org @type used for entity JSON-LD. */
  schemaType: string;
};

export const WIKI_TYPES: WikiTypeConfig[] = [
  {
    key: "games",
    label: "Game",
    plural: "Games",
    blurb: "The titles that drive Malaysian competitive play.",
    schemaType: "VideoGame",
  },
  {
    key: "teams",
    label: "Team",
    plural: "Teams",
    blurb: "Malaysian esports organisations and rosters.",
    schemaType: "SportsTeam",
  },
  {
    key: "players",
    label: "Player",
    plural: "Players",
    blurb: "Pros, casters and personalities in the local scene.",
    schemaType: "Person",
  },
  {
    key: "tournaments",
    label: "Tournament",
    plural: "Tournaments",
    blurb: "Leagues and events shaping the Malaysian calendar.",
    schemaType: "SportsEvent",
  },
  {
    key: "glossary",
    label: "Term",
    plural: "Glossary",
    blurb: "Esports terminology, defined in Bahasa-Malaysia-aware English.",
    schemaType: "DefinedTerm",
  },
];

export function getWikiType(key: string): WikiTypeConfig | undefined {
  return WIKI_TYPES.find((t) => t.key === key);
}

export function entityPath(type: WikiTypeKey, slug: string): string {
  return `/wiki/${type}/${slug}`;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/wiki");

/** All MDX slugs for a type (build-time filesystem scan). */
export function listSlugs(type: WikiTypeKey): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

type WikiModule = { default: ComponentType; meta: WikiMeta };

/** Dynamically import one entity's MDX module (body + meta). */
export async function loadEntity(
  type: WikiTypeKey,
  slug: string,
): Promise<WikiModule | null> {
  try {
    // Relative path (not the @ alias) keeps the dynamic-import context that
    // the bundler builds scoped to the content tree.
    const mod = await import(`../content/wiki/${type}/${slug}.mdx`);
    return mod as WikiModule;
  } catch {
    return null;
  }
}

/** Meta for every (non-draft) entity of a type — for index pages. */
export async function listEntities(
  type: WikiTypeKey,
): Promise<{ slug: string; meta: WikiMeta }[]> {
  const entries = await Promise.all(
    listSlugs(type).map(async (slug) => {
      const mod = await loadEntity(type, slug);
      return mod ? { slug, meta: mod.meta } : null;
    }),
  );
  return entries
    .filter((e): e is { slug: string; meta: WikiMeta } => e !== null)
    .filter((e) => !e.meta.draft)
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
}

/** One flat, serialisable record per published entity — shipped to the client search box. */
export type WikiSearchDoc = {
  type: WikiTypeKey;
  typeLabel: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  tags: string[];
};

/** Build the full client-side search index (every non-draft entity, all types). */
export async function searchIndex(): Promise<WikiSearchDoc[]> {
  const perType = await Promise.all(
    WIKI_TYPES.map(async (t) => {
      const entities = await listEntities(t.key);
      return entities.map(({ slug, meta }) => ({
        type: t.key,
        typeLabel: t.label,
        slug,
        href: entityPath(t.key, slug),
        title: meta.title,
        summary: meta.summary,
        tags: meta.tags ?? [],
      }));
    }),
  );
  return perType.flat();
}

/** Every published (type, slug) pair — for generateStaticParams + sitemap. Skips drafts. */
export async function allEntityParams(): Promise<
  { type: WikiTypeKey; slug: string }[]
> {
  const perType = await Promise.all(
    WIKI_TYPES.map(async (t) => {
      const entities = await listEntities(t.key);
      return entities.map((e) => ({ type: t.key, slug: e.slug }));
    }),
  );
  return perType.flat();
}

/** Build schema.org JSON-LD for an entity, keyed off its type. */
export function entityJsonLd(
  type: WikiTypeKey,
  slug: string,
  meta: WikiMeta,
): Record<string, unknown> {
  const url = `${site.url}${entityPath(type, slug)}`;
  const config = getWikiType(type);
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": config?.schemaType ?? "Thing",
    "@id": `${url}#entity`,
    name: meta.title,
    description: meta.summary,
    url,
  };

  if (meta.hero) base.image = meta.hero;
  if (meta.sameAs?.length) base.sameAs = meta.sameAs;
  if (meta.updated) base.dateModified = meta.updated;

  switch (type) {
    case "games":
      if (meta.foundingDate) base.datePublished = meta.foundingDate;
      base.applicationCategory = "Game";
      break;
    case "teams":
      base.sport = "Esports";
      if (meta.foundingDate) base.foundingDate = meta.foundingDate;
      if (meta.locationName) {
        base.location = { "@type": "Place", name: meta.locationName };
      }
      break;
    case "players":
      base.jobTitle = "Esports Player";
      if (meta.nationality) {
        base.nationality = { "@type": "Country", name: meta.nationality };
      }
      break;
    case "tournaments":
      base.sport = "Esports";
      if (meta.startDate) base.startDate = meta.startDate;
      if (meta.endDate) base.endDate = meta.endDate;
      if (meta.locationName) {
        base.location = { "@type": "Place", name: meta.locationName };
      }
      break;
    case "glossary":
      base.inDefinedTermSet = `${site.url}/wiki/glossary`;
      break;
  }

  return base;
}

/** Breadcrumb JSON-LD shared by entity + index pages. */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}
