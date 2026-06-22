import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/**
 * Global MDX component overrides. Element styling lives in the `.rich-text`
 * wrapper (see globals.css) so the wiki body matches the rest of the site —
 * here we only need to upgrade internal links to client-side navigation.
 */
const components: MDXComponents = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href} {...props} />;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
