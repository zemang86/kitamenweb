import type { Metadata } from "next";
import { HeadingTitle } from "@/components/HeadingTitle";
import { Button } from "@/components/Button";
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

export default function ContactPage() {
  return (
    <section className="min-h-[80vh] px-6 pb-32 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <HeadingTitle title="Talk To Us" as="h1" />
        <p className="text-body-lg mt-6 max-w-[600px] text-zinc-400">
          Have a brief, an event, or an idea worth building? We&rsquo;d love to
          hear it.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-h6sm text-zinc-500">Send an email</p>
              <a
                href={`mailto:${site.email}`}
                className="text-h2 mt-3 block text-white hover:text-zinc-300"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-h6sm text-zinc-500">Or start a conversation</p>
              <div className="mt-4">
                <Button label="Let's Talk" href={site.talkToUs} />
              </div>
            </div>
            <div>
              <p className="text-h6sm text-zinc-500">Follow</p>
              <div className="mt-4 flex flex-wrap gap-5">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-h6 text-zinc-300 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <h2 className="text-h1 text-zinc-100">
              Engineer The
              <br />
              Next Reality
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
