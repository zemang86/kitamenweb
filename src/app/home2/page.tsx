import type { Metadata } from "next";
import Image from "next/image";
import { Magnet } from "@/components/home2/Magnet";
import { FadeIn } from "@/components/home2/FadeIn";
import { AnimatedText } from "@/components/home2/AnimatedText";
import { ContactButton } from "@/components/home2/Buttons";
import { Marquee } from "@/components/home2/Marquee";
import {
  StickyProjects,
  type StickyProject,
} from "@/components/home2/StickyProjects";
import { works } from "@/lib/works";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "KITAMEN — Boutique Esports Agency",
  description:
    "KITAMEN designs structured esports experiences. Crafted for impact. Delivered with precision.",
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// 21 real esports photos for the marquee
const marqueeImages = works
  .flatMap((w) => [w.mainImage, w.hoverImage, ...w.gallery])
  .slice(0, 21);

// Decorative corner photos for the About section
const cornerImages = [
  works[0].mainImage,
  works[2].mainImage,
  works[4].mainImage,
  works[5].mainImage,
];

const stickyProjects: StickyProject[] = works.slice(0, 3).map((w, i) => ({
  number: `0${i + 1}`,
  category: w.category,
  name: w.title,
  href: `/projects/${w.slug}`,
  col1: [w.mainImage, w.gallery[0] ?? w.hoverImage],
  col2: w.hoverImage,
}));

export default function Home2() {
  return (
    <div
      className="font-kanit min-h-screen bg-[#0C0C0C] text-[#D7E2EA]"
      style={{ overflowX: "clip" }}
    >
      {/* ================= HERO ================= */}
      <section className="relative flex h-screen flex-col" style={{ overflowX: "clip" }}>
        {/* Navbar */}
        <FadeIn
          as="nav"
          delay={0}
          y={-20}
          className="z-20 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {l.label}
            </a>
          ))}
        </FadeIn>

        {/* Massive gradient wordmark */}
        <div className="flex flex-1 flex-col">
          <div className="overflow-hidden">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-[14vw] sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
                KITAMEN
              </h1>
            </FadeIn>
          </div>

          {/* Magnetic logo centerpiece */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[200px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[260px] sm:translate-y-0 md:w-[320px] lg:w-[380px]">
            <FadeIn delay={0.6} y={30}>
              <Magnet
                padding={150}
                strength={3}
                className="pointer-events-auto"
              >
                <Image
                  src="/logo/android-chrome-192x192.png"
                  alt={site.name}
                  width={384}
                  height={384}
                  priority
                  className="h-auto w-full drop-shadow-[0_20px_60px_rgba(182,0,168,0.35)]"
                />
              </Magnet>
            </FadeIn>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
            <FadeIn delay={0.35} y={20}>
              <p className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[280px]"
                 style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
                a boutique esports agency based in malaysia &mdash; crafted for
                impact, delivered with precision
              </p>
            </FadeIn>
            <FadeIn delay={0.5} y={20}>
              <ContactButton label="Let's Talk" href={site.talkToUs} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <Marquee images={marqueeImages} />

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
      >
        {/* Corner decorations */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]">
          <CornerImage src={cornerImages[0]} className="w-[120px] sm:w-[160px] md:w-[210px]" />
        </FadeIn>
        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]">
          <CornerImage src={cornerImages[1]} className="w-[120px] sm:w-[160px] md:w-[210px]" />
        </FadeIn>
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
          <CornerImage src={cornerImages[2]} className="w-[100px] sm:w-[140px] md:w-[180px]" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
          <CornerImage src={cornerImages[3]} className="w-[130px] sm:w-[170px] md:w-[220px]" />
        </FadeIn>

        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Who We Are
            </h2>
          </FadeIn>

          <AnimatedText
            text="We're gamers first, founders second. We build what we'd play—not just what sells. After years fixing half-baked events by middlemen, clients now return—not for price, but for outcomes. KITAMEN isn't your average esports vendor. We set standards, shape culture, and execute with precision."
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />

          <FadeIn delay={0.2} y={20} className="mt-4">
            <ContactButton label="About Us" href="/about" />
          </FadeIn>
        </div>
      </section>

      {/* ================= SERVICES (white) ================= */}
      <section
        id="services"
        className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      >
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
        <div className="mx-auto max-w-5xl">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1} y={30}>
              <div
                className="flex items-start gap-6 py-8 sm:py-10 md:gap-10 md:py-12"
                style={{ borderTop: "1px solid rgba(12,12,12,0.15)" }}
              >
                <span
                  className="shrink-0 font-black leading-none text-[#0C0C0C]"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
                >
                  0{i + 1}
                </span>
                <div className="pt-2 md:pt-4">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C]"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {s.features.join(" · ")}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS (sticky stack) ================= */}
      <section
        id="works"
        className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      >
        <h2
          className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
        <div className="mx-auto max-w-6xl">
          <StickyProjects projects={stickyProjects} />
        </div>
      </section>

      {/* ================= CONTACT STRIP ================= */}
      <footer
        id="contact"
        className="bg-[#0C0C0C] px-6 py-20 md:px-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
          >
            Engineer The Next Reality
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="text-lg uppercase tracking-widest text-[#D7E2EA] hover:opacity-70 md:text-2xl"
          >
            {site.email}
          </a>
          <ContactButton label="Let's Talk" href={site.talkToUs} />
          <div className="mt-6 flex gap-6">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 hover:text-[#D7E2EA]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function CornerImage({ src, className }: { src: string; className: string }) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-3xl ${className}`}>
      <Image src={src} alt="" fill sizes="220px" className="object-cover" />
    </div>
  );
}
