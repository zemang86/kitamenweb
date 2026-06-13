import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-brand leading-none text-zinc-100">404</p>
      <p className="text-h4 mt-4 text-zinc-400">This page went off-grid.</p>
      <div className="mt-10">
        <Button label="Back Home" href="/" />
      </div>
      <Link
        href="/projects"
        className="text-h6sm mt-6 text-zinc-500 hover:text-white"
      >
        Or browse our works →
      </Link>
    </section>
  );
}
