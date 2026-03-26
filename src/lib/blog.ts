import type { PortableTextBlock } from "sanity";
import {Article, articles as fallbackArticles} from "@/lib/site-data";
import {client} from "@/sanity/lib/client";
import {
  ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import {isSanityConfigured} from "@/sanity/env";

type SanityArticle = Omit<Article, "publishedAt"> & {
  publishedAt?: string;
};

function getPortableTextParagraphs(blocks: PortableTextBlock[] = []) {
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      const children = Array.isArray(block.children) ? block.children : [];

      return children
        .map((child) =>
          typeof child === "object" &&
          child !== null &&
          "text" in child &&
          typeof child.text === "string"
            ? child.text
            : "",
        )
        .join("")
        .trim();
    })
    .filter(Boolean);
}

function buildExcerpt(article: SanityArticle) {
  if (article.excerpt?.trim()) {
    return article.excerpt;
  }

  const sectionExcerpt = article.sections?.flatMap((section) => section.body)?.[0];

  if (sectionExcerpt) {
    return sectionExcerpt;
  }

  const portableText = getPortableTextParagraphs(article.body);
  const firstParagraph = portableText[0];

  if (!firstParagraph) {
    return "";
  }

  return firstParagraph.length > 180
    ? `${firstParagraph.slice(0, 177).trimEnd()}...`
    : firstParagraph;
}

function buildReadingTime(article: SanityArticle) {
  if (article.readingTime?.trim()) {
    return article.readingTime;
  }

  const text = [
    ...getPortableTextParagraphs(article.body),
    ...(article.sections?.flatMap((section) => section.body) || []),
  ].join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (!words) {
    return "5 min read";
  }

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatPublishedAt(value?: string) {
  if (!value) {
    return "Draft";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function normalizeArticle(article: SanityArticle): Article {
  return {
    ...article,
    category: article.category || "Journal",
    excerpt: buildExcerpt(article),
    readingTime: buildReadingTime(article),
    author: article.author || "Cirrionix",
    role: article.role || "Editorial Team",
    publishedAt: formatPublishedAt(article.publishedAt),
    accent: article.accent || "teal",
    body: article.body || [],
    sections: article.sections || [],
  };
}

export async function getBlogArticles() {
  if (!isSanityConfigured) {
    return fallbackArticles;
  }

  try {
    const records = await client.fetch<SanityArticle[]>(ARTICLES_QUERY);

    if (!records?.length) {
      return fallbackArticles;
    }

    return records.map(normalizeArticle);
  } catch {
    return fallbackArticles;
  }
}

export async function getBlogArticleBySlug(slug: string) {
  if (!isSanityConfigured) {
    return fallbackArticles.find((article) => article.slug === slug) || null;
  }

  try {
    const article = await client.fetch<SanityArticle | null>(
      ARTICLE_BY_SLUG_QUERY,
      {slug},
    );

    return article ? normalizeArticle(article) : null;
  } catch {
    return fallbackArticles.find((article) => article.slug === slug) || null;
  }
}

export async function getBlogSlugs() {
  if (!isSanityConfigured) {
    return fallbackArticles.map((article) => article.slug);
  }

  try {
    const slugs = await client.fetch<string[]>(ARTICLE_SLUGS_QUERY);
    return slugs?.length
      ? slugs
      : fallbackArticles.map((article) => article.slug);
  } catch {
    return fallbackArticles.map((article) => article.slug);
  }
}
