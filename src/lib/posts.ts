import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter, PostMeta } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPostMeta(): PostMeta[] {
  return getPostFiles()
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data } = matter(raw);
      return { frontmatter: data as PostFrontmatter };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllTags(): string[] {
  const all = getAllPostMeta().flatMap((p) => p.frontmatter.tags);
  return [...new Set(all)].sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostMeta().filter((p) => p.frontmatter.tags.includes(tag));
}
