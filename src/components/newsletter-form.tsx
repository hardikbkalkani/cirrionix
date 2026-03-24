"use client";

import { FormEvent, useState } from "react";

type NewsletterFormProps = {
  dark?: boolean;
};

export function NewsletterForm({ dark = true }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-brand-teal/20 bg-brand-teal/10 px-6 py-5 text-left text-brand-teal">
        <p className="font-sans text-2xl font-extrabold text-white">Welcome aboard.</p>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Your next edition of the Travel Brief will be waiting in your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        className={`min-w-0 flex-1 rounded-full px-5 py-3.5 text-sm outline-none transition ${
          dark
            ? "border border-white/10 bg-white/8 text-white placeholder:text-white/30 focus:border-brand-teal"
            : "border border-black/8 bg-white text-brand-space placeholder:text-brand-space/35 focus:border-brand-teal"
        }`}
      />
      <button type="submit" className="button-primary whitespace-nowrap text-label-sm">
        Get Free Guide
      </button>
    </form>
  );
}
