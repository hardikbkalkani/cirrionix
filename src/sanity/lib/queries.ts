import {defineQuery} from "next-sanity";

const ARTICLE_PROJECTION = `
  "slug": slug.current,
  "category": coalesce(category->title, "Journal"),
  title,
  excerpt,
  readingTime,
  "author": coalesce(author->name, "Cirrionix"),
  "role": coalesce(author->role, "Editorial Team"),
  publishedAt,
  "accent": coalesce(accent, "teal"),
  sections[]{
    heading,
    body
  }
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
    ${ARTICLE_PROJECTION}
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${ARTICLE_PROJECTION}
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

