type HeadingTitleProps = {
  title: string;
  color?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Optional editorial index kicker, e.g. "01" — rendered above the title. */
  index?: string;
};

/** Mirrors the Framer "Heading Title" component — a large mono uppercase title. */
export function HeadingTitle({
  title,
  color = "rgb(228, 228, 231)",
  as: Tag = "h2",
  className = "",
  index,
}: HeadingTitleProps) {
  const heading = (
    <Tag className={`text-h2 ${index ? "" : className}`} style={{ color }}>
      {title}
    </Tag>
  );

  if (!index) return heading;

  return (
    <div className={className}>
      {/* "(01)" kicker — number in brand accent; inherits parent text-align */}
      <span className="text-h6sm mb-5 block text-zinc-500">
        (<span className="text-accent">{index}</span>)
      </span>
      {heading}
    </div>
  );
}
