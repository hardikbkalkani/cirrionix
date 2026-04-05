import { ArticleGrid, BlogListingHero, NewsletterCta } from "@/components/sections";
import { getBlogArticles } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <main>
      <BlogListingHero />
      <ArticleGrid items={articles} />
      <NewsletterCta />
    </main>
  );
}
