"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Panels slide apart over the first ~60% of the scroll track
  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0%", "-105%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0%", "105%"]);
  // Brand content scales/fades in behind the parting panels
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0.4, 1]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-[250vh] bg-zinc-200">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Brand content revealed behind the panels */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="text-brand leading-none text-black">KITAMEN</h1>
          <div className="mt-8 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2">
            <p className="text-h5 text-black md:text-right">
              Boutique esports agency based in Malaysia
            </p>
            <p className="text-h5 text-black md:text-left">
              Crafted for impact. Delivered with precision.
            </p>
          </div>
        </motion.div>

        {/* Left panel */}
        <motion.div
          style={{ x: leftX }}
          className="absolute left-0 top-0 z-20 grid h-screen w-1/2 grid-rows-3"
        >
          {leftImages.map((src, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </motion.div>

        {/* Right panel */}
        <motion.div
          style={{ x: rightX }}
          className="absolute right-0 top-0 z-20 grid h-screen w-1/2 grid-rows-3"
        >
          {rightImages.map((src, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2"
        >
          <div className="flex h-12 w-8 items-start justify-center rounded-full bg-zinc-200/80 p-2">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="block h-2 w-2 rounded-full bg-black"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
