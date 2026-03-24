import { NewsletterCta } from "@/components/sections";

export default function NewsletterPage() {
  return (
    <main className="bg-brand-space py-20">
      <NewsletterCta
        title="The Cirrionix Travel Brief"
        copy="A weekly note on visas, route shifts, destination signals, and the premium travel decisions worth your attention."
      />
    </main>
  );
}
