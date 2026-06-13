import { Button } from "@/components/Button";
import { ImageStrip } from "@/components/ImageStrip";
import { works } from "@/lib/works";
import { site } from "@/lib/site";

const stripImages = works.map((w) => w.mainImage);

export function CTASection() {
  return (
    <section className="overflow-hidden border-t border-zinc-800 bg-black py-24 md:py-32">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center px-6 text-center md:px-10">
        <h2 className="text-h1 text-zinc-100">
          Engineer The
          <br />
          Next Reality
        </h2>
        <div className="mt-10">
          <Button label="Let's Talk" href={site.talkToUs} />
        </div>
      </div>
      <div className="mt-20">
        <ImageStrip images={stripImages} rotation={-3} />
      </div>
    </section>
  );
}
