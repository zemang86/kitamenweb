"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Two rows of tiles that scroll horizontally based on page scroll (per prompt spec). */
export function Marquee({ images }: { images: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const row1 = images.slice(0, 11);
  const row2 = images.slice(11, 21);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset(
        (window.scrollY - sectionTop + window.innerHeight) * 0.3,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <Row images={row1} x={offset - 200} />
        <Row images={row2} x={-(offset - 200)} />
      </div>
    </section>
  );
}

function Row({ images, x }: { images: string[]; x: number }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${x}px)`, willChange: "transform" }}
    >
      {tripled.map((src, i) => (
        <div
          key={i}
          className="relative h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl bg-zinc-900"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="420px"
            loading="lazy"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
