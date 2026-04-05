import Link from "next/link";
import { NewsletterCta } from "@/components/sections";

const hubSignals = [
  {
    city: "Chiang Mai",
    angle: "Low-friction long stays",
    copy:
      "A strong entry point for remote workers who want affordability, community, and a gentler pace before jumping into more complex hubs.",
  },
  {
    city: "Bali",
    angle: "Community-heavy lifestyle play",
    copy:
      "Best for travelers who care about atmosphere, co-working density, and a more social version of the remote-work routine.",
  },
  {
    city: "Dubai",
    angle: "Premium fast-entry base",
    copy:
      "Useful for founders, consultants, and short-stay professionals who want efficiency, air connectivity, and cleaner infrastructure.",
  },
];

const filters = [
  "Visa and stay practicality",
  "Internet and work routine",
  "Monthly cost realism",
  "Community and livability",
];

export default function DigitalNomadPage() {
  return (
    <main>
      <section className="bg-transparent pb-16 pt-16">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
            <div className="space-y-6">
              <span className="pill-eyebrow">Digital Nomad Hubs</span>
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
                Where Indian remote workers can actually stay, work, and sustain the routine.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-brand-space/62">
                This section is being developed into a proper city-by-city guide,
                but the core direction is already clear: rank hubs by visa
                practicality, cost realism, internet quality, and how livable they
                feel once the honeymoon period ends.
              </p>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.2),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,239,232,0.94))] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                How We Rank
              </p>
              <div className="mt-5 grid gap-3">
                {filters.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-brand-space/6 bg-white/72 px-4 py-4 text-base leading-7 text-brand-space/66"
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
                <span className="pill-eyebrow">Early Hub Signals</span>
                <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                  The first cities that matter.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-brand-space/58">
                This is the early editorial frame for the section, not the full database.
                The goal is to help you see the direction before we build the deeper comparison layers.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {hubSignals.map((hub) => (
                <article
                  key={hub.city}
                  className="rounded-[28px] border border-brand-space/6 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
                >
                  <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                    {hub.angle}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-brand-space">
                    {hub.city}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-space/60">
                    {hub.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/blog" className="button-primary text-label-sm">
                Read Related Journal Posts
              </Link>
              <Link href="/visa-guide" className="button-ghost text-label-sm">
                Explore Visa Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterCta
        title="Follow The Next Nomad Guides"
        copy="We will keep building this route into a proper decision layer for Indian remote workers. Join the Travel Brief to follow the rollout."
      />
    </main>
  );
}
