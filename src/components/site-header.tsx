"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site-data";

function BrandMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <circle cx="26" cy="26" r="24.5" stroke="rgba(122,230,192,0.35)" />
      <path
        d="M14 26C20 14 26 18 32 22C34 23.2 36 21 38 18"
        stroke="#7AE6C0"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="26" cy="26" r="3.5" fill="#7AE6C0" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-cloud/90 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
          : "bg-brand-cloud/75 backdrop-blur-xl"
      }`}
    >
      <div className="container-site flex h-[var(--nav-height)] items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-brand-space">
          <BrandMark />
          <span className="font-sans text-xl font-extrabold tracking-tight text-brand-space">
            CIRRI<span className="text-brand-teal">ON</span>IX
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-label-sm uppercase tracking-[0.22em] transition-colors ${
                  active ? "text-brand-teal" : "text-brand-space/55 hover:text-brand-space"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/newsletter" className="button-primary text-label-sm">
            Get Free Guide
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-space/10 text-brand-space md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1.5">
            <div className={`h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <div className={`h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-brand-space/8 bg-brand-cloud px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm uppercase tracking-[0.22em] ${
                    active ? "text-brand-teal" : "text-brand-space/65"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/newsletter" className="button-primary mt-2 text-center text-label-sm">
              Get Free Guide
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
