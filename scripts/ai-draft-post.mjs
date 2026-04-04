import fs from "node:fs";
import path from "node:path";
import {createAutomatedBlogDraft} from "../src/lib/automation/ai-blog.mjs";

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const projectRoot = path.resolve(import.meta.dirname, "..");
loadDotEnvFile(path.join(projectRoot, ".env.local"));
loadDotEnvFile(path.join(projectRoot, ".env"));

function getArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((entry) => entry.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

async function main() {
  const topic = getArg("topic");
  const category = getArg("category");
  const mode = getArg("mode");

  const result = await createAutomatedBlogDraft({
    topic,
    category,
    mode: mode === "publish" ? "publish" : "draft",
  });

  console.log("AI blog automation completed:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
