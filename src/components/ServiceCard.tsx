import type { Service } from "@/lib/site";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <div
      className="sticky top-[120px] rounded-3xl border border-zinc-800 bg-zinc-950 p-8 md:p-14"
      style={{ marginTop: index === 0 ? 0 : 32 }}
    >
      <div className="flex items-baseline gap-4">
        <span className="text-h6sm text-zinc-600">
          0{index + 1}
        </span>
        <h3 className="text-h3 text-white">{service.title}</h3>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-3 border-b border-zinc-800 pb-4"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
            <span className="text-h6 text-zinc-300">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
