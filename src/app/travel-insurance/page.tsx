import Link from "next/link";
import { NewsletterCta } from "@/components/sections";

const coverageAreas = [
  {
    title: "Medical cover that is actually usable",
    copy:
      "The right plan is not only about visa paperwork. It is about emergency treatment, hospital quality, evacuation ceilings, and what happens when a trip stops being routine.",
  },
  {
    title: "Trip disruption and missed connections",
    copy:
      "Indian travelers connecting through multiple airports need clearer protection around delays, baggage friction, and rebooking costs when long itineraries go sideways.",
  },
  {
    title: "Policy wording and exclusions",
    copy:
      "The real difference between useful and useless insurance usually lives in the exclusions, not in the headline premium or the marketing copy.",
  },
];

const useCases = [
  "Schengen visa applications",
  "Premium short-haul leisure trips",
  "Multi-country itineraries",
  "Longer remote-work stays",
];

export default function TravelInsurancePage() {
  return (
    <main>
      <section className="bg-transparent pb-16 pt-16">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
            <div className="space-y-6">
              <span className="pill-eyebrow">Travel Insurance Intelligence</span>
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
                Insurance guidance for Indian travelers who want fewer blind spots.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-brand-space/62">
                This route is being developed into a stronger comparison layer for
                insurance, but the editorial direction is already straightforward:
                focus on clauses, limits, exclusions, and actual claim usefulness,
                not just price tables.
              </p>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-brand-space px-7 py-9 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:px-9">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-light">
                Best Use Cases
              </p>
              <div className="mt-5 grid gap-3">
                {useCases.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-base leading-7 text-white/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent pb-24">
        <div className="container-site">
          <div className="rounded-[38px] border border-brand-space/6 bg-white/82 px-6 py-10 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="pill-eyebrow">What Matters Most</span>
                <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                  Read the clauses before you read the premium.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-brand-space/58">
                This section is being built to help readers compare plans more intelligently,
                especially for visas, long-haul travel, and trips where the fine print matters more than expected.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {coverageAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-[28px] border border-brand-space/6 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
                >
                  <h3 className="text-2xl font-bold tracking-[-0.03em] text-brand-space">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-brand-space/60">
                    {area.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/blog" className="button-primary text-label-sm">
                Read Insurance Articles
              </Link>
              <Link href="/newsletter" className="button-ghost text-label-sm">
                Get Weekly Updates
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterCta
        title="Follow The Insurance Build"
        copy="The insurance section is being expanded into a sharper comparison layer. Join the Travel Brief to track new guides and updates."
      />
    </main>
  );
}
