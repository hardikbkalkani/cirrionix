import Link from "next/link";
import { footerColumns } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-brand-space py-16 text-white/70">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div id="about" className="space-y-5">
            <p className="font-sans text-xl font-extrabold tracking-tight text-white">
              CIRRI<span className="text-brand-teal">ON</span>IX
            </p>
            <p className="max-w-sm text-sm leading-7 text-white/45">
              Celestial navigation for the modern Indian traveler. We turn travel complexity into clear, premium guidance.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="text-label-sm uppercase tracking-[0.22em] text-white/90">
                {column.title}
              </h2>
              <div className="flex flex-col gap-3 text-sm text-white/45">
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href} className="transition-colors hover:text-brand-teal">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/6 pt-6 text-[11px] uppercase tracking-[0.18em] text-white/30 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Cirrionix. Travel Beyond the Ordinary.</p>
          <div className="flex gap-5">
            <Link href="/blog" className="transition-colors hover:text-white">
              Journal
            </Link>
            <Link href="/visa-guide" className="transition-colors hover:text-white">
              Visa Guide
            </Link>
            <Link href="/newsletter" className="transition-colors hover:text-white">
              Travel Brief
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
