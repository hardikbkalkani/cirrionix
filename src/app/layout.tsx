import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-brand-space font-body antialiased">
        <div className="min-h-screen bg-brand-space text-white">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
