import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold text-white" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-2xl font-semibold text-white" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold text-white" {...props} />
  ),
  p: (props) => <p className="mb-4 leading-7 text-zinc-300" {...props} />,
  a: ({ href = "#", ...props }) => (
    <Link
      href={href}
      className="text-white underline underline-offset-4 hover:text-zinc-300"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-300"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 ml-6 list-disc space-y-1 text-zinc-300" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-1 text-zinc-300"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-zinc-700 pl-4 italic text-zinc-400"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-zinc-800" />,
};
