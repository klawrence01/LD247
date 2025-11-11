"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

// your two real blog tables
const BLOG_SOURCES = [
  { id: "everyday_heroes", label: "Everyday Heroes", table: "everyday_heroes" },
  { id: "behind_the_hustle", label: "Behind the Hustle", table: "behind_the_hustle" },
] as const;

const STATUS_TABS = ["draft", "scheduled", "published"] as const;

type BlogRow = {
  id: string;
  title: string | null;
  content: string | null;
  author: string | null;
  status: string | null;
  created_at: string | null;
  scheduled_for: string | null;
  region: string | null; // we keep it but don’t have to show it yet
};

export default function AdminBlogQueuePage() {
  const supabase = getSupabaseBrowser();

  // filters
  const [activeSource, setActiveSource] =
    useState<(typeof BLOG_SOURCES)[number]>(BLOG_SOURCES[0]);
  const [activeStatus, setActiveStatus] =
    useState<(typeof STATUS_TABS)[number]>("draft");
  const [activeAuthor, setActiveAuthor] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // data
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // load posts when source or filters change
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from(activeSource.table)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError(
          `Could not load blog posts from table "${activeSource.table}".`
        );
        setPosts([]);
        setAuthors([]);
        setLoading(false);
        return;
      }

      let rows = (data || []) as BlogRow[];

      // build author list
      const uniqAuthors = Array.from(
        new Set(rows.map((r) => r.author).filter(Boolean) as string[])
      ).sort();
      setAuthors(uniqAuthors);

      // filter by status
      let filtered = rows.filter(
        (p) => (p.status || "draft").toLowerCase() === activeStatus
      );

      // filter by author
      if (activeAuthor !== "ALL") {
        filtered = filtered.filter(
          (p) => (p.author || "").toLowerCase() === activeAuthor.toLowerCase()
        );
      }

      // search by title
      if (search.trim().length > 0) {
        const term = search.trim().toLowerCase();
        filtered = filtered.filter((p) =>
          (p.title || "").toLowerCase().includes(term)
        );
      }

      setPosts(filtered);
      setLoading(false);
    };

    loadPosts();
  }, [supabase, activeSource, activeStatus, activeAuthor, search]);

  // update status (publish/schedule/draft)
  const updatePostStatus = async (
    postId: string,
    newStatus: "draft" | "scheduled" | "published"
  ) => {
    const { error } = await supabase
      .from(activeSource.table)
      .update({ status: newStatus })
      .eq("id", postId);

    if (error) {
      console.error(error);
      alert("Error updating blog status.");
      return;
    }

    // remove from current list because we filter by status
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Blog Queue
        </h1>
        <p className="text-sm text-white/50 mt-2">
          Manage the two LocalDeals247 newsletters — Everyday Heroes and Behind the Hustle.
        </p>
        <p className="text-[10px] text-white/30 mt-1">
          Current table: <strong>{activeSource.table}</strong>
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* blog source */}
        <div>
          <label className="text-xs text-white/50 block mb-1">Newsletter</label>
          <select
            value={activeSource.id}
            onChange={(e) => {
              const src = BLOG_SOURCES.find((s) => s.id === e.target.value);
              if (src) {
                setActiveSource(src);
                setActiveAuthor("ALL");
              }
            }}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            {BLOG_SOURCES.map((src) => (
              <option key={src.id} value={src.id}>
                {src.label}
              </option>
            ))}
          </select>
        </div>

        {/* status tabs */}
        <div className="flex gap-3">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatus(tab)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition ${
                activeStatus === tab
                  ? "bg-orange-500 text-white border-orange-400"
                  : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* author filter */}
        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by author
          </label>
          <select
            value={activeAuthor}
            onChange={(e) => setActiveAuthor(e.target.value)}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            <option value="ALL">All authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* search */}
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-white/50 block mb-1">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title…"
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading blog posts…
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5 text-red-100 text-sm">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          No posts found for these filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onPublish={() => updatePostStatus(post.id, "published")}
              onSchedule={() => updatePostStatus(post.id, "scheduled")}
              onDraft={() => updatePostStatus(post.id, "draft")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({
  post,
  onPublish,
  onSchedule,
  onDraft,
}: {
  post: BlogRow;
  onPublish: () => void;
  onSchedule: () => void;
  onDraft: () => void;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white line-clamp-2">
            {post.title || "Untitled post"}
          </h2>
          <p className="text-xs text-white/40 mt-1">
            {post.author ? `by ${post.author}` : "Unknown author"}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-200 text-xs uppercase tracking-wide">
          {post.status || "draft"}
        </span>
      </div>

      <div className="h-1 w-10 rounded-full bg-orange-400/80" />

      <p className="text-xs text-white/40 line-clamp-4">
        {post.content ? post.content.slice(0, 160) + "…" : "No preview available."}
      </p>

      <p className="text-[11px] text-white/25">
        Created:{" "}
        {post.created_at
          ? new Date(post.created_at).toLocaleString()
          : "Unknown"}
      </p>
      {post.scheduled_for ? (
        <p className="text-[11px] text-white/35">
          Scheduled for: {new Date(post.scheduled_for).toLocaleString()}
        </p>
      ) : null}

      <div className="flex gap-2 mt-2">
        <button
          onClick={onPublish}
          className="flex-1 bg-orange-500/90 hover:bg-orange-500 text-white text-sm py-2 rounded-lg transition"
        >
          Publish
        </button>
        <button
          onClick={onSchedule}
          className="bg-white/5 hover:bg-white/10 text-white/80 text-sm py-2 px-3 rounded-lg transition"
        >
          Schedule
        </button>
        <button
          onClick={onDraft}
          className="bg-white/5 hover:bg-white/10 text-white/50 text-sm py-2 px-3 rounded-lg transition"
        >
          Draft
        </button>
      </div>
    </div>
  );
}
