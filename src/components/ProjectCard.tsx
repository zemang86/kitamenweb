import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/works";

export function ProjectCard({ work }: { work: Work }) {
  return (
    <Link href={`/projects/${work.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900">
        <Image
          src={work.mainImage}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-[opacity,transform] duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:opacity-0"
        />
        <Image
          src={work.hoverImage}
          alt={`${work.title} alternate`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="scale-105 object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out [@media(hover:hover)]:group-hover:scale-110 [@media(hover:hover)]:group-hover:opacity-100"
        />
        {/* Legibility scrim + "View Project" affordance, revealed on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100" />
        <div className="text-h6sm pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 text-white opacity-0 transition-all duration-500 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          View Project
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <span className="text-h6sm absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
          {work.year}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-h4 text-white">{work.title}</h3>
        <span className="text-h6sm whitespace-nowrap pt-1 text-zinc-500 transition-colors group-hover:text-accent">
          {work.category}
        </span>
      </div>
    </Link>
  );
}
