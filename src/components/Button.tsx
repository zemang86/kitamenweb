import Link from "next/link";

type ButtonProps = {
  label: string;
  href: string;
  className?: string;
};

export function Button({ label, href, className = "" }: ButtonProps) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      <span className="text-h6sm">{label}</span>
      <ArrowRight />
    </>
  );

  const classes =
    "group inline-flex items-center gap-3 rounded-full border border-zinc-700 bg-transparent px-6 py-3 text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white " +
    className;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
