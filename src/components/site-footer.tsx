import Link from "next/link";
import { footerColumns } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-space/8 bg-[#f7f4ec] py-16 text-brand-space/70">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-[1.35fr,1fr,1fr,1fr]">
          <div id="about" className="space-y-5">
            <p className="font-sans text-xl font-extrabold tracking-tight text-brand-space">
              CIRRI<span className="text-brand-teal">ON</span>IX
            </p>
            <p className="max-w-sm text-sm leading-7 text-brand-space/55">
              Celestial navigation for the modern Indian traveler. We turn travel complexity into clear, premium guidance.
            </p>
            <div className="rounded-[24px] border border-brand-space/8 bg-white/70 px-4 py-4">
              <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
                Current Build
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-space/58">
                The journal and visa guide are live now. Nomad hubs and insurance intelligence are being designed next.
              </p>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="text-label-sm uppercase tracking-[0.22em] text-brand-space/90">
                {column.title}
              </h2>
              <div className="flex flex-col gap-3 text-sm text-brand-space/55">
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href} className="transition-colors hover:text-brand-teal">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-space/8 pt-6 text-[11px] uppercase tracking-[0.18em] text-brand-space/35 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Cirrionix. Travel Beyond the Ordinary.</p>
          <div className="flex gap-5">
            <Link href="/blog" className="transition-colors hover:text-brand-space">
              Journal
            </Link>
            <Link href="/visa-guide" className="transition-colors hover:text-brand-space">
              Visa Guide
            </Link>
            <Link href="/newsletter" className="transition-colors hover:text-brand-space">
              Travel Brief
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
