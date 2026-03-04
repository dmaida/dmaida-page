import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag} — Dom Maida Blog` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-1 text-sm uppercase tracking-widest text-zinc-500">
          Tag
        </p>
        <h1 className="text-4xl font-bold text-white">#{tag}</h1>
        <p className="mt-2 text-zinc-400">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
