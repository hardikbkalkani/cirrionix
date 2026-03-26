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
    excerpt: article.excerpt || "",
    readingTime: article.readingTime || "5 min read",
    author: article.author || "Cirrionix",
    role: article.role || "Editorial Team",
    publishedAt: formatPublishedAt(article.publishedAt),
    accent: article.accent || "teal",
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

