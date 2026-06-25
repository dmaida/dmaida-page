import NyanCat from "./NyanCat";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-6 text-center text-sm text-zinc-500">
        <NyanCat />
        <p>
          &copy; {new Date().getFullYear()} Daniel Maida. Built with Next.js
          &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
