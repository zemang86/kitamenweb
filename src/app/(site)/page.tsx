import Image from "next/image";
import { Hero } from "@/components/Hero";
import { HeadingTitle } from "@/components/HeadingTitle";
import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { FadeIn } from "@/components/home2/FadeIn";
import { works } from "@/lib/works";
import { services } from "@/lib/site";

const aboutImages = [
  "https://framerusercontent.com/images/aBIkjM9CWNyUGolRVq5Ppbad7s.jpg",
  "https://framerusercontent.com/images/ZMV2sMmF0FMoZArg7GegLWpHI0I.jpg",
  "https://framerusercontent.com/images/EJMgzshMWaZFGRSJc4jXZjA5ZkU.png",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="mx-auto w-full max-w-[1600px]">
        {/* Who We Are */}
        <section className="relative border-b border-zinc-800 px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="md:sticky md:top-28 md:self-start">
              <HeadingTitle
                title="Who We Are"
                color="rgb(255,255,255)"
                index="01"
              />
            </div>
            <FadeIn className="flex flex-col gap-10" delay={0.1}>
              <p className="text-body text-zinc-300">
                We&rsquo;re gamers first, founders second. We build what
                we&rsquo;d play&mdash;not just what sells. After years fixing
                half-baked events by middlemen, clients now return&mdash;not for
                price, but for outcomes. KITAMEN isn&rsquo;t your average esports
                vendor. We set standards, shape culture, and execute with
                precision.
              </p>
              <Button label="About Us" href="/about" className="w-fit" />
            </FadeIn>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {aboutImages.map((src, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-900"
              >
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Signature Campaigns */}
        <section className="border-b border-zinc-800 px-6 py-24 md:px-10 md:py-32">
          <FadeIn className="mx-auto max-w-[800px] text-center">
            <HeadingTitle title="Signature Campaigns" index="02" />
            <p className="text-body mt-8 text-zinc-300">
              A curated portfolio of campaigns that shaped Malaysia&rsquo;s
              esports narrative&mdash;from high-stakes tournaments to culturally
              resonant brand activations. Every project reflects our precision,
              playmaking, and pursuit of esports excellence.
            </p>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
            {works.slice(0, 4).map((w, i) => (
              <FadeIn key={w.slug} delay={(i % 2) * 0.1}>
                <ProjectCard work={w} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Button label="More Works" href="/projects" />
          </div>
        </section>

        {/* Designed to Deliver — Services */}
        <section className="border-b border-zinc-800 px-6 py-24 md:px-10 md:py-32">
          <FadeIn
            y={0}
            className="mx-auto max-w-[800px] pb-24 text-center md:sticky md:top-28"
          >
            <HeadingTitle title="Designed to Deliver" index="03" />
            <p className="text-body mt-8 text-zinc-300">
              Each KITAMEN system comes equipped with a curated selection of
              industry-standard gaming consoles, peripherals, and
              displays&mdash;including PlayStation 5, Xbox Series X, Nintendo
              Switch, and other competitive-ready hardware. We deploy only what
              performs&mdash;based on audience type, game format, and space
              requirements. Nothing is random. Everything is tested. Need
              something specific? We&rsquo;ll configure the right gear for your
              experience&mdash;quietly and precisely.
            </p>
          </FadeIn>
          <div className="mx-auto max-w-[1100px]">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* Chosen by Leaders — Testimonials */}
        <section className="border-b border-zinc-800 px-6 py-24 md:px-10 md:py-32">
          <FadeIn className="mb-16 text-center">
            <HeadingTitle title="Chosen by Leaders." index="04" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Testimonials />
          </FadeIn>
        </section>
      </div>

      <CTASection />
    </>
  );
}
