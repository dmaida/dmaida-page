export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Daniel Maida. Built with Next.js &amp;
        Tailwind CSS.
      </div>
    </footer>
  );
}
