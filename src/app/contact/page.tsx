import type { Metadata } from "next";
import { profile } from "@/data/profile";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Daniel Maida",
};

const socialLinks = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Get in Touch</h1>
        <p className="text-zinc-400">
          Leave your contact info and I&apos;ll reach out to you.
        </p>
      </div>

      <ContactForm />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-zinc-300">
          Or find me on
        </h2>
        <div className="flex flex-col gap-3">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
            >
              <span className="font-semibold text-white">{label}</span>
              <span className="text-sm text-zinc-500">
                {href.replace("https://", "")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
