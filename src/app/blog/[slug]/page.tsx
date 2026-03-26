import { notFound } from "next/navigation";
import { ArticleBody, ArticleHero } from "@/components/sections";
import { getBlogArticleBySlug, getBlogArticles, getBlogSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getBlogArticleBySlug(slug),
    getBlogArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const related = allArticles
    .filter((entry) => entry.slug !== article.slug)
    .slice(0, 2);

  return (
    <main>
      <ArticleHero article={article} />
      <ArticleBody article={article} related={related} />
    </main>
  );
}
