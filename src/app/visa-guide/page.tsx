import { CountryGridSection, NewsletterCta, VisaGuideHero, VisaTrendSection } from "@/components/sections";
import { countryCards, visaStats, visaTrends } from "@/lib/site-data";

export default function VisaGuidePage() {
  return (
    <main>
      <VisaGuideHero stats={visaStats} />
      <VisaTrendSection trends={visaTrends} />
      <CountryGridSection countries={countryCards} />
      <NewsletterCta
        title="Don't Miss Travel Brief"
        copy="We monitor visa policy changes, destination momentum, and practical travel shifts so you do not have to."
      />
    </main>
  );
}
