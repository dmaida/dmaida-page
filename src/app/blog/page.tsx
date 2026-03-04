import type { Metadata } from "next";
import { getAllPostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog — Dom Maida",
  description: "Thoughts on software, tooling, and self-hosted infrastructure.",
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Blog</h1>
        <p className="text-zinc-400">
          Thoughts on software, tooling, and self-hosted infrastructure.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-zinc-500">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
