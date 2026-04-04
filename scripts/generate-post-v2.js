/**
 * CIRRIONIX — Auto Blog Post Generator v2
 * Features:
 *   - Gemini API for content generation (free)
 *   - Unsplash API for auto cover image fetch (free)
 *   - Sanity CMS auto-publish (free)
 *
 * Usage:
 *   npm run ai:post -- --topic="Thailand visa guide" --category="Visa Guide"
 *   npm run ai:post -- --topic="Bali digital nomad" --category="Digital Nomad" --image="bali rice terrace"
 */

const { createClient } = require("@sanity/client");
const https = require("https");
const fs = require("fs");
const path = require("path");

// ─── Config ───────────────────────────────────────────────────
const GEMINI_API_KEY    = process.env.GEMINI_API_KEY;
const SANITY_PROJECT    = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zleuyi6k";
const SANITY_TOKEN      = process.env.SANITY_API_TOKEN;
const UNSPLASH_ACCESS   = process.env.UNSPLASH_ACCESS_KEY;
const SANITY_DATASET    = "production";

// ─── Sanity Client ────────────────────────────────────────────
const sanity = createClient({
  projectId:  SANITY_PROJECT,
  dataset:    SANITY_DATASET,
  token:      SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn:     false,
});

// ─── Parse CLI args ───────────────────────────────────────────
function getArg(name) {
  const flag = `--${name}=`;
  const found = process.argv.find(a => a.startsWith(flag));
  if (found) return found.replace(flag, "");
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return null;
}

// ─── Category → Unsplash search term map ─────────────────────
const CATEGORY_IMAGE_MAP = {
  "visa guide":       "passport travel stamps airport",
  "digital nomad":    "remote work laptop travel cafe",
  "travel insurance": "travel insurance documents passport",
  "wellness travel":  "wellness retreat spa nature meditation",
  "destinations":     "travel destination landscape scenic",
};

function getUnsplashQuery(topic, category, imageOverride) {
  if (imageOverride) return imageOverride;
  // Extract key destination from topic
  const destinations = [
    "thailand","bali","dubai","japan","singapore","malaysia","georgia",
    "kenya","maldives","vietnam","portugal","lisbon","chiang mai",
    "tbilisi","medellin","sri lanka","europe","paris","tokyo","bali",
    "indonesia","rishikesh","kerala","goa",
  ];
  const topicLower = topic.toLowerCase();
  const dest = destinations.find(d => topicLower.includes(d));
  if (dest) return `${dest} travel landscape`;
  return CATEGORY_IMAGE_MAP[category?.toLowerCase()] || "travel landscape scenic";
}

// ─── Fetch copyright-free image from Unsplash ─────────────────
async function fetchUnsplashImage(query) {
  if (!UNSPLASH_ACCESS) {
    console.log("⚠️  No UNSPLASH_ACCESS_KEY — skipping image fetch");
    console.log(`   Search manually: https://unsplash.com/s/photos/${encodeURIComponent(query)}`);
    return null;
  }

  console.log(`🖼️  Searching Unsplash for: "${query}"`);

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&content_filter=high`;

  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS}` },
  });

  if (!response.ok) {
    console.log(`⚠️  Unsplash error: ${response.status}`);
    return null;
  }

  const data = await response.json();
  const photos = data.results;

  if (!photos || photos.length === 0) {
    console.log("⚠️  No Unsplash results found");
    return null;
  }

  // Pick best result (first one, highest quality)
  const photo = photos[0];

  return {
    url:         photo.urls.regular,          // 1080px wide
    downloadUrl: photo.urls.full,             // Full resolution
    thumb:       photo.urls.thumb,
    alt:         photo.alt_description || query,
    photographer:photo.user.name,
    photographerUrl: photo.user.links.html,
    unsplashUrl: photo.links.html,
    width:       photo.width,
    height:      photo.height,
  };
}

