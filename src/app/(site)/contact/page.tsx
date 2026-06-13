import type { Metadata } from "next";
import { HeadingTitle } from "@/components/HeadingTitle";
import { FadeIn } from "@/components/home2/FadeIn";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { SocialIcon } from "@/components/SocialIcon";
import { site } from "@/lib/site";

const contactDescription =
  "Get in touch with KITAMEN. Engineer the next reality for your brand or event.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KITAMEN",
    description: contactDescription,
    url: "/contact",
  },
  twitter: { title: "Contact — KITAMEN", description: contactDescription },
};

const whatsappNumber = "+60 12-284 7011";

const faqs = [
  {
    q: "What does KITAMEN do?",
    a: "KITAMEN is a boutique esports agency based in Malaysia. We design and run structured esports experiences — from console and sim setups (PlayPod) to fully managed tournaments (PlaySuite) and bespoke, co-created activations (PlayLab) for brands, agencies, and institutions.",
  },
  {
    q: "Who does KITAMEN work with?",
    a: "Brands, agencies, and institutions. We've partnered with the likes of Media Prima, UNIFI, and Toyota, alongside Malaysian ministries and agencies — delivering 220+ national esports events since 2015.",
  },
  {
    q: "What are PlayPod, PlaySuite, and PlayLab?",
    a: "They're our three core offerings. PlayPod is modular, plug-and-play console and sim setups. PlaySuite is competitive-ready, fully managed tournaments with broadcast support. PlayLab is a collaborative, custom-built experience designed around your specific goals.",
  },
  {
    q: "Where is KITAMEN based?",
    a: "We're based in Malaysia and operate nationwide, with experience producing events across the country.",
  },
  {
    q: "How do I start a project with KITAMEN?",
    a: "The fastest way is WhatsApp or email — send over your brief, event, or idea and we'll take it from there. We usually reply within 24 hours.",
  },
];

export default function ContactPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="px-6 pb-32 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn>
            <HeadingTitle title="Talk To Us" as="h1" />
            <p className="text-body-lg mt-6 max-w-[600px] text-zinc-400">
              Have a brief, an event, or an idea worth building? We&rsquo;d love
              to hear it.
            </p>
            <p className="text-h6sm mt-6 text-zinc-500">
              Based in Malaysia · We usually reply within 24 hours
            </p>
          </FadeIn>

          <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
            <FadeIn delay={0.1} className="flex flex-col gap-5">
              <CopyEmail email={site.email} />

              {/* WhatsApp */}
              <a
                href={site.talkToUs}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-accent"
              >
                <div>
                  <p className="text-h6sm text-zinc-500">WhatsApp</p>
                  <p className="text-h4 mt-2 text-white">{whatsappNumber}</p>
                </div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              {/* Socials */}
              <div className="pt-2">
                <p className="text-h6sm text-zinc-500">Follow</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition-colors hover:border-accent hover:text-accent"
                    >
                      <SocialIcon label={s.label} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex items-end">
              <h2 className="text-h1 text-zinc-100">
                Engineer The
                <br />
                Next Reality
              </h2>
            </FadeIn>
          </div>

          {/* FAQ */}
          <div className="mt-32 border-t border-zinc-800 pt-16">
            <FadeIn>
              <HeadingTitle title="Common Questions" />
            </FadeIn>
            <div className="mx-auto mt-12 max-w-[900px]">
              {faqs.map((f, i) => (
                <FadeIn key={f.q} delay={(i % 2) * 0.05}>
                  <details className="group border-b border-zinc-800 py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                      <span className="text-h4 text-white transition-colors group-hover:text-accent">
                        {f.q}
                      </span>
                      <span className="text-h3 shrink-0 leading-none text-accent transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="text-body mt-4 max-w-[760px] text-zinc-400">
                      {f.a}
                    </p>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
