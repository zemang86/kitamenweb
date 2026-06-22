"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { WikiSearchDoc } from "@/lib/wiki";

/* Client-side wiki search. The full index is built at compile time (one record
   per published entity) and shipped as a prop — no API route, no network call.
   Matching is a simple token-AND over title + summary + tags + type label, so
   "mlbb jungler" narrows; ranking favours title hits over body hits. */

type Scored = { doc: WikiSearchDoc; score: number };

function scoreDoc(doc: WikiSearchDoc, tokens: string[]): number {
  const title = doc.title.toLowerCase();
  const tags = doc.tags.join(" ").toLowerCase();
  const summary = doc.summary.toLowerCase();
  const label = doc.typeLabel.toLowerCase();

  let score = 0;
  for (const tok of tokens) {
    if (title.includes(tok)) score += title.startsWith(tok) ? 6 : 4;
    else if (tags.includes(tok)) score += 3;
    else if (label.includes(tok)) score += 2;
    else if (summary.includes(tok)) score += 1;
    else return 0; // every token must match somewhere (AND)
  }
  return score;
}

export function WikiSearch({ index }: { index: WikiSearchDoc[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [] as WikiSearchDoc[];
    return index
      .map((doc): Scored => ({ doc, score: scoreDoc(doc, tokens) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .slice(0, 8)
      .map((s) => s.doc);
  }, [query, index]);

  const showPanel = open && query.trim().length > 0;

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showPanel || !results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      const hit = results[active];
      if (hit) window.location.href = hit.href;
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative max-w-[640px]">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        placeholder="Search the wiki — games, teams, players, terms…"
        aria-label="Search the wiki"
        autoComplete="off"
        className="text-body-sm w-full rounded-full border border-zinc-800 bg-zinc-950/60 px-6 py-4 text-white placeholder:text-zinc-600 focus:border-accent focus:outline-none"
      />

      {showPanel ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur">
          {results.length ? (
            <ul>
              {results.map((doc, i) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                      i === active ? "bg-zinc-900" : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="text-body-sm block truncate text-white">
                        {doc.title}
                      </span>
                      <span className="text-h6sm block truncate text-zinc-500">
                        {doc.summary}
                      </span>
                    </span>
                    <span className="text-h6sm shrink-0 rounded-full border border-zinc-800 px-3 py-1 text-zinc-500">
                      {doc.typeLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-sm px-5 py-4 text-zinc-500">
              No matches for “{query.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
