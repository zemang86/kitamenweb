import Image from "next/image";

/** A rotated, edge-to-edge marquee of images — mirrors the Framer "Image Slideshow". */
export function ImageStrip({
  images,
  rotation = -3,
}: {
  images: string[];
  rotation?: number;
}) {
  const loop = [...images, ...images];
  return (
    <div
      className="w-[120%] -ml-[10%] overflow-hidden"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex w-max animate-marquee gap-4">
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-xl bg-zinc-900"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
