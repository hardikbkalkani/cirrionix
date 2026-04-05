import type { PortableTextBlock } from "sanity";

export type NavItem = {
  href: string;
  label: string;
};

export type ServiceCard = {
  icon: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  stat: string;
};

export type VisaStat = {
  value: string;
  label: string;
};

export type VisaTrend = {
  name: string;
  status: string;
  blurb: string;
  accent: string;
};

export type CountryCard = {
  flag: string;
  name: string;
  status: string;
  detail: string;
  accent: string;
};

export type Article = {
  slug: string;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  excerpt: string;
  readingTime: string;
  author: string;
  role: string;
  publishedAt: string;
  accent: string;
  body?: PortableTextBlock[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/visa-guide", label: "Visa Guide" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Live Now",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/visa-guide", label: "Visa Guide" },
      { href: "/blog", label: "Journal" },
      { href: "/newsletter", label: "Travel Brief" },
    ],
  },
  {
    title: "Next Routes",
    links: [
      { href: "/digital-nomad", label: "Nomad Hubs" },
      { href: "/travel-insurance", label: "Insurance Intel" },
      { href: "/blog", label: "Wellness Stories" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/newsletter", label: "Newsletter" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/blog", label: "Latest Posts" },
    ],
  },
];

export const homeStats = [
  { value: "100+", label: "Countries covered" },
  { value: "50+", label: "Visa guides" },
  { value: "Rs0", label: "To start reading" },
];

export const serviceCards: ServiceCard[] = [
  {
    icon: "✦",
    badge: "Most Popular",
    title: "Visa Guide for Indian Passport",
    description:
      "Country-by-country clarity on visa-free, visa on arrival, e-visa, and documents that matter.",
    href: "/visa-guide",
    stat: "190+ countries",
  },
  {
    icon: "◈",
    badge: "Trending",
    title: "Digital Nomad Hubs",
    description:
      "Cities ranked by livability, internet, stay costs, and how realistic they are for Indian remote workers.",
    href: "/digital-nomad",
    stat: "40+ cities ranked",
  },
  {
    icon: "◉",
    badge: "Save Money",
    title: "Travel Insurance Guide",
    description:
      "Practical insurance comparisons for long trips, expensive gear, and visa applications that need proof.",
    href: "/travel-insurance",
    stat: "High-signal comparisons",
  },
  {
    icon: "◆",
    badge: "New",
    title: "Wellness Travel",
    description:
      "Slow, restorative stays and retreat-led escapes for travelers who want more than another itinerary checklist.",
    href: "/blog/quiet-luxury-wellness-stays-india",
    stat: "Editorial curation",
  },
];

export const visaStats: VisaStat[] = [
  { value: "62", label: "Visa-free" },
  { value: "48", label: "Visa on arrival" },
  { value: "80+", label: "e-Visa" },
];

export const visaTrends: VisaTrend[] = [
  {
    name: "Thailand",
    status: "Visa Free",
    blurb: "Short-haul favourite with a smooth arrival experience and strong value-for-money stays.",
    accent: "teal",
  },
  {
    name: "Bali, Indonesia",
    status: "Visa on Arrival",
    blurb: "Ideal for remote workers balancing community, affordability, and a soft landing abroad.",
    accent: "amber",
  },
  {
    name: "Dubai, UAE",
    status: "e-Visa",
    blurb: "Fast-entry option for quick luxury breaks, shopping weekends, and event travel.",
    accent: "teal",
  },
  {
    name: "Western Europe",
    status: "Visa Required",
    blurb: "Still worth planning early if you want summer access, but documentation discipline matters.",
    accent: "rose",
  },
];

export const countryCards: CountryCard[] = [
  { flag: "🇲🇺", name: "Mauritius", status: "Visa-Free", detail: "Island escape, easy entry", accent: "teal" },
  { flag: "🇱🇰", name: "Sri Lanka", status: "e-Visa", detail: "Quick tropical reset", accent: "amber" },
  { flag: "🇻🇳", name: "Vietnam", status: "e-Visa", detail: "Urban energy, food, coast", accent: "amber" },
  { flag: "🇺🇸", name: "United States", status: "Visa Required", detail: "High scrutiny, plan early", accent: "rose" },
  { flag: "🇰🇪", name: "Kenya", status: "Visa-Free", detail: "Safari gateway", accent: "teal" },
  { flag: "🇭🇷", name: "Croatia", status: "Visa Required", detail: "Schengen discipline applies", accent: "rose" },
  { flag: "🇯🇵", name: "Japan", status: "e-Visa", detail: "High-demand seasonal travel", accent: "amber" },
  { flag: "🇹🇷", name: "Turkey", status: "e-Visa", detail: "Strong value luxury", accent: "amber" },
];

