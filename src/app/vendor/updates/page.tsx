"use client";

import { useState } from "react";
import VendorNav from "@/components/vendor/VendorNav";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function VendorUpdatesPage() {
  // -------------------
  // form state
  // -------------------
  const [title, setTitle] = useState(
    "Lunch Special: 2 slices + drink $5 (today only)"
  );
  const [body, setBody] = useState(
    "Good until 2pm. Just show this at the counter. First come, first served."
  );
  const [imageUrl, setImageUrl] = useState("");

  // how long is this valid?
  const [activeFor, setActiveFor] = useState<"today" | "weekend" | "custom">(
    "today"
  );
  const [customExpires, setCustomExpires] = useState("");

  // ui feedback
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

  // mock analytics sidebar data (can come from DB later)
  const followersCount = 132;
  const lastPostAge = "2 days ago";
  const lastPostHeadline = "Half Off Wings After 7pm";

  // TODO: Replace with actual vendor business_id from session/auth
  const businessId = "REPLACE_ME_WITH_BUSINESS_ID";

  // helper to compute active_until timestamp
  function computeActiveUntil(): string | null {
    const now = new Date();
    if (activeFor === "today") {
        // expire tonight at 23:59 local
        const end = new Date();
        end.setHours(23, 59, 0, 0);
        return end.toISOString();
    }
    if (activeFor === "weekend") {
        // expire Sunday 23:59
        const end = new Date();
        const day = end.getDay(); // 0=Sun,6=Sat
        const daysUntilSunday = (7 - day) % 7;
        end.setDate(end.getDate() + daysUntilSunday);
        end.setHours(23, 59, 0, 0);
        return end.toISOString();
    }
    if (activeFor === "custom") {
        if (!customExpires) return null;
        // customExpires is like "2025-10-24T18:00"
        const end = new Date(customExpires);
        return end.toISOString();
    }
    return null;
  }

  async function handlePost() {
    setIsPosting(true);
    setPostSuccess(null);
    setPostError(null);

    try {
      const supabase = getSupabaseBrowserClient();

      const activeUntilISO = computeActiveUntil();

      // insert into business_updates
      const { data, error } = await supabase
        .from("business_updates")
        .insert([
          {
            business_id: businessId,
            title,
            body,
            image_url: imageUrl || null,
            active_until: activeUntilISO,
          },
        ])
        .select("id, created_at")
        .single();

      if (error) {
        console.error("Insert error:", error);
        setPostError("Could not post update. Please try again.");
      } else {
        // success
        setPostSuccess("Your update is live and your followers will see it.");
        // reset form lightly, keep headline empty to encourage next promo
        setTitle("");
        setBody("");
        setImageUrl("");
        setActiveFor("today");
        setCustomExpires("");
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setPostError("Something went wrong.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* layout: sidebar + main content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: nav */}
        <VendorNav />

        {/* RIGHT: page content */}
        <div className="flex-1 min-w-0">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-1">
              Dashboard / Promote Your Business
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Post an Update
            </h1>
            <p className="text-sm text-gray-600 max-w-lg">
              Slow day? New deal? Limited spots? Post it here and it goes to
              everyone who follows you. This is how you bring people back.
            </p>
          </div>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: compose update */}
            <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Create a New Update
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Tell followers what’s happening right now. We’ll flag them.
              </p>

              {/* success / error state */}
              {postSuccess && (
                <div className="mb-4 rounded-xl border border-green-300 bg-green-50 text-green-800 text-[13px] px-4 py-3 font-semibold">
                  {postSuccess}
                </div>
              )}
              {postError && (
                <div className="mb-4 rounded-xl border border-red-300 bg-red-50 text-red-800 text-[13px] px-4 py-3 font-semibold">
                  {postError}
                </div>
              )}

              <div className="space-y-5">
                {/* Headline */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Headline (short and loud)
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Example: Buy 1 haircut, get 2nd half off (today)"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    This is what people will see first.
                  </p>
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Details (optional)
                  </label>
                  <textarea
                    className="w-full min-h-[80px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Add any rules, times, limits, etc."
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Example: “Only 12 orders left. Show this message at pickup.”
                  </p>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://.../my-special.jpg"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Add a promo photo or product shot. We’ll show it in your
                    post.
                  </p>
                </div>

                {/* Active duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    How long should this be active?
                  </label>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="today"
                        name="activeFor"
                        className="h-4 w-4"
                        checked={activeFor === "today"}
                        onChange={() => setActiveFor("today")}
                      />
                      <label
                        htmlFor="today"
                        className="text-sm text-gray-800"
                      >
                        Today only (expires tonight)
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="weekend"
                        name="activeFor"
                        className="h-4 w-4"
                        checked={activeFor === "weekend"}
                        onChange={() => setActiveFor("weekend")}
                      />
                      <label
                        htmlFor="weekend"
                        className="text-sm text-gray-800"
                      >
                        This weekend only
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="custom"
                        name="activeFor"
                        className="h-4 w-4"
                        checked={activeFor === "custom"}
                        onChange={() => setActiveFor("custom")}
                      />
                      <label
                        htmlFor="custom"
                        className="text-sm text-gray-800"
                      >
                        Custom date / time
                      </label>
                    </div>

                    {activeFor === "custom" && (
                      <div className="pl-6">
                        <input
                          type="datetime-local"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                          value={customExpires}
                          onChange={(e) => setCustomExpires(e.target.value)}
                        />
                        <p className="text-[12px] text-gray-500 mt-1">
                          We’ll stop showing this after that time.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post button */}
                <div className="pt-4">
                  <button
                    className="inline-flex items-center justify-center w-full rounded-xl bg-[#ff7a00] px-4 py-3 text-white text-sm font-semibold shadow hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePost}
                    disabled={isPosting || !title.trim()}
                  >
                    {isPosting ? "Posting..." : "Post Update Now"}
                  </button>
                  <p className="text-[12px] text-gray-500 mt-2 text-center leading-snug">
                    We’ll alert all your followers. They’ll see this in their
                    feed and get flagged.
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT: Live Preview */}
            <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Preview (What your followers will see)
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                This is how it will look when it hits their feed.
              </p>

              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                {/* business header mock */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-300 flex items-center justify-center text-[11px] font-bold text-gray-700">
                    LOGO
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 leading-tight">
                      Your Business Name
                    </div>
                    <div className="text-[11px] text-gray-500 leading-tight">
                      Posted just now •{" "}
                      {activeFor === "today"
                        ? "Good for today"
                        : activeFor === "weekend"
                        ? "Weekend special"
                        : activeFor === "custom"
                        ? `Ends ${customExpires || "custom time"}`
                        : "Active"}
                    </div>
                  </div>
                </div>

                {/* headline */}
                <div className="text-[15px] font-bold text-gray-900 leading-snug mb-2">
                  {title || "Your headline goes here..."}
                </div>

                {/* body */}
                {body && (
                  <div className="text-[13px] text-gray-800 leading-snug mb-3 whitespace-pre-line">
                    {body}
                  </div>
                )}

                {/* optional image preview */}
                {imageUrl ? (
                  <div className="mb-3">
                    <div className="w-full h-36 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center text-[12px] text-gray-600">
                      <span className="px-3 text-center break-all">
                        Image preview from:
                        <br />
                        {imageUrl}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 w-full h-24 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-[12px] text-gray-500 text-center px-3">
                    (Optional promo photo will show here)
                  </div>
                )}

                {/* callout */}
                <div className="rounded-lg bg-white border border-gray-300 p-3">
                  <div className="text-[12px] font-semibold text-gray-900 leading-tight mb-1">
                    Show this message at checkout
                  </div>
                  <div className="text-[12px] text-gray-700 leading-tight">
                    Save this on your phone and come in before it expires.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-white mt-6">
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
                  Your Reach
                </div>
                <div className="text-3xl font-bold text-gray-900 leading-none">
                  {followersCount}
                </div>
                <div className="text-[12px] text-gray-600 leading-tight">
                  people will see your next update.
                </div>

                <div className="border-t border-gray-200 mt-3 pt-3 text-[12px] text-gray-600 leading-tight">
                  <p className="font-semibold text-gray-800 mb-1">
                    Last Post
                  </p>
                  <p className="text-gray-800">{lastPostHeadline}</p>
                  <p className="text-gray-500">{lastPostAge}</p>
                </div>
              </div>

              <div className="text-[12px] text-gray-500 mt-6 leading-relaxed">
                <p className="mb-2 font-semibold text-gray-700">
                  Why this matters:
                </p>
                <p>
                  Every time you post, we alert everyone who followed you
                  through your survey. You’re not begging Facebook. You own
                  your list.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
