import Link from "next/link";
import type { ReactNode } from "react";

/** Gradient pill CTA (per prompt spec). */
export function ContactButton({
  label = "Contact Me",
  href = "#contact",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  const classes =
    "inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base " +
    className;
  const style: React.CSSProperties = {
    background:
      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow:
      "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
    outline: "2px solid white",
    outlineOffset: "-3px",
  };
  return (
    <ButtonShell href={href} className={classes} style={style}>
      {label}
    </ButtonShell>
  );
}

/** Ghost/outline pill (per prompt spec). */
export function LiveProjectButton({
  label = "Live Project",
  href = "#",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  const classes =
    "inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base " +
    className;
  return (
    <ButtonShell href={href} className={classes}>
      {label}
    </ButtonShell>
  );
}

function ButtonShell({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const isAnchor = href.startsWith("#");
  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  if (isAnchor) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