// ─── Download image to temp file ──────────────────────────────
async function downloadImage(imageUrl, filename) {
  const tmpDir = path.join(process.cwd(), ".tmp-images");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  const filepath = path.join(tmpDir, filename);

  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Failed to download image: ${response.status}`);

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  return filepath;
}

// ─── Upload image to Sanity ───────────────────────────────────
async function uploadImageToSanity(imageInfo) {
  if (!imageInfo) return null;

  try {
    console.log(`📤 Uploading cover image to Sanity...`);
    const filename = `cirrionix-${Date.now()}.jpg`;
    const filepath = await downloadImage(imageInfo.url, filename);

    const imageAsset = await sanity.assets.upload("image", fs.createReadStream(filepath), {
      filename,
      contentType: "image/jpeg",
    });

    // Cleanup temp file
    fs.unlinkSync(filepath);

    return {
      _type: "image",
      asset: { _type: "reference", _ref: imageAsset._id },
      alt: imageInfo.alt,
    };
  } catch (err) {
    console.log(`⚠️  Image upload failed: ${err.message}`);
    return null;
  }
}

// ─── Gemini API — Generate post ──────────────────────────────
async function generateWithGemini(topic, category) {
  console.log(`\n🤖 Generating: "${topic}"`);

  const prompt = `You are a senior travel writer for CIRRIONIX — India's smartest travel website built specifically for Indian passport holders. 

Write a comprehensive, deeply researched SEO blog post about: "${topic}"
Category: ${category}

RULES:
- Write ONLY for Indian travelers — mention costs in INR, reference Indian cities for flights, compare to Indian standards
- Minimum 1800 words — be thorough and genuinely helpful
- Use ## for H2 headings, ### for H3 headings
- Include real, specific data — costs, processing times, distances, temperatures
- Write in a confident, intelligent tone — not generic travel blog fluff
- Start with a punchy first paragraph that immediately gives value
- Include a "Pro Tips" section near the end
- End with a short practical summary

RESPOND WITH VALID JSON ONLY — no markdown fences, no extra text:

{
  "title": "Compelling SEO title 50-65 chars including the year if relevant",
  "slug": "url-slug-with-hyphens",
  "excerpt": "Hook excerpt 140-160 chars that makes someone want to read",
  "seoTitle": "SEO title max 60 chars",
  "seoDescription": "Meta description 140-160 chars",
  "readingTime": 9,
  "unsplashQuery": "2-3 word Unsplash search query for the cover image e.g. thailand temple sunrise",
  "imagePrompt": "Detailed AI image generation prompt for the cover image — cinematic travel photography style, specific location details, lighting, mood",
  "body": "FULL ARTICLE CONTENT — minimum 1800 words with ## H2 and ### H3 headings"
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 8192 },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);

  const data = await response.json();
  const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("Empty response from Gemini");

  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Could not parse JSON from Gemini");
  }
}

// ─── Convert markdown body to Sanity Portable Text ───────────
function toPortableText(body) {
  const blocks = [];
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (!t) continue;

    const key = () => Math.random().toString(36).substr(2, 9);

    if (t.startsWith("### ")) {
      blocks.push({ _type:"block", _key:key(), style:"h3", markDefs:[],
        children:[{ _type:"span", _key:key(), text:t.slice(4), marks:[] }] });
    } else if (t.startsWith("## ")) {
      blocks.push({ _type:"block", _key:key(), style:"h2", markDefs:[],
        children:[{ _type:"span", _key:key(), text:t.slice(3), marks:[] }] });
    } else {
      // Handle inline **bold**
      const parts  = t.split(/(\*\*[^*]+\*\*)/g);
      const children = parts.filter(Boolean).map(p => {
        if (p.startsWith("**") && p.endsWith("**"))
          return { _type:"span", _key:key(), text:p.slice(2,-2), marks:["strong"] };
        return { _type:"span", _key:key(), text:p, marks:[] };
      });
      blocks.push({ _type:"block", _key:key(), style:"normal", markDefs:[], children });
    }
  }
  return blocks;
}

