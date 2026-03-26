import Link from "next/link";

export function StudioSetupState() {
  return (
    <main className="bg-transparent py-24">
      <div className="container-site">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-brand-space/6 bg-white/85 px-7 py-12 text-brand-space shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-12 md:py-16">
          <p className="text-label-sm uppercase tracking-[0.18em] text-brand-teal-dark">
            Sanity setup
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">
            Add your Sanity project ID to open the Studio.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-space/62">
            The app is still using the placeholder CMS project. Create a
            `.env.local` file in the project root and add your real Sanity
            values.
          </p>
          <pre className="mt-8 overflow-x-auto rounded-[24px] bg-brand-space px-6 py-5 text-sm text-white">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19`}
          </pre>
          <p className="mt-6 text-sm leading-7 text-brand-space/58">
            After saving the file, restart `npm run dev` and revisit `/studio`.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/blog" className="button-primary text-label-sm">
              Back to Journal
            </Link>
            <Link href="/" className="button-ghost text-label-sm">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