export const articles: Article[] = [
  {
    slug: "digital-nomad-visa-blueprint-india",
    category: "Visa Guide",
    title: "Mastering the Digital Nomad Visa: A 2026 Blueprint for Indian Citizens",
    excerpt:
      "A practical editorial guide to choosing the right nomad visa, budgeting realistically, and avoiding application friction.",
    readingTime: "8 min read",
    author: "Elias Raman",
    role: "Lead Editor",
    publishedAt: "March 24, 2026",
    accent: "teal",
    sections: [
      {
        heading: "The Celestial Strategy",
        body: [
          "The smartest move is rarely to chase the loudest destination. For Indian passport holders, the winning path is usually the country that balances approval odds, cost of stay, internet quality, and onward optionality.",
          "A useful nomad visa is not just a stamp. It is a platform for how you want to work, move, and spend over the next six to twelve months.",
        ],
      },
      {
        heading: "Regulatory Horizons",
        body: [
          "Portugal, Spain, Dubai, and Southeast Asian hubs all appeal for different reasons, but the paperwork burden is not equal. Proof of income, banking history, insurance, and accommodation records still decide whether your process feels easy or exhausting.",
          "Indian applicants benefit most when documents are standardized early and reused as a system rather than assembled in a panic for each application window.",
        ],
      },
      {
        heading: "What Actually Matters",
        body: [
          "Look beyond influencer advice. The real variables are tax exposure, embassy responsiveness, cost of first-month setup, and whether the city supports the kind of work rhythm you can sustain.",
          "Cirrionix recommends shortlisting destinations only after you compare total setup cost against quality-of-life upside.",
        ],
      },
    ],
  },
  {
    slug: "quiet-luxury-wellness-stays-india",
    category: "Wellness",
    title: "Quiet Luxury Wellness Stays in India That Actually Feel Restorative",
    excerpt:
      "Beyond glossy resort marketing, these stays stand out for atmosphere, pace, and the quality of the reset they deliver.",
    readingTime: "6 min read",
    author: "Mira Sen",
    role: "Features Writer",
    publishedAt: "March 18, 2026",
    accent: "amber",
    sections: [
      {
        heading: "Beyond the Resort Template",
        body: [
          "The best wellness stays do not overwhelm you with programming. They create room for stillness, intelligent hospitality, and a slower rhythm that feels deliberate rather than performative.",
          "That distinction matters if your goal is recovery instead of content production disguised as travel.",
        ],
      },
      {
        heading: "Design, Food, and Silence",
        body: [
          "Atmosphere is a product feature. Good air, good sleep, and visually calm spaces matter as much as yoga schedules or spa menus.",
          "The strongest properties pair quiet architecture with highly competent service and a food philosophy that supports energy, not indulgent burnout.",
        ],
      },
    ],
  },
  {
    slug: "travel-insurance-what-indian-travelers-actually-need",
    category: "Travel Insurance",
    title: "Travel Insurance Clauses Indian Travelers Actually Need to Check",
    excerpt:
      "A high-signal look at baggage, missed connections, medical ceilings, and the fine print that changes claim outcomes.",
    readingTime: "7 min read",
    author: "Rohan Dutta",
    role: "Research Editor",
    publishedAt: "March 12, 2026",
    accent: "teal",
    sections: [
      {
        heading: "Insurance Is a Filtering Problem",
        body: [
          "Most plans look similar until you examine exclusions. The right policy depends on whether you are optimizing for visa compliance, gear protection, medical certainty, or long-stay flexibility.",
          "For Indian travelers, the cheapest plan often fails exactly where premium itineraries become expensive.",
        ],
      },
      {
        heading: "The Clauses Worth Paying For",
        body: [
          "Medical evacuation, high-value electronics limits, and missed connection support are where value starts to separate. These are also the clauses most travelers realize they needed too late.",
          "A good policy should protect the trip you are actually taking, not an average holiday imagined by a comparison chart.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
