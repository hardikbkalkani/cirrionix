import {createHash, randomUUID} from "node:crypto";

const GEMINI_API_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta";
const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function sha(input) {
  return createHash("sha1").update(input).digest("hex");
}

function normalizeGeminiImageModel(model) {
  if (
    model === "gemini-2.0-flash-preview-image-generation" ||
    model === "gemini-2.0-flash-exp-image-generation"
  ) {
    return "gemini-2.5-flash-image";
  }

  return model;
}

function isQuotaError(error) {
  return (
    error instanceof Error &&
    error.message.includes("429") &&
    error.message.includes("RESOURCE_EXHAUSTED")
  );
}

function estimateReadingTime(sections) {
  const text = sections.flatMap((section) => section.paragraphs).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function buildPortableTextBlocks(sections) {
  return sections.flatMap((section) => {
    const headingBlock = {
      _key: randomUUID().replace(/-/g, "").slice(0, 12),
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: randomUUID().replace(/-/g, "").slice(0, 12),
          _type: "span",
          marks: [],
          text: section.heading,
        },
      ],
    };

    const paragraphBlocks = section.paragraphs.map((paragraph) => ({
      _key: randomUUID().replace(/-/g, "").slice(0, 12),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: randomUUID().replace(/-/g, "").slice(0, 12),
          _type: "span",
          marks: [],
          text: paragraph,
        },
      ],
    }));

    return [headingBlock, ...paragraphBlocks];
  });
}

function getJsonResponseText(payload) {
  const textParts =
    payload.candidates?.[0]?.content?.parts
      ?.filter((item) => typeof item.text === "string")
      ?.map((item) => item.text) || [];

  return textParts.join("").trim();
}

