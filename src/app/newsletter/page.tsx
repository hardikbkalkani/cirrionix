import { NewsletterCta } from "@/components/sections";

const highlights = [
  "Visa-policy shifts that change planning speed",
  "New journal posts and high-signal routes",
  "Editorial notes on destinations, timing, and friction",
];

export default function NewsletterPage() {
  return (
    <main>
      <section className="bg-transparent pb-16 pt-16">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="space-y-6">
              <span className="pill-eyebrow">The Travel Brief</span>
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
                A weekly note on movement, visas, and better travel decisions.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-brand-space/62">
                The Travel Brief is where Cirrionix collects the smaller but more useful
                signals: route changes, destination shifts, editorial picks, and planning
                updates worth catching before a trip becomes urgent.
              </p>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.18),_transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,239,232,0.92))] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                What You Get
              </p>
              <div className="mt-5 grid gap-3">
                {highlights.map((item) => (
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

      <NewsletterCta
        title="Join The Cirrionix Travel Brief"
        copy="A quieter, higher-signal note on visa changes, destination momentum, and the next routes Cirrionix is building."
      />
    </main>
  );
}
