import Link from "next/link";
import type { PostMeta } from "@/types/post";

export default function PostCard({ post }: { post: PostMeta }) {
  const { frontmatter: fm } = post;
  return (
    <Link
      href={`/blog/${fm.slug}`}
      className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{fm.title}</h3>
        <time className="shrink-0 text-xs text-zinc-500">{fm.date}</time>
      </div>
      <p className="text-sm text-zinc-400">{fm.description}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {fm.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
