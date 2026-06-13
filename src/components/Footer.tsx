import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-h6sm text-zinc-500">Send an email</p>
            <a
              href={`mailto:${site.email}`}
              className="text-h5 mt-2 inline-block text-white hover:text-zinc-300"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-h6sm text-zinc-500">Menu</p>
            <ul className="mt-4 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      rel="noreferrer"
                      className="text-body-sm text-zinc-300 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-body-sm text-zinc-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-h6sm text-zinc-500">Social</p>
            <ul className="mt-4 space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body-sm text-zinc-300 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-h6sm text-zinc-500">Get in touch</p>
            <a
              href={site.talkToUs}
              target="_blank"
              rel="noreferrer"
              className="text-body-sm mt-4 inline-block text-zinc-300 hover:text-white"
            >
              Talk To Us →
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-16 overflow-hidden">
          <p className="text-brand select-none leading-none text-zinc-100">
            {site.name}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-800 pt-6 md:flex-row md:items-center">
          <p className="text-body-sm text-zinc-500">
            © {new Date().getFullYear()} KITAMEN. All rights reserved.
          </p>
          <p className="text-body-sm text-zinc-500">
            Boutique esports agency based in Malaysia.
          </p>
        </div>
      </div>
    </footer>
  );
}
