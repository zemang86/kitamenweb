import Image from "next/image";
import type { WikiMeta, WikiTypeConfig } from "@/lib/wiki";

/**
 * Wikipedia-style infobox: a compact, scannable fact block. This is the part
 * answer engines love — a dense, structured summary of the entity.
 */
export function Infobox({
  meta,
  type,
}: {
  meta: WikiMeta;
  type: WikiTypeConfig;
}) {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
      <div className="text-h6sm text-accent">{type.label}</div>
      <h2 className="text-h4 mt-2 text-white">{meta.title}</h2>

      {meta.hero ? (
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900">
          <Image
            src={meta.hero}
            alt={meta.title}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      ) : null}

      {meta.facts?.length ? (
        <dl className="mt-5 divide-y divide-zinc-800 border-t border-zinc-800">
          {meta.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-3 gap-3 py-2.5">
              <dt className="text-h6sm col-span-1 text-zinc-500">{f.label}</dt>
              <dd className="text-body-sm col-span-2 text-zinc-200">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {meta.updated ? (
        <p className="text-h6sm mt-5 text-zinc-600">Updated {meta.updated}</p>
      ) : null}
    </aside>
  );
}
