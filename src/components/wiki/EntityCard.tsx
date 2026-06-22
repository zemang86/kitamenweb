import Link from "next/link";
import type { WikiMeta, WikiTypeKey } from "@/lib/wiki";
import { entityPath } from "@/lib/wiki";

/** Card used on the wiki landing + per-type index pages. */
export function EntityCard({
  type,
  slug,
  meta,
}: {
  type: WikiTypeKey;
  slug: string;
  meta: WikiMeta;
}) {
  return (
    <Link
      href={entityPath(type, slug)}
      className="group block rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 transition-colors hover:border-accent"
    >
      <h3 className="text-h4 text-white transition-colors group-hover:text-accent">
        {meta.title}
      </h3>
      <p className="text-body-sm mt-3 line-clamp-3 text-zinc-400">
        {meta.summary}
      </p>
      {meta.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {meta.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-h6sm rounded-full border border-zinc-800 px-3 py-1 text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
