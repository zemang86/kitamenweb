import type { Metadata } from "next";
import { HeadingTitle } from "@/components/HeadingTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "Works — KITAMEN",
  description:
    "Featured esports campaigns and activations by KITAMEN. Built by leaders, trusted by giants.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <HeadingTitle title="Featured Works" as="h1" />
          <p className="text-body-lg mt-6 max-w-[600px] text-zinc-400">
            Built by leaders, trusted by giants.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {works.map((w) => (
              <ProjectCard key={w.slug} work={w} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
