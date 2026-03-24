import { notFound } from "next/navigation";
import { ArticleBody, ArticleHero } from "@/components/sections";
import { articles, getArticleBySlug } from "@/lib/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ArticleHero article={article} />
      <ArticleBody article={article} />
    </main>
  );
}
