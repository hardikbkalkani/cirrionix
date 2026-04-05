import Link from "next/link";
import { NewsletterCta } from "@/components/sections";

const principles = [
  {
    title: "Indian Lens, Global Movement",
    copy:
      "Cirrionix is built around the actual decisions Indian travelers make: where approval odds are strongest, where paperwork gets heavy, and where a destination is genuinely worth the effort.",
  },
  {
    title: "Editorial Before Hype",
    copy:
      "We are not trying to win with noise. The goal is to publish high-signal travel guidance that feels considered, practical, and worth returning to when plans get real.",
  },
  {
    title: "Build Public, Improve Fast",
    copy:
      "The site is being shaped section by section. We would rather make each route sharper over time than launch a wide site full of filler.",
  },
];

const roadmap = [
  "Visa intelligence that helps Indian travelers shortlist destinations faster.",
  "Editorial travel stories that combine practical clarity with stronger brand taste.",
  "Next-wave sections for digital nomad hubs, insurance, and slow-travel planning.",
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-transparent pb-16 pt-16 md:pb-20">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="space-y-6">
              <span className="pill-eyebrow">About Cirrionix</span>
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
                A travel publication being built for sharper decisions.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-brand-space/62">
                Cirrionix is an evolving editorial travel platform for Indian
                travelers who want clarity before they book, move, or apply. The
                focus is not maximum content. The focus is better signal.
              </p>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.22),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,239,232,0.92))] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                Why it exists
              </p>
              <p className="mt-4 text-base leading-8 text-brand-space/62">
                Too much travel content is either generic, recycled, or written
                without an Indian traveler&apos;s constraints in mind. Cirrionix is
                an attempt to build something calmer, more premium, and more
                decision-useful.
              </p>
              <div className="mt-8 grid gap-3">
                <div className="rounded-[22px] border border-brand-space/6 bg-white/70 px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-space/45">
                    Core themes
                  </p>
                  <p className="mt-2 text-base leading-7 text-brand-space">
                    Visas, editorial travel intelligence, route selection, long
                    stays, and practical travel planning.
                  </p>
                </div>
                <div className="rounded-[22px] border border-brand-space/6 bg-white/70 px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-space/45">
                    Current build
                  </p>
                  <p className="mt-2 text-base leading-7 text-brand-space">
                    The journal and visa guide are live. The rest of the product
                    is being designed gradually instead of rushed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent pb-24">
        <div className="container-site">
          <div className="rounded-[40px] border border-brand-space/6 bg-white/82 px-6 py-10 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
            <div className="grid gap-8 md:grid-cols-3">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-brand-space/6 bg-[#fffdf8] p-6"
                >
                  <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                    Principle
                  </p>
                  <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-brand-space">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-brand-space/60">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent pb-24">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
            <div className="rounded-[36px] border border-brand-space/6 bg-[linear-gradient(135deg,#fffdf8_0%,#f5f1e7_100%)] px-7 py-9 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-10">
              <span className="pill-eyebrow">Where We Are Going</span>
              <h2 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                Build depth where travelers actually feel uncertainty.
              </h2>
              <div className="mt-8 space-y-4">
                {roadmap.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[22px] border border-brand-space/6 bg-white/72 px-4 py-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-xs font-bold text-brand-teal-dark">
                      0{index + 1}
                    </span>
                    <p className="text-base leading-7 text-brand-space/66">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-brand-space px-7 py-9 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:px-10 md:py-10">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-light">
                Start Here
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em]">
                Explore the strongest parts of the site first.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/72">
                If you are new to Cirrionix, the best entry points right now are
                the visa guide and the journal. That is where the clearest
                product signal already exists.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/visa-guide" className="button-primary text-label-sm">
                  Explore Visa Guide
                </Link>
                <Link
                  href="/blog"
                  className="button-ghost border-white/15 bg-white/10 text-label-sm text-white hover:text-brand-teal-light"
                >
                  Read The Journal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterCta
        title="Follow The Cirrionix Build"
        copy="Get the weekly note as we expand the journal, sharpen the visa guide, and design the next routes with more intention."
      />
    </main>
  );
}
