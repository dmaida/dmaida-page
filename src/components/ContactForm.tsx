"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { status: null, message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-800 bg-green-950/40 px-6 py-5 text-green-400">
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {state.status === "error" && (
        <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-zinc-300">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-zinc-300">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
      <p className="text-xs text-zinc-600">
        Provide at least one of email or phone.
      </p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-zinc-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
          placeholder="What's on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