// ─── Get Sanity author + category refs ───────────────────────
async function getSanityRefs(categoryTitle) {
  const author = await sanity.fetch(`*[_type=="author"][0]{ _id, name }`);
  if (!author) throw new Error("Create 'Cirrionix Team' author in Sanity Studio first");

  let cat = await sanity.fetch(
    `*[_type=="category" && lower(title) == lower($title)][0]{ _id, title }`,
    { title: categoryTitle }
  );
  if (!cat) {
    cat = await sanity.fetch(`*[_type=="category"][0]{ _id, title }`);
  }
  if (!cat) throw new Error("Create at least one category in Sanity Studio first");

  return { authorId: author._id, categoryId: cat._id };
}

// ─── Publish to Sanity ────────────────────────────────────────
async function publishToSanity(postData, category, mainImage) {
  const { authorId, categoryId } = await getSanityRefs(category);

  const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g,"-");

  const existing = await sanity.fetch(
    `*[_type=="post" && slug.current==$slug][0]{_id}`, { slug }
  );
  if (existing) {
    console.log(`⚠️  Slug "${slug}" already exists — skipping`);
    return null;
  }

  const doc = {
    _type:          "post",
    title:          postData.title,
    slug:           { _type:"slug", current: slug },
    excerpt:        postData.excerpt,
    readingTime:    postData.readingTime || 8,
    publishedAt:    new Date().toISOString(),
    featured:       false,
    body:           toPortableText(postData.body),
    seoTitle:       postData.seoTitle || postData.title,
    seoDescription: postData.seoDescription || postData.excerpt,
    author:         { _type:"reference", _ref: authorId },
    category:       { _type:"reference", _ref: categoryId },
    ...(mainImage ? { mainImage } : {}),
  };

  return await sanity.create(doc);
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  if (!GEMINI_API_KEY)  throw new Error("GEMINI_API_KEY not set in .env.local");
  if (!SANITY_TOKEN)    throw new Error("SANITY_API_TOKEN not set in .env.local");

  const topic         = getArg("topic");
  const category      = getArg("category") || "Destinations";
  const imageOverride = getArg("image");

  if (!topic) {
    console.error("❌ Usage: npm run ai:post -- --topic=\"Your topic\" --category=\"Visa Guide\"");
    process.exit(1);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  CIRRIONIX Auto Post Generator v2");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📌 Topic:    ${topic}`);
  console.log(`📂 Category: ${category}`);

  // Step 1 — Generate content
  const post = await generateWithGemini(topic, category);
  console.log(`✅ Generated: "${post.title}"`);
  console.log(`📝 Words: ~${post.body.split(" ").length}`);

  // Step 2 — Fetch Unsplash image
  const unsplashQuery = imageOverride || post.unsplashQuery ||
    getUnsplashQuery(topic, category, imageOverride);

  const imageInfo = await fetchUnsplashImage(unsplashQuery);

  if (imageInfo) {
    console.log(`✅ Found image by ${imageInfo.photographer}`);
    console.log(`🔗 Unsplash: ${imageInfo.unsplashUrl}`);
    // Log the AI image prompt too for manual use
    if (post.imagePrompt) {
      console.log(`\n🎨 AI Image Prompt (use in Ideogram/Leonardo if needed):`);
      console.log(`   ${post.imagePrompt}\n`);
    }
  } else if (post.imagePrompt) {
    console.log(`\n🎨 AI Image Prompt (generate manually):`);
    console.log(`   ${post.imagePrompt}\n`);
  }

  // Step 3 — Upload image to Sanity
  const mainImage = await uploadImageToSanity(imageInfo);

  // Step 4 — Publish to Sanity
  console.log("📤 Publishing to Sanity...");
  const result = await publishToSanity(post, category, mainImage);

  if (result) {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`✅ PUBLISHED!`);
    console.log(`📄 Title:  ${result.title}`);
    console.log(`🔗 URL:    https://cirrionix.in/blog/${result.slug.current}`);
    console.log(`🖼️  Image:  ${mainImage ? "✅ uploaded" : "❌ none — add manually in Sanity"}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⏳ Live in ~60 seconds (Vercel ISR revalidation)");
  }
}

main().catch(err => {
  console.error("❌", err.message);
  process.exit(1);
});
