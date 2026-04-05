import { HomeHero, HomeSignalSection, NewsletterCta, ServiceGridSection } from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeSignalSection />
      <ServiceGridSection />
      <NewsletterCta />
    </main>
  );
}
