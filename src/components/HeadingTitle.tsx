type HeadingTitleProps = {
  title: string;
  color?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Mirrors the Framer "Heading Title" component — a large mono uppercase title. */
export function HeadingTitle({
  title,
  color = "rgb(228, 228, 231)",
  as: Tag = "h2",
  className = "",
}: HeadingTitleProps) {
  return (
    <Tag className={`text-h2 ${className}`} style={{ color }}>
      {title}
    </Tag>
  );
}
