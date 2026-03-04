import Link from "next/link";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
        {profile.name}
      </h1>
      <p className="text-xl text-zinc-400">{profile.title}</p>
      <p className="max-w-xl text-zinc-500">{profile.bio}</p>
      <div className="flex gap-4 pt-4">
        <Link
          href="/projects"
          className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-90"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
