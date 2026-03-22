import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
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
    default: "Cirrionix — Travel Beyond the Ordinary",
    template: "%s | Cirrionix",
  },
  description:
    "India's smartest travel guide for digital nomads, visa guides, and the Indian passport holder exploring the world. Real numbers, zero fluff.",
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
    title: "Cirrionix — Travel Beyond the Ordinary",
    description:
      "India's smartest travel guide for digital nomads, visa guides, and the Indian passport holder exploring the world.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cirrionix — Travel Beyond the Ordinary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirrionix — Travel Beyond the Ordinary",
    description: "India's smartest travel guide. Real numbers, zero fluff.",
    images: ["/og-image.png"],
    creator: "@cirrionix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-brand-cloud antialiased">{children}</body>
    </html>
  );
}