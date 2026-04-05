import Link from "next/link";
import { NewsletterCta } from "@/components/sections";
import { getBlogArticles } from "@/lib/blog";
import { visaStats, visaTrends } from "@/lib/site-data";

const workflow = [
  {
    step: "01",
    title: "Choose by entry friction",
    copy:
      "Start with whether a destination is visa-free, e-Visa, visa on arrival, or fully pre-approved. This changes everything about how fast a trip can become real.",
  },
  {
    step: "02",
    title: "Match the trip to the paperwork",
    copy:
      "A quick tropical break, a long stay, and a multi-country Europe summer all demand different document discipline. The right destination is the one that fits your actual trip style.",
  },
  {
    step: "03",
    title: "Use editorial context, not just lists",
    copy:
      "The point is not only to know whether entry is possible. The point is to understand where planning is smooth, where scrutiny is higher, and where effort is worth it.",
  },
];

const destinationSignals = [
  {
    name: "Thailand",
    status: "Visa Free",
    summary: "Best for fast short-haul trips with low entry friction and strong value.",
    note: "Ideal if you want speed, familiarity, and high flight availability from India.",
  },
  {
    name: "Vietnam",
    status: "e-Visa",
    summary: "High-signal pick for food, cities, coast, and affordable longer itineraries.",
    note: "Strong fit for travelers who want editorial depth, not just beach escape energy.",
  },
  {
    name: "Dubai",
    status: "e-Visa",
    summary: "Best for premium short trips, event travel, and fast urban resets.",
    note: "Useful when convenience matters more than stretch-the-budget travel.",
  },
  {
    name: "Mauritius",
    status: "Visa-Free",
    summary: "One of the cleanest island-entry options for Indian passport holders.",
    note: "Good for honeymoon, resort-led, or premium relaxation planning.",
  },
  {
    name: "Japan",
    status: "e-Visa",
    summary: "High-demand route with stronger planning payoff once timing is right.",
    note: "Better for deliberate travelers who book around season and structure.",
  },
  {
    name: "Schengen Europe",
    status: "Visa Required",
    summary: "Still a worthwhile route, but only with earlier preparation and cleaner documentation.",
    note: "This is where organization matters more than inspiration.",
  },
];

export default async function VisaGuidePage() {
  const blogArticles = await getBlogArticles();
  const visaArticles = blogArticles
    .filter((article) => {
      const slug = article.slug.toLowerCase();
      const title = article.title.toLowerCase();
      const category = article.category.toLowerCase();

      return (
        category.includes("visa") ||
        slug.includes("visa") ||
        title.includes("visa")
      );
    })
    .slice(0, 3);

  return (
    <main>
      <section className="bg-transparent pb-14 pt-16 md:pb-20 md:pt-18">
        <div className="container-site">
          <div className="rounded-[38px] border border-brand-space/8 bg-[radial-gradient(circle_at_top,_rgba(122,230,192,0.18),_transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.97),rgba(241,239,232,1))] px-6 py-12 shadow-[0_26px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
              <div>
                <span className="pill-eyebrow">India Passport Intelligence</span>
                <h1 className="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
                  Visa planning for Indian travelers, redesigned around clarity.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-space/60">
                  This route is evolving into Cirrionix&apos;s decision hub for
                  country access, planning friction, and better destination
                  shortlists. Start with what is easiest, what is worth the
                  paperwork, and what is moving fastest right now.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/blog" className="button-primary text-label-sm">
                    Read Visa Stories
                  </Link>
                  <Link href="/newsletter" className="button-ghost text-label-sm">
                    Get Weekly Updates
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {visaStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-brand-space/8 bg-white/82 px-5 py-5 backdrop-blur-xl"
                  >
                    <p className="font-sans text-3xl font-extrabold text-brand-teal-dark">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-label-sm uppercase tracking-[0.18em] text-brand-space/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent pb-20">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[36px] border border-brand-space/6 bg-white/82 px-7 py-9 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-10">
              <span className="pill-eyebrow">How To Use This Guide</span>
              <h2 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                Think like a shortlist, not like a passport spreadsheet.
              </h2>
              <div className="mt-8 space-y-4">
                {workflow.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-[24px] border border-brand-space/6 bg-[#fffdf8] px-5 py-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-xs font-bold tracking-[0.14em] text-brand-teal-dark">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-brand-space">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-brand-space/60">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[36px] border border-brand-space/6 bg-brand-space px-7 py-9 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:px-10 md:py-10">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-light">
                Right Now
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em]">
                The strongest near-term routes for Indian travelers.
              </h2>
              <div className="mt-8 space-y-4">
                {visaTrends.slice(0, 3).map((trend) => (
                  <div
                    key={trend.name}
                    className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.03em]">
                        {trend.name}
                      </h3>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal-light">
                        {trend.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {trend.blurb}
                    </p>
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
                <span className="pill-eyebrow">Destination Signals</span>
                <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                  Start with routes that are actually moving.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-brand-space/58">
                This is not the full database yet. It is a tighter set of high-interest
                directions that help frame what is easy, what is premium, and what
                needs more planning discipline.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {destinationSignals.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[28px] border border-brand-space/6 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
                >
                  <span className="inline-flex rounded-full bg-brand-teal/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal-dark">
                    {item.status}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-brand-space">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-space/62">
                    {item.summary}
                  </p>
                  <div className="mt-5 rounded-[20px] border border-brand-space/6 bg-white/75 px-4 py-4">
                    <p className="text-sm leading-7 text-brand-space/56">
                      {item.note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {visaArticles.length ? (
        <section className="bg-transparent pb-24">
          <div className="container-site">
            <div className="rounded-[38px] border border-brand-space/6 bg-white/82 px-6 py-10 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="pill-eyebrow">Related Visa Reads</span>
                  <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-brand-space md:text-5xl">
                    Visa stories from the journal.
                  </h2>
                </div>
                <Link href="/blog" className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                  View all journal posts
                </Link>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visaArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="rounded-[28px] border border-brand-space/6 bg-[#fffdf8] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="inline-flex rounded-full bg-brand-teal/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal-dark">
                      {article.category}
                    </span>
                    <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-brand-space">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-space/60">
                      {article.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm text-brand-space/42">
                      <span>{article.publishedAt}</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <NewsletterCta
        title="Get Visa Updates Before The Rush"
        copy="We track policy shifts, faster-entry destinations, and planning changes that matter for Indian travelers."
      />
    </main>
  );
}
