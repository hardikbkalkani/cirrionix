import {NextResponse} from "next/server";
import {createAutomatedBlogDraft} from "@/lib/automation/ai-blog.mjs";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.replace(/^Bearer\s+/i, "");

  if (cronSecret && bearerToken !== cronSecret) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const {searchParams} = new URL(request.url);

  try {
    const result = await createAutomatedBlogDraft({
      topic: searchParams.get("topic") || undefined,
      category: searchParams.get("category") || undefined,
      mode: searchParams.get("mode") === "publish" ? "publish" : "draft",
    });

    return NextResponse.json({ok: true, result});
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown automation error";

    return NextResponse.json({ok: false, error: message}, {status: 500});
  }
}
