import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — Dom Maida`,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10">
        <p className="mb-2 text-sm text-zinc-500">{post.frontmatter.date}</p>
        <h1 className="text-4xl font-bold leading-tight text-white">
          {post.frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          {post.frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: "github-dark-dimmed", keepBackground: false },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
