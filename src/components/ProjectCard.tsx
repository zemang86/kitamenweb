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
          className="object-cover transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-0"
        />
        <Image
          src={work.hoverImage}
          alt={`${work.title} alternate`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100 scale-105"
        />
        <span className="text-h6sm absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
          {work.year}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-h4 text-white transition-colors group-hover:text-zinc-400">
          {work.title}
        </h3>
        <span className="text-h6sm whitespace-nowrap pt-1 text-zinc-500">
          {work.category}
        </span>
      </div>
    </Link>
  );
}
