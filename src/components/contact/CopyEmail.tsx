"use client";

import { useState } from "react";

/** Email contact card: the address opens the mail client, the icon copies it. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors focus-within:border-accent hover:border-accent">
      <p className="text-h6sm text-zinc-500">
        Email{copied && <span className="text-accent"> · Copied ✓</span>}
      </p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <a
          href={`mailto:${email}`}
          className="text-h4 break-all text-white transition-colors hover:text-accent"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="shrink-0 rounded-full border border-zinc-700 p-2.5 text-zinc-400 transition-colors hover:border-accent hover:text-accent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
