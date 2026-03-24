import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Article,
  CountryCard,
  ServiceCard,
  VisaStat,
  VisaTrend,
  articles,
  homeStats,
  serviceCards,
} from "@/lib/site-data";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <span className="pill-eyebrow">{children}</span>;
}

function accentClasses(accent: string) {
  switch (accent) {
    case "amber":
      return "bg-brand-amber/15 text-brand-amber";
    case "rose":
      return "bg-rose-400/15 text-rose-300";
    default:
      return "bg-brand-teal/15 text-brand-teal";
  }
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-space pb-16 pt-16 md:pb-24 md:pt-20">
      <div className="hero-glow absolute inset-0" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-8 py-10">
          <SectionEyebrow>India&apos;s Smartest Travel Guide</SectionEyebrow>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-balance text-6xl font-extrabold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl lg:text-[7rem]">
              Travel <span className="gradient-text glow-text">Beyond</span>
              <br />
              the Ordinary.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/58 md:text-xl">
              A premium travel intelligence layer built for Indian travelers navigating visas, long stays, and ambitious movement.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/visa-guide" className="button-primary text-label-sm">
              Explore Visa Guides
            </Link>
            <Link href="/blog" className="button-ghost text-label-sm">
              Read The Journal
            </Link>
          </div>

          <div className="grid max-w-2xl gap-4 border-t border-white/8 pt-8 sm:grid-cols-3">
            {homeStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sans text-3xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-label-sm uppercase tracking-[0.18em] text-white/35">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-[42px] border border-white/6 bg-[radial-gradient(circle_at_top,_rgba(122,230,192,0.22),_transparent_45%),linear-gradient(180deg,rgba(17,24,39,0.7),rgba(6,10,21,0.96))] shadow-teal-glow">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_15%,rgba(122,230,192,0.06)_48%,transparent_85%)]" />
          <div className="absolute bottom-0 left-1/2 h-[86%] w-px -translate-x-1/2 bg-gradient-to-b from-brand-teal/0 via-brand-teal/65 to-brand-amber/0 blur-[1px]" />
          <div className="absolute bottom-0 left-[54%] h-[82%] w-[2px] -translate-x-1/2 rotate-[14deg] bg-gradient-to-t from-brand-teal/0 via-brand-teal/80 to-brand-teal/0 blur-[2px]" />
          <div className="absolute bottom-0 left-[46%] h-[72%] w-[2px] -translate-x-1/2 -rotate-[15deg] bg-gradient-to-t from-brand-amber/0 via-brand-amber/70 to-brand-amber/0 blur-[2px]" />
          <div className="absolute inset-x-10 bottom-10 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/25">
            <span>Celestial routes</span>
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceGridSection({
  intro = "Comprehensive travel services designed to take you beyond the ordinary.",
  cards = serviceCards,
}: {
  intro?: string;
  cards?: ServiceCard[];
}) {
  return (
    <section className="bg-brand-space pb-24 pt-10">
      <div className="container-site">
        <div className="rounded-[40px] bg-brand-cloud px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.15fr,0.85fr] md:items-end">
            <div className="space-y-5">
              <SectionEyebrow>What we cover</SectionEyebrow>
              <h2 className="max-w-3xl text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-brand-space md:text-6xl">
                Built for the <span className="gradient-text">Indian Traveler.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-8 text-brand-space/60">{intro}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-[30px] bg-white px-7 py-7 shadow-[0_18px_50px_rgba(44,48,60,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl text-brand-teal">{card.icon}</span>
                  <span className="rounded-full bg-brand-cloud px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    {card.badge}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-brand-space transition-colors group-hover:text-brand-teal-dark">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-brand-space/60">{card.description}</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-teal">{card.stat}</span>
                  <span className="text-xl text-brand-teal transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterCta({
  title = "The Cirrionix Travel Brief",
  copy = "Visa changes, nomad visa launches, destination shifts, and practical travel signals every Tuesday.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section id="travel-brief" className="bg-brand-space py-24">
      <div className="container-site">
        <div className="overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.25),_transparent_42%),linear-gradient(135deg,#1a2332_0%,#111723_45%,#232520_100%)] px-7 py-10 md:px-12 md:py-14">
          <div className="max-w-3xl space-y-6">
            <SectionEyebrow>Free weekly intel</SectionEyebrow>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-white md:text-6xl">
              {title.split("Travel Brief")[0]}
              <span className="gradient-text">Travel Brief</span>
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/60 md:text-lg">{copy}</p>
            <div className="max-w-xl">
              <NewsletterForm />
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/28">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisaGuideHero({ stats }: { stats: VisaStat[] }) {
  return (
    <section className="bg-brand-space pb-14 pt-14 md:pb-20 md:pt-18">
      <div className="container-site">
        <div className="rounded-[36px] bg-[radial-gradient(circle_at_top,_rgba(122,230,192,0.14),_transparent_45%),linear-gradient(180deg,rgba(22,27,46,0.98),rgba(11,15,26,1))] px-6 py-12 text-center shadow-teal-sm md:px-10 md:py-16">
          <SectionEyebrow>India passport intelligence</SectionEyebrow>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
            Indian Passport
            <br />
            Visa Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/58">
            190+ countries. Visa-free, visa on arrival, e-Visa, and the context that helps you choose faster.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] bg-white/6 px-6 py-5 backdrop-blur-xl">
                <p className="font-sans text-3xl font-extrabold text-brand-teal">{stat.value}</p>
                <p className="mt-2 text-label-sm uppercase tracking-[0.18em] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisaTrendSection({ trends }: { trends: VisaTrend[] }) {
  return (
    <section className="bg-brand-space py-8">
      <div className="container-site">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-white">Trending Now</h2>
          <p className="mt-3 max-w-xl text-white/50">
            The destinations Indian travelers are screening most aggressively right now.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {trends.map((trend, index) => (
            <article
              key={trend.name}
              className={`overflow-hidden rounded-[30px] p-6 ${
                index === 1
                  ? "md:col-span-2 md:grid md:grid-cols-[1.05fr,0.95fr]"
                  : "bg-brand-space-soft"
              } ${index === 1 ? "bg-[linear-gradient(135deg,#5b6f17_0%,#283b28_50%,#141d1a_100%)]" : ""}`}
            >
              {index !== 1 ? (
                <div className="h-40 rounded-[24px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.18),_transparent_32%),linear-gradient(135deg,#1f2c3f_0%,#172332_35%,#12222f_100%)]" />
              ) : null}
              <div className={index === 1 ? "flex min-h-[240px] items-end rounded-[24px] bg-[linear-gradient(135deg,#5b6f17_0%,#283b28_50%,#141d1a_100%)] p-6" : "mt-5"}>
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accentClasses(trend.accent)}`}>
                    {trend.status}
                  </span>
                  <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white">{trend.name}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/60">{trend.blurb}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CountryGridSection({ countries }: { countries: CountryCard[] }) {
  return (
    <section className="bg-brand-space py-20">
      <div className="container-site">
        <div className="rounded-[36px] bg-brand-space-soft px-6 py-10 md:px-10 md:py-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionEyebrow>Country matrix</SectionEyebrow>
              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-white">Full Country List</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All Countries", "Visa-Free", "Visa on Arrival", "e-Visa", "Visa Required"].map((label, index) => (
                <span
                  key={label}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                    index === 0 ? "bg-brand-teal text-brand-space" : "bg-white/5 text-white/50"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {countries.map((country) => (
              <article key={country.name} className="rounded-[24px] bg-white px-5 py-5 text-brand-space shadow-[0_14px_40px_rgba(44,48,60,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl">{country.flag}</span>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accentClasses(country.accent)}`}>
                    {country.status}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.03em]">{country.name}</h3>
                <p className="mt-2 text-sm text-brand-space/55">{country.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogListingHero() {
  return (
    <section className="bg-brand-space pb-14 pt-16 text-center">
      <div className="container-site">
        <SectionEyebrow>Editorial travel intelligence</SectionEyebrow>
        <h1 className="mx-auto mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
          Travel Intel.
          <br />
          Zero Fluff.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">
          The Cirrionix journal covers visas, slow travel, insurance, and premium movement with an Indian lens.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Visa Guide", "Digital Nomad", "Travel Insurance", "Wellness"].map((pill) => (
            <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-label-sm">
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleGrid({ items = articles }: { items?: Article[] }) {
  const [featured, ...rest] = items;

  return (
    <section className="bg-brand-space pb-24">
      <div className="container-site space-y-8">
        <article className="rounded-[34px] bg-brand-cloud p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr,1.05fr] md:items-center">
            <div className="rounded-[30px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.18),_transparent_35%),linear-gradient(135deg,#1f2c3f_0%,#182230_35%,#101621_100%)] p-8 text-white">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {featured.category}
              </span>
              <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em]">{featured.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/62">{featured.excerpt}</p>
            </div>
            <div>
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal">{featured.publishedAt}</p>
              <p className="mt-4 text-base leading-8 text-brand-space/65">
                {featured.excerpt} This piece is designed as a practical blueprint rather than a trend recap.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-brand-space/55">
                <span>{featured.author}</span>
                <span>{featured.readingTime}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="button-primary mt-8 inline-flex text-label-sm">
                Read Feature
              </Link>
            </div>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((article) => (
            <article key={article.slug} className="rounded-[28px] bg-brand-space-soft p-6 text-white">
              <div className="rounded-[24px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.14),_transparent_35%),linear-gradient(135deg,#1f2c3f_0%,#182230_35%,#101621_100%)] px-5 py-10" />
              <span className={`mt-5 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accentClasses(article.accent)}`}>
                {article.category}
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em]">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/58">{article.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-white/38">
                <span>{article.author}</span>
                <span>{article.readingTime}</span>
              </div>
              <Link href={`/blog/${article.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-teal transition-colors hover:text-brand-teal-light">
                Open article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="bg-brand-space pb-14 pt-16">
      <div className="container-site">
        <div className="max-w-5xl">
          <span className={`inline-flex rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${accentClasses(article.accent)}`}>
            {article.category}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.05em] text-white md:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap gap-5 text-label-sm uppercase tracking-[0.18em] text-white/35">
            <span>{article.author}</span>
            <span>{article.role}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleBody({ article }: { article: Article }) {
  const related = articles.filter((entry) => entry.slug !== article.slug).slice(0, 2);

  return (
    <section className="bg-brand-space pb-24">
      <div className="container-site grid gap-10 xl:grid-cols-[minmax(0,1fr),320px]">
        <article className="rounded-[34px] bg-brand-cloud px-7 py-10 md:px-12 md:py-14">
          <div className="prose-cirrionix mx-auto max-w-3xl">
            {article.sections.map((section) => (
              <section key={section.heading} className="mt-12 first:mt-0">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-[30px] bg-brand-space-soft p-6 text-white">
            <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal">Travel Brief</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em]">Get the next dispatch.</h2>
            <p className="mt-3 text-sm leading-7 text-white/58">
              Policy changes, route signals, and editorial travel insight in one weekly note.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          <div className="rounded-[30px] bg-brand-space-soft p-6 text-white">
            <p className="text-label-sm uppercase tracking-[0.18em] text-white/35">Keep exploring</p>
            <div className="mt-5 space-y-5">
              {related.map((entry) => (
                <Link key={entry.slug} href={`/blog/${entry.slug}`} className="block rounded-[22px] bg-white/5 p-4 transition-colors hover:bg-white/8">
                  <p className="text-sm uppercase tracking-[0.18em] text-brand-teal">{entry.category}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-white">{entry.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="bg-brand-space py-24">
      <div className="container-site">
        <div className="mx-auto max-w-4xl rounded-[36px] bg-brand-space-soft px-7 py-12 text-center md:px-12 md:py-16">
          <SectionEyebrow>Next build phase</SectionEyebrow>
          <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] text-white md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/visa-guide" className="button-primary text-label-sm">
              Explore Visa Guide
            </Link>
            <Link href="/blog" className="button-ghost text-label-sm">
              Read The Journal
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
