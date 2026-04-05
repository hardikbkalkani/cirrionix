import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Cirrionix | Travel Beyond the Ordinary",
    template: "%s | Cirrionix",
  },
  description:
    "India's smartest travel guide for digital nomads, visa guides, and Indian travelers exploring the world with clarity.",
  keywords: [
    "travel blog india",
    "digital nomad india",
    "visa guide indian passport",
    "travel insurance india",
    "indian traveler abroad",
    "cirrionix",
  ],
  authors: [{ name: "Cirrionix" }],
  creator: "Cirrionix",
  metadataBase: new URL("https://cirrionix.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cirrionix.in",
    siteName: "Cirrionix",
    title: "Cirrionix | Travel Beyond the Ordinary",
    description:
      "Premium travel intelligence for Indian travelers navigating visas, slow travel, and long stays.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirrionix | Travel Beyond the Ordinary",
    description: "India's smartest travel guide. Real numbers, zero fluff.",
    creator: "@cirrionix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-brand-cloud font-body antialiased">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        <div className="min-h-screen bg-brand-cloud text-brand-space">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
