import Image from "next/image";
import type { Metadata } from "next";
import { HeadingTitle } from "@/components/HeadingTitle";
import { CTASection } from "@/components/CTASection";
import { team } from "@/lib/site";

const aboutDescription =
  "Since 2015, KITAMEN has produced 220+ national esports events and distributed RM2 million in prize pools. Gamers first, founders second.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — KITAMEN",
    description: aboutDescription,
    url: "/about",
  },
  twitter: { title: "About — KITAMEN", description: aboutDescription },
};

const stats = [
  { value: "220+", label: "National events produced" },
  { value: "RM2M", label: "Distributed in prize pools" },
  { value: "2015", label: "Building esports culture since" },
];

const teamImage =
  "https://framerusercontent.com/images/aBIkjM9CWNyUGolRVq5Ppbad7s.jpg";

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <HeadingTitle title="Who We Are" as="h1" color="rgb(255,255,255)" />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <p className="text-body-lg text-zinc-300">
              Since 2015, we&rsquo;ve produced 220+ national events and
              distributed RM2 million in prize pools, partnering with Media
              Prima, TM, MDEC, and KBS along the way&mdash;and earning
              TERAJU&rsquo;s SUPERB grant.
            </p>
            <p className="text-body text-zinc-400">
              We&rsquo;re gamers first, founders second. We build what we&rsquo;d
              play&mdash;not just what sells. After years fixing half-baked
              events run by middlemen, clients now return&mdash;not for price,
              but for outcomes. KITAMEN isn&rsquo;t your average esports vendor.
              We set standards, shape culture, and execute with precision. Led
              by Hazman Hassan.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
              >
                <p className="text-h2 text-white">{s.value}</p>
                <p className="text-body-sm mt-2 text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-900">
            <Image
              src={teamImage}
              alt="The KITAMEN team"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="border-t border-zinc-800 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <HeadingTitle title="Meet the Team" />
          <p className="text-body mt-6 max-w-[600px] text-zinc-400">
            Command &amp; dominate. A tight crew of operators, broadcasters, and
            builders behind every KITAMEN production.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {team
              .filter((member) => ["Hazman", "Riaz"].includes(member.name))
              .map((member) => (
                <div
                  key={member.name}
                  className="border-t border-zinc-800 pt-6"
                >
                  <p className="text-h3 text-white">{member.name}</p>
                  <p className="text-h6sm mt-2 text-zinc-500">{member.role}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
