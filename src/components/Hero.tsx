"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const leftImages = [
  "https://framerusercontent.com/images/Gs51g8osNOjNaUNxkbEKjljvFA.jpg",
  "https://framerusercontent.com/images/78m20wE0NMBRw7rvVj5vzAF5GJk.jpg",
  "https://framerusercontent.com/images/S7RZ0DFJLv4RUFD7U4rpQLkwec.jpg",
];

const rightImages = [
  "https://framerusercontent.com/images/awQjP5N7r0W7d6MCbmd3X36Kc.jpg",
  "https://framerusercontent.com/images/mwNHvvN3hfzam4dJJPY5ZDDvjk.jpeg",
  "https://framerusercontent.com/images/ZMV2sMmF0FMoZArg7GegLWpHI0I.jpg",
];

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
// map x from [a,b] to [0,1]
const range = (x: number, a: number, b: number) => clamp((x - a) / (b - a));

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const vh = window.innerHeight;
      const scrollable = section.offsetHeight - vh; // pinned scroll distance
      const scrolled = -section.getBoundingClientRect().top;
      const progress = clamp(scrolled / scrollable); // 0 → 1 across the hero

      // Panels part across most of the (now shorter) scroll track, so the
      // hero releases soon after KITAMEN is fully revealed — no long dead zone.
      const part = range(progress, 0, 0.8); // 0 → 1
      if (leftRef.current)
        leftRef.current.style.transform = `translateX(${-105 * part}%)`;
      if (rightRef.current)
        rightRef.current.style.transform = `translateX(${105 * part}%)`;

      // KITAMEN fades + scales in as the curtain opens
      const opacity = range(progress, 0.03, 0.4);
      const scale = 0.85 + range(progress, 0.03, 0.55) * 0.15;
      if (contentRef.current) {
        contentRef.current.style.opacity = String(opacity);
        contentRef.current.style.transform = `scale(${scale})`;
      }

      // Sub-headings lag the wordmark, then rise into place
      const sub = range(progress, 0.18, 0.5);
      if (subRef.current) {
        subRef.current.style.opacity = String(sub);
        subRef.current.style.transform = `translateY(${(1 - sub) * 24}px)`;
      }

      // Scroll hint fades out quickly
      if (indicatorRef.current)
        indicatorRef.current.style.opacity = String(1 - range(progress, 0, 0.2));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-zinc-200">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Brand content — fades in on top as the curtain opens */}
        <div
          ref={contentRef}
          style={{ opacity: 0, transform: "scale(0.85)" }}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="text-brand leading-none text-black [text-shadow:0_2px_30px_rgba(228,228,231,0.6)]">
            KITAMEN
          </h1>
          <div
            ref={subRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="mt-8 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2"
          >
            <p className="text-h5 text-black md:text-right">
              Boutique esports agency based in Malaysia
            </p>
            <p className="text-h5 text-black md:text-left">
              Crafted for impact. Delivered with precision.
            </p>
          </div>
        </div>

        {/* Left panel */}
        <div
          ref={leftRef}
          className="absolute left-0 top-0 z-20 grid h-screen w-1/2 grid-rows-3 will-change-transform"
        >
          {leftImages.map((src, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div
          ref={rightRef}
          className="absolute right-0 top-0 z-20 grid h-screen w-1/2 grid-rows-3 will-change-transform"
        >
          {rightImages.map((src, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2"
        >
          <div className="flex h-12 w-8 items-start justify-center rounded-full bg-zinc-200/80 p-2">
            <span className="block h-2 w-2 animate-bounce rounded-full bg-black" />
          </div>
        </div>

        {/* Film-grain texture overlay */}
        <div className="hero-grain pointer-events-none absolute inset-0 z-40" />
      </div>
    </section>
  );
}
