// src/app/admin/help/page.tsx
import fs from "fs";
import path from "path";
import { marked } from "marked";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HelpPage() {
  const docsPath = path.join(process.cwd(), "docs", "LD247-Admin-Manual.md");

  let fileExists = false;
  let markdown =
    "# LD247 Admin Manual\n\nManual file not found. Check the debug box below.";
  let readError: string | null = null;
  let parsedHtml = "<p>Manual file not found.</p>";

  try {
    fileExists = fs.existsSync(docsPath);
    if (fileExists) {
      markdown = fs.readFileSync(docsPath, "utf8");
    }
  } catch (err: any) {
    readError = err?.message ?? String(err);
  }

  try {
    // ✅ configure marked safely before parsing
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true,
      mangle: false,
    });

    parsedHtml = await marked.parse(markdown);
  } catch (err: any) {
    readError = (readError ? readError + " | " : "") + (err?.message ?? String(err));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Help & Docs</h1>
          <p className="text-sm text-white/50 mt-2">
            Internal documentation for LocalDeals247 — admin usage, setup, and troubleshooting.
          </p>
        </div>
      </div>

      {/* Debug panel */}
      <div className="bg-black/30 border border-red-500/40 rounded-lg p-4 text-xs text-white/70 space-y-1">
        <p className="font-semibold text-white">Debug</p>
        <p>
          <strong>docsPath:</strong> {docsPath}
        </p>
        <p>
          <strong>fileExists:</strong> {String(fileExists)}
        </p>
        <p>
          <strong>readError:</strong> {readError ?? "none"}
        </p>
      </div>

      {/* Rendered Markdown */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="max-h-[75vh] overflow-y-auto p-6">
          <article
            className="prose prose-invert max-w-none prose-p:text-white/70 prose-h1:text-white prose-h2:text-white prose-h3:text-white/90"
            dangerouslySetInnerHTML={{
              __html:
                parsedHtml && parsedHtml.trim().length > 0
                  ? parsedHtml
                  : "<p class='text-white/40 text-sm'>No content parsed.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}
