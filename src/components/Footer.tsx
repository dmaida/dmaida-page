export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-6 py-6 text-center text-sm text-zinc-500">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          Daniel Maida. Built with Next.js &amp; Tailwind CSS.
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sleepy-cat.webp"
          alt=""
          aria-hidden="true"
          className="h-10 w-10 shrink-0 [image-rendering:pixelated]"
        />
      </div>
    </footer>
  );
}
