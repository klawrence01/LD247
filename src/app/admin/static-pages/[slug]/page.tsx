// src/app/admin/static-pages/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

const FRIENDLY_NAMES: Record<string, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "how-it-works": "How It Works",
  terms: "Terms & Conditions",
  "privacy-policy": "Privacy Policy",
  "sales-landing": "Sales / Merchant Landing",
};

export default function StaticPageEditor({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const router = useRouter();
  const supabase = getSupabaseBrowser();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<
    null | { type: "success" | "error"; text: string }
  >(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        setTitle(data.title ?? FRIENDLY_NAMES[slug] ?? slug);
        setBody(data.body ?? "");
      } else {
        setTitle(FRIENDLY_NAMES[slug] ?? slug);
        setBody("");
      }

      setLoading(false);
    };

    load();
  }, [slug, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.from("static_pages").upsert(
      {
        slug,
        title,
        body,
      },
      {
        onConflict: "slug",
      }
    );

    if (error) {
      setMessage({ type: "error", text: error.message });
      setSaving(false);
      return;
    }

    setMessage({ type: "success", text: "Page saved." });

    setTimeout(() => {
      router.push("/admin/static-pages");
    }, 800);

    setSaving(false);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMsg(null);

    const filePath = `static/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      setUploadMsg("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    // append image tag into body so you can edit/move it
    setBody((prev) =>
      prev
        ? `${prev}\n\n<img src="${publicUrl}" alt="" class="rounded-lg mb-4" />`
        : `<img src="${publicUrl}" alt="" class="rounded-lg mb-4" />`
    );

    setUploadMsg("Image uploaded and inserted.");
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {FRIENDLY_NAMES[slug] ?? "Edit static page"}
          </h1>
          <p className="text-sm text-white/50 mt-2">
            Edit the public content for this page. This will appear on the main
            LD247 site.
          </p>
          <p className="text-[10px] text-white/30 mt-1">slug: {slug}</p>
        </div>
      </div>

      {message ? (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-100"
              : "bg-red-500/10 text-red-100"
          }`}
        >
          {message.text}
        </div>
      ) : null}

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-white/60">
          Loading page…
        </div>
      ) : (
        // editor + preview side by side
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Editor panel */}
          <form
            onSubmit={handleSave}
            className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5"
          >
            <div>
              <label className="block text-xs text-white/60 mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="About LocalDeals247"
                required
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Upload image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-white text-sm"
                disabled={uploading}
              />
              <p className="text-[10px] text-white/30 mt-1">
                Uploads to Supabase Storage bucket <code>images</code> and inserts
                an &lt;img&gt; tag into the content.
              </p>
              {uploading ? (
                <p className="text-[10px] text-orange-200 mt-1">
                  Uploading image…
                </p>
              ) : null}
              {uploadMsg ? (
                <p className="text-[10px] text-white/40 mt-1">{uploadMsg}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1">
                Page content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
                placeholder="Write the public content for this page here…"
              />
              <p className="text-[10px] text-white/25 mt-2">
                You can write plain text, or HTML/Markdown if your frontend
                renderer supports it. Uploaded images are inserted automatically.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save page"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/static-pages")}
                className="text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Live preview panel */}
          <div className="bg-white/0 border border-white/5 rounded-xl p-6 overflow-y-auto min-h-[400px]">
            <p className="text-xs uppercase tracking-wide text-white/30 mb-3">
              Live preview
            </p>
            <div className="bg-black/10 rounded-lg p-5 min-h-[320px]">
              <h2 className="text-xl font-semibold text-white mb-4">
                {title || "(untitled page)"}
              </h2>
              <div
                className="prose prose-invert max-w-none prose-p:mb-3 prose-img:rounded-lg prose-img:my-4"
                // NOTE: you're the admin here, so this is fine —
                // but don't expose arbitrary user HTML like this.
                dangerouslySetInnerHTML={{ __html: body || "<p>No content.</p>" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* helper SQL */}
      <div className="bg-white/0 text-white/25 text-[10px]">
        If you have not created the table yet, run this in Supabase:
        <pre className="mt-2 bg-black/30 rounded-lg p-3 whitespace-pre-wrap text-[10px]">
{`create table if not exists public.static_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text,
  body text,
  updated_at timestamptz default now()
);`}
        </pre>
      </div>
    </div>
  );
}
