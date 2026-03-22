"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─── Nav ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-space/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="container-site h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="#5DCAA5" strokeWidth="1.2" opacity="0.3" />
            <path d="M14 26 Q20 14 26 18 Q32 22 38 14" stroke="#5DCAA5" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M12 32 Q18 20 26 24 Q34 28 40 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
            <circle cx="26" cy="26" r="3" fill="#5DCAA5" />
            <circle cx="14" cy="26" r="2" fill="#5DCAA5" opacity="0.5" />
          </svg>
          <span
            className="text-white font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            CIRRI<span className="text-brand-teal">ON</span>IX
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Destinations", "Visa Guide", "Digital Nomad", "Travel Insurance", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/70 hover:text-brand-teal text-sm font-medium transition-colors duration-200 link-underline"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/newsletter"
            className="px-4 py-2 rounded-full text-sm font-semibold text-brand-space bg-brand-teal hover:bg-brand-teal-light transition-colors duration-200"
          >
            Get Free Guide
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-space border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {["Destinations", "Visa Guide", "Digital Nomad", "Travel Insurance", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/70 hover:text-brand-teal text-sm font-medium py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="mt-2 px-4 py-2.5 rounded-full text-sm font-semibold text-brand-space bg-brand-teal text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Free Guide
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-space)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(93,202,165,0.1) 0%, transparent 60%)" }}
      />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-brand-teal opacity-20 animate-pulse-teal"
          style={{
            width: `${[4,6,3,5,4,6][i]}px`,
            height: `${[4,6,3,5,4,6][i]}px`,
            top: `${[20,45,70,30,80,55][i]}%`,
            left: `${[15,75,25,85,10,60][i]}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="container-site relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="badge badge-dark mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block" />
            India&apos;s Smartest Travel Guide
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            Travel{" "}
            <span className="gradient-text">Beyond</span>
            <br />
            the Ordinary.
          </h1>

          {/* Sub */}
          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 animate-fade-up delay-200" style={{ lineHeight: 1.7 }}>
            Visa guides, digital nomad hubs, and travel intel built specifically
            for the Indian passport. Real numbers, zero fluff.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
            <Link
              href="/visa-guide"
              className="px-7 py-3.5 rounded-full font-semibold text-brand-space bg-brand-teal hover:bg-brand-teal-light transition-all duration-200 text-sm"
            >
              Explore Visa Guides
            </Link>
            <Link
              href="/digital-nomad"
              className="px-7 py-3.5 rounded-full font-semibold text-white border border-white/20 hover:border-brand-teal hover:text-brand-teal transition-all duration-200 text-sm"
            >
              Digital Nomad Hub
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/8 animate-fade-up delay-400">
            {[
              { val: "100+", label: "Countries covered" },
              { val: "50+", label: "Visa guides" },
              { val: "₹0", label: "To start reading" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-brand-teal" style={{ fontFamily: "var(--font-syne)" }}>{val}</div>
                <div className="text-white/40 text-xs mt-0.5 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-teal/50 to-transparent" />
      </div>
    </section>
  );
}

/* ─── Niche Cards ─────────────────────────────────────────── */
const niches = [
  {
    icon: "✦",
    badge: "Most Popular",
    badgeType: "teal",
    title: "Visa Guide for Indian Passport",
    desc: "Country-by-country breakdown. Visa-free, VOA, and e-visa — with real costs, processing time, and success tips.",
    href: "/visa-guide",
    stat: "190+ countries",
  },
  {
    icon: "◈",
    badge: "Trending",
    badgeType: "amber",
    title: "Digital Nomad Hubs",
    desc: "Best coworking cities for Indian nomads. Cost of living, internet speed, visa type, and nomad community strength.",
    href: "/digital-nomad",
    stat: "40+ cities ranked",
  },
  {
    icon: "◉",
    badge: "Save Money",
    badgeType: "teal",
    title: "Travel Insurance Guide",
    desc: "Which policy actually covers you? Independent comparisons of SafetyWing, HDFC Ergo, Tata AIG and more.",
    href: "/travel-insurance",
    stat: "35%+ affiliate commission",
  },
  {
    icon: "◆",
    badge: "New",
    badgeType: "amber",
    title: "Wellness Travel",
    desc: "Retreats, yoga ashrams, and wellness stays across Asia. Curated for the Indian traveler who wants more than a resort.",
    href: "/wellness",
    stat: "₹8.5T market by 2027",
  },
];

function NicheSection() {
  return (
    <section className="section-py bg-brand-cloud">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="badge badge-teal mb-4">What we cover</div>
            <h2 className="text-4xl md:text-5xl text-brand-space" style={{ fontFamily: "var(--font-syne)", fontWeight: 700 }}>
              Built for the<br />
              <span className="gradient-text">Indian Traveler.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Every guide on Cirrionix is written with the Indian passport, budget,
            and mindset in mind. No generic Western travel advice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {niches.map((n) => (
            <Link
              key={n.title}
              href={n.href}
              className="group bg-white rounded-3xl p-8 border border-gray-100 card-hover block"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-3xl text-brand-teal"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {n.icon}
                </span>
                <span className={`badge badge-${n.badgeType}`}>{n.badge}</span>
              </div>
              <h3
                className="text-xl text-brand-space mb-3 group-hover:text-brand-teal-dark transition-colors"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 700 }}
              >
                {n.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{n.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-teal font-semibold uppercase tracking-wider">{n.stat}</span>
                <span className="text-brand-teal group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ──────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-py" style={{ background: "var(--color-space)" }}>
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center">
          <div className="badge badge-dark mb-6 mx-auto inline-flex">
            Free weekly intel
          </div>
          <h2
            className="text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            The Cirrionix{" "}
            <span className="gradient-text">Travel Brief</span>
          </h2>
          <p className="text-white/50 mb-8 text-sm leading-relaxed">
            Visa changes, nomad visa launches, travel deals, and destination guides
            delivered every Tuesday. 4,000+ Indian travelers read this.
          </p>

          {submitted ? (
            <div className="bg-brand-teal/10 border border-brand-teal/30 rounded-2xl p-6 text-brand-teal">
              <div className="text-lg font-semibold mb-1">Welcome aboard! 🎉</div>
              <div className="text-sm opacity-80">Check your inbox for your free India Passport Travel Guide.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/8 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-teal transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full font-semibold text-brand-space bg-brand-teal hover:bg-brand-teal-light transition-colors text-sm whitespace-nowrap"
              >
                Get Free Guide
              </button>
            </form>
          )}
          <p className="text-white/25 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="border-t border-white/5 py-12"
      style={{ background: "var(--color-space)" }}
    >
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="25" stroke="#5DCAA5" strokeWidth="1.2" opacity="0.3" />
              <path d="M14 26 Q20 14 26 18 Q32 22 38 14" stroke="#5DCAA5" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="26" cy="26" r="3" fill="#5DCAA5" />
            </svg>
            <span className="text-white/60 text-sm" style={{ fontFamily: "var(--font-syne)", fontWeight: 600 }}>
              CIRRIONIX
            </span>
          </div>
          <p className="text-white/25 text-xs text-center">
            © {new Date().getFullYear()} Cirrionix · Travel Beyond the Ordinary · cirrionix.in
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white/30 hover:text-brand-teal text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NicheSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}