"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { LiveProjectButton } from "./Buttons";

export type StickyProject = {
  number: string;
  category: string;
  name: string;
  href: string;
  col1: [string, string];
  col2: string;
};

export function StickyProjects({ projects }: { projects: StickyProject[] }) {
  return (
    <div>
      {projects.map((p, i) => (
        <Card
          key={p.name}
          project={p}
          index={i}
          total={projects.length}
        />
      ))}
    </div>
  );
}

function Card({
  project,
  index,
  total,
}: {
  project: StickyProject;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-24 h-[85vh] md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-4 sm:px-4">
          <div className="flex items-center gap-5">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 90px)" }}
            >
              {project.number}
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </p>
              <p
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
              >
                {project.name}
              </p>
            </div>
          </div>
          <LiveProjectButton label="View Project" href={project.href} />
        </div>

        {/* Image grid */}
        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <div
              className="relative w-full overflow-hidden rounded-[40px] bg-zinc-900 sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <Image src={project.col1[0]} alt="" fill sizes="40vw" className="object-cover" />
            </div>
            <div
              className="relative w-full overflow-hidden rounded-[40px] bg-zinc-900 sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <Image src={project.col1[1]} alt="" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <div className="relative w-[60%] overflow-hidden rounded-[40px] bg-zinc-900 sm:rounded-[50px] md:rounded-[60px]">
            <Image src={project.col2} alt="" fill sizes="60vw" className="object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
