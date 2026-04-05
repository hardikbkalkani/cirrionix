import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary brand colors
          space:   "#0B0F1A",  // Deep space black — hero bg, nav
          teal:    "#5DCAA5",  // Cirrus teal — primary accent
          trail:   "#1D9E75",  // Trail green — hover states
          amber:   "#EF9F27",  // Horizon amber — CTAs, badges
          cloud:   "#F1EFE8",  // Cloud white — light bg
          // Extended palette
          "teal-dark":  "#0F6E56",
          "teal-light": "#9FE1CB",
          "space-soft": "#161B2E",
          "space-muted":"#1E2540",
        },
        // Semantic aliases
        primary:   "#5DCAA5",
        secondary: "#EF9F27",
        dark:      "#0B0F1A",
      },
      fontFamily: {
        sans:    ["var(--font-editorial)", "Georgia", "serif"],
        body:    ["var(--font-editorial)", "Georgia", "serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg":  ["3rem",    { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.3",  letterSpacing: "-0.01em", fontWeight: "600" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "7rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "teal-glow": "0 0 40px rgba(93, 202, 165, 0.15)",
        "teal-sm":   "0 0 20px rgba(93, 202, 165, 0.1)",
        "card":      "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover":"0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(93,202,165,0.12) 0%, transparent 60%)",
        "card-shine":   "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-right":"slideRight 0.5s ease forwards",
        "pulse-teal": "pulseTeal 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseTeal: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        cirrionix: {
          css: {
            "--tw-prose-body":        theme("colors.gray.700"),
            "--tw-prose-headings":    theme("colors.gray.900"),
            "--tw-prose-links":       theme("colors.brand.teal"),
            "--tw-prose-bold":        theme("colors.gray.900"),
            "--tw-prose-code":        theme("colors.brand.teal"),
            "--tw-prose-pre-bg":      theme("colors.brand.space"),
            maxWidth: "72ch",
            h2: { fontFamily: "var(--font-syne)", letterSpacing: "-0.01em" },
            h3: { fontFamily: "var(--font-syne)", letterSpacing: "-0.01em" },
            a: { textDecoration: "none", fontWeight: "500",
                 "&:hover": { color: theme("colors.brand.trail") } },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
