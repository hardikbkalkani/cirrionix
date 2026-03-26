import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Article,
  CountryCard,
  ServiceCard,
  VisaStat,
  VisaTrend,
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
      return "bg-rose-100 text-rose-500";
    default:
      return "bg-brand-teal/15 text-brand-teal-dark";
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href || "#"}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-16 md:pb-24 md:pt-20">
      <div className="hero-glow absolute inset-0" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-8 py-10">
          <SectionEyebrow>India&apos;s Smartest Travel Guide</SectionEyebrow>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-balance text-6xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl lg:text-[7rem]">
              Travel <span className="gradient-text glow-text">Beyond</span>
              <br />
              the Ordinary.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-brand-space/65 md:text-xl">
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

          <div className="grid max-w-2xl gap-4 border-t border-brand-space/8 pt-8 sm:grid-cols-3">
            {homeStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sans text-3xl font-extrabold tracking-tight text-brand-space">
                  {stat.value}
                </p>
                <p className="mt-2 text-label-sm uppercase tracking-[0.18em] text-brand-space/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-[42px] border border-brand-space/8 bg-[radial-gradient(circle_at_top,_rgba(122,230,192,0.32),_transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,239,232,0.96))] shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_15%,rgba(122,230,192,0.1)_48%,transparent_85%)]" />
          <div className="absolute bottom-0 left-1/2 h-[86%] w-px -translate-x-1/2 bg-gradient-to-b from-brand-teal/0 via-brand-teal/65 to-brand-amber/0 blur-[1px]" />
          <div className="absolute bottom-0 left-[54%] h-[82%] w-[2px] -translate-x-1/2 rotate-[14deg] bg-gradient-to-t from-brand-teal/0 via-brand-teal/80 to-brand-teal/0 blur-[2px]" />
          <div className="absolute bottom-0 left-[46%] h-[72%] w-[2px] -translate-x-1/2 -rotate-[15deg] bg-gradient-to-t from-brand-amber/0 via-brand-amber/70 to-brand-amber/0 blur-[2px]" />
          <div className="absolute inset-x-10 bottom-10 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-brand-space/35">
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
    <section className="bg-transparent pb-24 pt-10">
      <div className="container-site">
        <div className="rounded-[40px] border border-brand-space/6 bg-white/80 px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-10 md:py-12 lg:px-14 lg:py-14">
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
                className="group rounded-[30px] border border-brand-space/6 bg-[#fffdf8] px-7 py-7 shadow-[0_18px_50px_rgba(44,48,60,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl text-brand-teal">{card.icon}</span>
                  <span className="rounded-full bg-brand-cloud px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal-dark">
                    {card.badge}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-brand-space transition-colors group-hover:text-brand-teal-dark">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-brand-space/60">{card.description}</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-teal-dark">{card.stat}</span>
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
    <section id="travel-brief" className="bg-transparent py-24">
      <div className="container-site">
        <div className="overflow-hidden rounded-[36px] border border-brand-space/8 bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.3),_transparent_42%),linear-gradient(135deg,#fffdf8_0%,#f6f2e8_45%,#eef7f2_100%)] px-7 py-10 shadow-[0_26px_70px_rgba(15,23,42,0.1)] md:px-12 md:py-14">
          <div className="max-w-3xl space-y-6">
            <SectionEyebrow>Free weekly intel</SectionEyebrow>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-brand-space md:text-6xl">
              {title.split("Travel Brief")[0]}
              <span className="gradient-text">Travel Brief</span>
            </h2>
            <p className="max-w-2xl text-base leading-8 text-brand-space/65 md:text-lg">{copy}</p>
            <div className="max-w-xl">
              <NewsletterForm dark={false} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-space/35">
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
    <section className="bg-transparent pb-14 pt-14 md:pb-20 md:pt-18">
      <div className="container-site">
        <div className="rounded-[36px] border border-brand-space/8 bg-[radial-gradient(circle_at_top,_rgba(122,230,192,0.18),_transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,239,232,1))] px-6 py-12 text-center shadow-[0_26px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-16">
          <SectionEyebrow>India passport intelligence</SectionEyebrow>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
            Indian Passport
            <br />
            Visa Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-brand-space/60">
            190+ countries. Visa-free, visa on arrival, e-Visa, and the context that helps you choose faster.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] border border-brand-space/8 bg-white/80 px-6 py-5 backdrop-blur-xl">
                <p className="font-sans text-3xl font-extrabold text-brand-teal-dark">{stat.value}</p>
                <p className="mt-2 text-label-sm uppercase tracking-[0.18em] text-brand-space/40">{stat.label}</p>
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
    <section className="bg-transparent py-8">
      <div className="container-site">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-brand-space">Trending Now</h2>
          <p className="mt-3 max-w-xl text-brand-space/55">
            The destinations Indian travelers are screening most aggressively right now.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {trends.map((trend, index) => (
            <article
              key={trend.name}
              className={`overflow-hidden rounded-[30px] border border-brand-space/6 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${
                index === 1
                  ? "md:col-span-2 md:grid md:grid-cols-[1.05fr,0.95fr] bg-[linear-gradient(135deg,#fbf4d8_0%,#eef6e8_50%,#fffdf8_100%)]"
                  : "bg-white/80"
              }`}
            >
              {index !== 1 ? (
                <div className="h-40 rounded-[24px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.2),_transparent_32%),linear-gradient(135deg,#f8fbf7_0%,#eef5ef_35%,#f4efe5_100%)]" />
              ) : null}
              <div
                className={
                  index === 1
                    ? "flex min-h-[240px] items-end rounded-[24px] bg-[linear-gradient(135deg,#fbf4d8_0%,#eef6e8_50%,#fffdf8_100%)] p-6"
                    : "mt-5"
                }
              >
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accentClasses(trend.accent)}`}>
                    {trend.status}
                  </span>
                  <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-brand-space">{trend.name}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-brand-space/60">{trend.blurb}</p>
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
    <section className="bg-transparent py-20">
      <div className="container-site">
        <div className="rounded-[36px] border border-brand-space/6 bg-white/80 px-6 py-10 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionEyebrow>Country matrix</SectionEyebrow>
              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-brand-space">Full Country List</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All Countries", "Visa-Free", "Visa on Arrival", "e-Visa", "Visa Required"].map((label, index) => (
                <span
                  key={label}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                    index === 0 ? "bg-brand-teal text-brand-space" : "border border-brand-space/8 bg-white/70 text-brand-space/55"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {countries.map((country) => (
              <article key={country.name} className="rounded-[24px] border border-brand-space/6 bg-[#fffdf8] px-5 py-5 text-brand-space shadow-[0_14px_40px_rgba(44,48,60,0.08)]">
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
    <section className="bg-transparent pb-14 pt-16 text-center">
      <div className="container-site">
        <SectionEyebrow>Editorial travel intelligence</SectionEyebrow>
        <h1 className="mx-auto mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-brand-space md:text-7xl">
          Travel Intel.
          <br />
          Zero Fluff.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-space/60">
          The Cirrionix journal covers visas, slow travel, insurance, and premium movement with an Indian lens.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Visa Guide", "Digital Nomad", "Travel Insurance", "Wellness"].map((pill) => (
            <span key={pill} className="rounded-full border border-brand-space/10 bg-white/70 px-5 py-3 text-label-sm text-brand-space/75">
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleGrid({ items }: { items: Article[] }) {
  if (!items.length) {
    return (
      <section className="bg-transparent pb-24">
        <div className="container-site">
          <div className="rounded-[34px] border border-brand-space/6 bg-white/85 p-8 text-brand-space shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
              Journal
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
              Posts are on the way.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-space/62">
              Connect your Sanity project or publish the first article to see the
              journal populate here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = items;

  return (
    <section className="bg-transparent pb-24">
      <div className="container-site space-y-8">
        <article className="rounded-[34px] border border-brand-space/6 bg-white/85 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr,1.05fr] md:items-center">
            <div className="rounded-[30px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.22),_transparent_35%),linear-gradient(135deg,#f8fbf7_0%,#eef5ef_35%,#f4efe5_100%)] p-8 text-brand-space">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal-dark">
                {featured.category}
              </span>
              <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em]">{featured.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-brand-space/62">{featured.excerpt}</p>
            </div>
            <div>
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">{featured.publishedAt}</p>
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
            <article key={article.slug} className="rounded-[28px] border border-brand-space/6 bg-white/80 p-6 text-brand-space shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <div className="rounded-[24px] bg-[radial-gradient(circle_at_top_left,_rgba(122,230,192,0.18),_transparent_35%),linear-gradient(135deg,#f8fbf7_0%,#eef5ef_35%,#f4efe5_100%)] px-5 py-10" />
              <span className={`mt-5 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accentClasses(article.accent)}`}>
                {article.category}
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em]">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-space/58">{article.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-brand-space/38">
                <span>{article.author}</span>
                <span>{article.readingTime}</span>
              </div>
              <Link href={`/blog/${article.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-teal-dark transition-colors hover:text-brand-teal">
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
    <section className="bg-transparent pb-14 pt-16">
      <div className="container-site">
        <div className="max-w-5xl">
          <span className={`inline-flex rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${accentClasses(article.accent)}`}>
            {article.category}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.05em] text-brand-space md:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-space/58">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap gap-5 text-label-sm uppercase tracking-[0.18em] text-brand-space/35">
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

export function ArticleBody({
  article,
  related = [],
}: {
  article: Article;
  related?: Article[];
}) {

  return (
    <section className="bg-transparent pb-24">
      <div className="container-site grid gap-10 xl:grid-cols-[minmax(0,1fr),320px]">
        <article className="rounded-[34px] border border-brand-space/6 bg-white/85 px-7 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-12 md:py-14">
          <div className="prose-cirrionix mx-auto max-w-3xl">
            {article.body?.length ? (
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            ) : (
              article.sections.map((section) => (
                <section key={section.heading} className="mt-12 first:mt-0">
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))
            )}
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-[30px] border border-brand-space/6 bg-white/80 p-6 text-brand-space shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">Travel Brief</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em]">Get the next dispatch.</h2>
            <p className="mt-3 text-sm leading-7 text-brand-space/58">
              Policy changes, route signals, and editorial travel insight in one weekly note.
            </p>
            <div className="mt-6">
              <NewsletterForm dark={false} />
            </div>
          </div>

          <div className="rounded-[30px] border border-brand-space/6 bg-white/80 p-6 text-brand-space shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <p className="text-label-sm uppercase tracking-[0.18em] text-brand-space/35">Keep exploring</p>
            {related.length ? (
              <div className="mt-5 space-y-5">
                {related.map((entry) => (
                  <Link key={entry.slug} href={`/blog/${entry.slug}`} className="block rounded-[22px] border border-brand-space/6 bg-[#fffdf8] p-4 transition-colors hover:bg-brand-cloud">
                    <p className="text-sm uppercase tracking-[0.18em] text-brand-teal-dark">{entry.category}</p>
                    <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-brand-space">{entry.title}</h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-7 text-brand-space/58">
                Publish a few more articles in Sanity and related reads will show up here automatically.
              </p>
            )}
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
    <main className="bg-transparent py-24">
      <div className="container-site">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-brand-space/6 bg-white/80 px-7 py-12 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-12 md:py-16">
          <SectionEyebrow>Next build phase</SectionEyebrow>
          <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] text-brand-space md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-space/58">{description}</p>
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
