## Getting Started

Run the app locally:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` and add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GEMINI_API_KEY=your-gemini-api-key
SANITY_API_WRITE_TOKEN=your-sanity-write-token
AI_AUTOBLOG_TEXT_MODEL=gemini-2.5-flash
AI_AUTOBLOG_IMAGE_MODEL=gemini-2.5-flash-image
AI_AUTOBLOG_MODE=draft
AI_AUTOBLOG_ALLOW_TEXT_ONLY=true
AI_AUTOBLOG_AUTHOR_NAME=Cirrionix AI Desk
AI_AUTOBLOG_AUTHOR_SLUG=cirrionix-ai-desk
AI_AUTOBLOG_DEFAULT_CATEGORY=Visa Guide
CRON_SECRET=change-this-secret
```

## AI Blog Automation

Generate a draft post manually:

```bash
npm run ai:post -- --topic="Thailand visa guide for Indians in 2026" --category="Visa Guide"
```

The script will:

- generate a structured article with Gemini
- generate a copyright-safe AI image with Gemini when image quota is available
- upload the image to Sanity
- create a Sanity `post` document as a draft by default

If your free Gemini project has no image quota, set `AI_AUTOBLOG_ALLOW_TEXT_ONLY=true` and the script will still create a draft post without a hero image.

You can trigger the same workflow through the protected API route:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/automation/ai-post
```

`vercel.json` includes a daily cron schedule for `05:00 UTC`. On Vercel, set `CRON_SECRET` in your project settings so scheduled invocations automatically include the matching `Authorization` header.
