// src/app/admin/training/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

const audienceOptions = [
  { value: "vendor", label: "Vendor" },
  { value: "sales", label: "Sales Staff" },
];

const contentTypeOptions = [
  { value: "text", label: "Text lesson" },
  { value: "video", label: "Video (YouTube/Vimeo embed)" },
  { value: "link", label: "External link" },
];

export default function NewTrainingLessonPage() {
  const supabase = getSupabaseBrowser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState<"vendor" | "sales">("vendor");
  const [contentType, setContentType] = useState<"text" | "video" | "link">("text");
  const [body, setBody] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.from("training_lessons").insert([
      {
        title,
        description: description || null,
        category: category || null,
        audience,
        content_type: contentType,
        body: contentType === "text" ? body : null,
        video_url: contentType === "video" ? videoUrl : null,
        url: contentType === "link" ? linkUrl : null,
      },
    ]);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Lesson created successfully." });

      // Auto-redirect to training page after short delay
      setTimeout(() => {
        router.push("/admin/training");
      }, 1000);
    }

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">New Training Lesson</h1>
          <p className="text-sm text-white/50 mt-2">
            Create a lesson for vendors or sales staff. Choose text, video, or a link.
          </p>
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

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5"
      >
        {/* title + audience */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder="Ex: Creating your first deal"
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as "vendor" | "sales")}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              {audienceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* description + category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Short summary that shows in the grid"
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Onboarding, Coupons, Scripts..."
            />
          </div>
        </div>

        {/* content type selector */}
        <div>
          <label className="block text-xs text-white/60 mb-2">Content type</label>
          <div className="flex gap-2">
            {contentTypeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContentType(opt.value as any)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  contentType === opt.value
                    ? "bg-orange-500 text-white"
                    : "bg-black/20 text-white/70 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* conditional fields */}
        {contentType === "text" ? (
          <div>
            <label className="block text-xs text-white/60 mb-1">Lesson body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Write or paste your lesson instructions here…"
            />
          </div>
        ) : null}

        {contentType === "video" ? (
          <div>
            <label className="block text-xs text-white/60 mb-1">Video URL (embed)</label>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Ex: https://www.youtube.com/embed/xxxxxxxx"
            />
            <p className="text-[10px] text-white/30 mt-1">
              Use the embed URL (the one with /embed/) for best results.
            </p>
          </div>
        ) : null}

        {contentType === "link" ? (
          <div>
            <label className="block text-xs text-white/60 mb-1">External link</label>
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="https://your-training-url.com"
            />
          </div>
        ) : null}

        {/* submit button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}
