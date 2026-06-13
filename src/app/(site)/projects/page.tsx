import type { Metadata } from "next";
import { HeadingTitle } from "@/components/HeadingTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/home2/FadeIn";
import { works } from "@/lib/works";

const worksDescription =
  "Featured esports campaigns and activations by KITAMEN. Built by leaders, trusted by giants.";

export const metadata: Metadata = {
  title: "Works",
  description: worksDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Works — KITAMEN",
    description: worksDescription,
    url: "/projects",
  },
  twitter: { title: "Works — KITAMEN", description: worksDescription },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn>
            <HeadingTitle title="Featured Works" as="h1" />
            <p className="text-body-lg mt-6 max-w-[600px] text-zinc-400">
              Built by leaders, trusted by giants.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {works.map((w, i) => (
              <FadeIn key={w.slug} delay={(i % 2) * 0.1}>
                <ProjectCard work={w} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
