"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-black/80 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="flex items-center"
          aria-label={site.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/logo-dark.png"
            alt={site.name}
            width={5443}
            height={775}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-h6sm text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.talkToUs}
            target="_blank"
            rel="noreferrer"
            className="text-h6sm rounded-full border border-zinc-700 px-5 py-2.5 text-white transition-colors hover:bg-white hover:text-black"
          >
            Talk To Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-black px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-h4 text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.talkToUs}
              target="_blank"
              rel="noreferrer"
              className="text-h6sm mt-2 inline-flex w-fit rounded-full border border-zinc-700 px-5 py-2.5 text-white"
            >
              Talk To Us
            </a>
            <div className="mt-2 flex gap-5">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-h6sm text-zinc-400 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
