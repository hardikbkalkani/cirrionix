import { ArticleGrid, BlogListingHero, NewsletterCta } from "@/components/sections";
import { getBlogArticles } from "@/lib/blog";

export const revalidate = 60;

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