async function callGemini(model, body) {
  const apiKey = requireEnv("GEMINI_API_KEY");

  const response = await fetch(
    `${GEMINI_API_BASE_URL}/models/${model}:generateContent`,
    {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function generateArticle(topic, category) {
  const model = process.env.AI_AUTOBLOG_TEXT_MODEL || "gemini-2.5-flash";
  const chosenCategory =
    category || process.env.AI_AUTOBLOG_DEFAULT_CATEGORY || "Visa Guide";
  const promptTopic =
    topic ||
    `A high-signal ${chosenCategory.toLowerCase()} article for Indian travelers published today`;

  const response = await callGemini(model, {
    system_instruction: {
      parts: [
        {
          text:
            "You write premium travel blog drafts for Indian travelers. Return JSON only. Focus on practical, editorial-quality guidance. Avoid hype, unverifiable claims, and legal guarantees. Each section must have 2 or 3 concise paragraphs.",
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: `Create a blog article for Cirrionix.\nTopic: ${promptTopic}\nPreferred category: ${chosenCategory}\nAudience: Indian travelers.\nRequirements: 4 to 6 sections, practical and SEO-friendly, slug-safe lowercase slug, excerpt under 200 characters, and an image prompt for a copyright-safe AI-generated hero image.`,
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: {
        type: "OBJECT",
        properties: {
          title: {type: "STRING"},
          slug: {type: "STRING"},
          excerpt: {type: "STRING"},
          categoryName: {type: "STRING"},
          imageAlt: {type: "STRING"},
          imagePrompt: {type: "STRING"},
          sections: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                heading: {type: "STRING"},
                paragraphs: {
                  type: "ARRAY",
                  items: {type: "STRING"},
                },
              },
              required: ["heading", "paragraphs"],
              propertyOrdering: ["heading", "paragraphs"],
            },
          },
        },
        required: [
          "title",
          "slug",
          "excerpt",
          "categoryName",
          "imageAlt",
          "imagePrompt",
          "sections",
        ],
        propertyOrdering: [
          "title",
          "slug",
          "excerpt",
          "categoryName",
          "imageAlt",
          "imagePrompt",
          "sections",
        ],
      },
    },
  });

  const raw = getJsonResponseText(response);

  if (!raw) {
    throw new Error("Gemini returned an empty article payload.");
  }

  const article = JSON.parse(raw);
  article.slug = slugify(article.slug || article.title);
  article.categoryName = article.categoryName || chosenCategory;
  return article;
}

async function generateImage(article) {
  const model = normalizeGeminiImageModel(
    process.env.AI_AUTOBLOG_IMAGE_MODEL || "gemini-2.5-flash-image",
  );
  const response = await callGemini(model, {
    contents: [
      {
        parts: [
          {
            text: article.imagePrompt,
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  const imagePart =
    response.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData?.data || part.inline_data?.data,
    ) || null;
  const imageBase64 =
    imagePart?.inlineData?.data || imagePart?.inline_data?.data || null;

  if (!imageBase64) {
    throw new Error("Gemini image generation returned no image data.");
  }

  return Buffer.from(imageBase64, "base64");
}

async function uploadSanityImage(imageBuffer, fileName) {
  const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
  const token = requireEnv("SANITY_API_WRITE_TOKEN");

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/assets/images/${dataset}?filename=${encodeURIComponent(fileName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/png",
      },
      body: imageBuffer,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sanity image upload failed (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload.document?._id;
}

async function mutateSanity(mutations) {
  const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
  const token = requireEnv("SANITY_API_WRITE_TOKEN");

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({mutations}),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sanity mutation failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function ensureAuthor(authorName, authorSlug) {
  const authorId = `author.${slugify(authorSlug)}`;

  await mutateSanity([
    {
      createIfNotExists: {
        _id: authorId,
        _type: "author",
        name: authorName,
        slug: {
          _type: "slug",
          current: slugify(authorSlug),
        },
        bio: [],
      },
    },
  ]);

  return authorId;
}

async function ensureCategory(categoryName) {
  const categoryId = `category.${slugify(categoryName)}`;

  await mutateSanity([
    {
      createIfNotExists: {
        _id: categoryId,
        _type: "category",
        title: categoryName,
        slug: {
          _type: "slug",
          current: slugify(categoryName),
        },
        description: `${categoryName} content generated for Cirrionix.`,
      },
    },
  ]);

  return categoryId;
}

async function createPostDocument(
  article,
  imageAssetId,
  authorId,
  categoryId,
  mode,
) {
  const readingTime = estimateReadingTime(article.sections);
  const documentId =
    mode === "draft" ? `drafts.post.${article.slug}` : `post.${article.slug}`;

  await mutateSanity([
    {
      createOrReplace: {
        _id: documentId,
        _type: "post",
        title: article.title,
        slug: {
          _type: "slug",
          current: article.slug,
        },
        excerpt: article.excerpt,
        readingTime,
        author: {
          _type: "reference",
          _ref: authorId,
        },
        categories: [
          {
            _key: sha(article.categoryName).slice(0, 12),
            _type: "reference",
            _ref: categoryId,
          },
        ],
        publishedAt: new Date().toISOString(),
        ...(imageAssetId
          ? {
              mainImage: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: imageAssetId,
                },
                alt: article.imageAlt,
              },
            }
          : {}),
        body: buildPortableTextBlocks(article.sections),
      },
    },
  ]);

  return {documentId, readingTime};
}

export async function createAutomatedBlogDraft(options = {}) {
  const mode =
    options.mode ||
    (process.env.AI_AUTOBLOG_MODE === "publish" ? "publish" : "draft");
  const authorName =
    process.env.AI_AUTOBLOG_AUTHOR_NAME || "Cirrionix AI Desk";
  const authorSlug =
    process.env.AI_AUTOBLOG_AUTHOR_SLUG || "cirrionix-ai-desk";
  const allowTextOnly =
    process.env.AI_AUTOBLOG_ALLOW_TEXT_ONLY === "true" ||
    process.env.AI_AUTOBLOG_ALLOW_TEXT_ONLY === "1";

  const article = await generateArticle(options.topic, options.category);
  let imageAssetId = null;

  try {
    const imageBuffer = await generateImage(article);
    imageAssetId = await uploadSanityImage(imageBuffer, `${article.slug}.png`);
  } catch (error) {
    if (!allowTextOnly && !isQuotaError(error)) {
      throw error;
    }

    if (!allowTextOnly && isQuotaError(error)) {
      throw new Error(
        `${error.message}\nSet AI_AUTOBLOG_ALLOW_TEXT_ONLY=true to keep creating draft posts when image quota is unavailable.`,
      );
    }
  }

  const authorId = await ensureAuthor(authorName, authorSlug);
  const categoryId = await ensureCategory(article.categoryName);
  const post = await createPostDocument(
    article,
    imageAssetId,
    authorId,
    categoryId,
    mode,
  );

  return {
    mode,
    title: article.title,
    slug: article.slug,
    category: article.categoryName,
    hasImage: Boolean(imageAssetId),
    documentId: post.documentId,
    readingTime: post.readingTime,
  };
}
