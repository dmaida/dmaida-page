import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { profile } from "@/data/profile";
import { getAllPostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const recentPosts = getAllPostMeta().slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-center justify-center gap-6 pt-8 text-center">
      <Image
        src={profile.avatar}
        alt={profile.name}
        width={180}
        height={180}
        className="rounded-full ring-2 ring-zinc-700"
        priority
      />
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
        <Link
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faLinkedin} className="size-4" />
          LinkedIn
        </Link>
      </div>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Latest Writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.frontmatter.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
