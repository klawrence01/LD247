"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type TrainingItem = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  url: string | null;
  created_at: string;
  audience: "vendor" | "sales" | null;
  content_type: "text" | "video" | "link" | null;
  video_url: string | null;
  body: string | null;
};

const AUDIENCE_TABS = [
  { id: "vendor", label: "Vendor Training" },
  { id: "sales", label: "Sales Staff" },
];

export default function TrainingPage() {
  const supabase = getSupabaseBrowser();
  const [items, setItems] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableFound, setTableFound] = useState(false);
  const [audience, setAudience] = useState<"vendor" | "sales">("vendor");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("training_lessons")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTableFound(true);
        setItems(
          data.map((d: any) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            category: d.category,
            url: d.url,
            created_at: d.created_at,
            audience: d.audience ?? "vendor",
            content_type: d.content_type ?? "link",
            video_url: d.video_url,
            body: d.body,
          }))
        );
      } else {
        setTableFound(false);
        setItems([]);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const filtered = items.filter(
    (item) => (item.audience ?? "vendor") === audience
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Training</h1>
          <p className="text-sm text-white/50 mt-2">
            Internal lessons for LocalDeals247 — vendor onboarding, sales scripts,
            admin walkthroughs.
          </p>
        </div>import Link from "next/link";
...
<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-2xl font-bold text-white">Training</h1>
    <p className="text-sm text-white/50 mt-2">
      Internal lessons for LocalDeals247 — vendor onboarding, sales scripts,
      admin walkthroughs.
    </p>
  </div>
  <Link
    href="/admin/training/new"
    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg"
  >
    + New lesson
  </Link>
</div>

        <div className="flex gap-2 bg-white/5 rounded-full p-1">
          {AUDIENCE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAudience(tab.id as "vendor" | "sales")}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                audience === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading training…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60 space-y-3">
          <p>No training lessons found for this audience.</p>
          {!tableFound ? (
            <div>
              <p className="text-xs text-white/40 mb-2">
                Create this table in Supabase:
              </p>
              <pre className="text-[10px] whitespace-pre-wrap text-white/70">
{`create table public.training_lessons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text,
  url text,
  audience text default 'vendor',
  content_type text default 'link',
  video_url text,
  body text,
  created_at timestamptz default now()
);`}
              </pre>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-white font-semibold text-sm">
                  {item.title}
                </h2>
                {item.category ? (
                  <span className="bg-orange-500/10 text-orange-100 text-[10px] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                ) : null}
              </div>

              {item.description ? (
                <p className="text-xs text-white/50 line-clamp-3">
                  {item.description}
                </p>
              ) : null}

              {/* render by content type */}
              {item.content_type === "video" && item.video_url ? (
                <div className="aspect-video rounded-lg overflow-hidden bg-black/40">
                  <iframe
                    src={item.video_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {item.content_type === "text" && item.body ? (
                <div className="bg-black/20 rounded-lg p-3 text-xs text-white/70 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {item.body}
                </div>
              ) : null}

              {item.content_type === "link" && item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-xs bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded-lg text-center"
                >
                  Open lesson
                </a>
              ) : null}

              <p className="text-[10px] text-white/30">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
