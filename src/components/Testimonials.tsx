"use client";

import { useState } from "react";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <div className="mx-auto w-full max-w-[800px] text-center">
      <blockquote className="text-h4 min-h-[180px] font-normal text-zinc-200">
        “{t.quote}”
      </blockquote>
      <div className="mt-8">
        <p className="text-h6 text-white">{t.name}</p>
        <p className="text-body-sm text-zinc-500">{t.role}</p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-white" : "w-2 bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
