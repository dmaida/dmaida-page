"use client";

import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code to clipboard"}
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300 opacity-0 backdrop-blur transition hover:bg-zinc-700 hover:text-white focus:opacity-100 group-hover:opacity-100"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm sm:p-4"
        {...props}
      />
    </div>
  );
}
