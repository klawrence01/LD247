"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewRow from "./ReviewRow";

type Message = {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  tag: "customers" | "system";
  unread?: boolean;
};

type Review = {
  id: number;
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  featured?: boolean; // when true → posted to merchant page
};

type Follower = {
  id: string;
  name: string;
  since: string;
  lastSeen?: string;
};

type Redemption = {
  id: string;
  code: string;
  dealTitle: string;
  customer?: string;
  date: string; // ISO
  vendorConfirmed: boolean;
  userConfirmed: boolean;
  reviewRequested?: boolean;
};

const star = "★";
const FOLLOWERS_KEY = "ld247_followers";
const REDEEMS_KEY = "ld247_redemptions";

function makeFollowLink(vendorId: string) {
  const token = Math.random().toString(36).slice(2, 10);
  if (typeof window === "undefined")
    return `https://localdeals247.com/follow/${vendorId}?t=${token}`;
  return `${window.location.origin}/follow/${vendorId}?t=${token}`;
}

function makeReviewLink(vendorId: string, dealSlugOrRedeemId?: string) {
  const token = Math.random().toString(36).slice(2, 10);
  const base =
    typeof window === "undefined" ? "https://localdeals247.com" : window.location.origin;
  const path = dealSlugOrRedeemId
    ? `/review/${vendorId}/${dealSlugOrRedeemId}`
    : `/review/${vendorId}`;
  return `${base}${path}?t=${token}`;
}

const templates = [
  { key: "invite_follow", label: "Invite to Follow" },
  { key: "request_review", label: "Request a Review" },
  { key: "deal_announce", label: "Deal Announcement" },
  { key: "thank_you", label: "Thank You" },
] as const;

export default function VendorMessagesPage() {
  const router = useRouter();

  // Inbox demo data
  const messages: Message[] = [
    { id: 1, from: "LD247 Admin", subject: "Welcome to Local Deals 24/7!", preview: "Your vendor account is set up and ready to go. Here are a few tips...", date: "Aug 10", tag: "system", unread: true },
    { id: 2, from: "Customer: Maria T.", subject: "Loved your weekend deal!", preview: "Hi! I just wanted to say thanks for the amazing discount last Saturday...", date: "Aug 8", tag: "customers" },
    { id: 3, from: "LD247 System", subject: "Slot Reminder", preview: "Don't forget to secure your coupon slots before Friday's cutoff.", date: "Aug 6", tag: "system", unread: true },
    { id: 4, from: "Customer: Dave R.", subject: "Question about redemption", preview: "Can I use your coffee coupon with my existing punch card?", date: "Aug 4", tag: "customers" },
  ];

  // Reviews (source of testimonials)
  const reviewsInitial: Review[] = [
    { id: 1, name: "A. Rivera", rating: 5, comment: "Exactly as listed. Staff was friendly — will be back!", date: "Aug 9", featured: true },
    { id: 2, name: "Marcus P.", rating: 5, comment: "Super easy to redeem. Platform is clean and legit.", date: "Aug 8" },
    { id: 3, name: "J. Chen", rating: 4, comment: "Great value. Would love to see more weekday lunch specials.", date: "Aug 6" },
  ];

  // Followers demo bootstrap
  const followersSeed: Follower[] = [
    { id: "f1", name: "Maria T.", since: "Aug 1", lastSeen: "Aug 8" },
    { id: "f2", name: "Dave R.", since: "Jul 28", lastSeen: "Aug 4" },
    { id: "f3", name: "Alex R.", since: "Aug 9", lastSeen: "Aug 9" },
  ];

  const [tab, setTab] = useState<"all" | "customers" | "system" | "reviews" | "testimonials" | "followers">("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<typeof templates[number]["key"]>("invite_follow");
  const [reviews, setReviews] = useState<Review[]>(reviewsInitial);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [singleRecipient, setSingleRecipient] = useState<string | null>(null); // for composing to a follower

  const [redemptions, setRedemptions] = useState<Redemption[]>([]); // for pending review requests

  const vendorId = "vendor-123"; // demo

  // Load followers + redemptions from localStorage (demo persistence)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FOLLOWERS_KEY);
      if (raw) setFollowers(JSON.parse(raw));
      else {
        localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(followersSeed));
        setFollowers(followersSeed);
      }
    } catch {
      setFollowers(followersSeed);
    }
    try {
      const r = localStorage.getItem(REDEEMS_KEY);
      setRedemptions(r ? JSON.parse(r) : []);
    } catch {
      setRedemptions([]);
    }
  }, []);

  function persistFollowers(next: Follower[]) {
    setFollowers(next);
    try {
      localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(next));
    } catch {}
  }

  function persistRedemptions(next: Redemption[]) {
    setRedemptions(next);
    try {
      localStorage.setItem(REDEEMS_KEY, JSON.stringify(next));
    } catch {}
  }

  // Derived lists
  const inboxRows = useMemo(() => {
    if (tab === "all") return messages;
    if (tab === "customers") return messages.filter((m) => m.tag === "customers");
    if (tab === "system") return messages.filter((m) => m.tag === "system");
    return []; // reviews/testimonials/followers handled separately
  }, [messages, tab]);

  const testimonials = reviews.filter((r) => r.featured);
  const pendingReviewRequests = redemptions.filter(
    (r) => r.userConfirmed && !r.reviewRequested
  );

  // Template rendering
  const followLink = makeFollowLink(vendorId);
  const reviewLink = makeReviewLink(vendorId, "deal-123");

  const templateSubject =
    selectedTemplate === "invite_follow"
      ? "Join our Followers for instant deal alerts"
      : selectedTemplate === "request_review"
      ? "Quick favor — how was your visit?"
      : selectedTemplate === "deal_announce"
      ? "New deal just dropped!"
      : "Thank you from our team";

  const templateBody =
    selectedTemplate === "invite_follow"
      ? `Hi {customer_name},\n\nWe’d love to keep you in the loop on fresh deals and pop-up offers.\nTap to follow us: ${followLink}\n\n— {vendor_name}`
      : selectedTemplate === "request_review"
      ? `Hi {customer_name},\n\nThanks for stopping by! Mind leaving a quick rating?\nLeave a review: ${reviewLink}\n\n— {vendor_name}`
      : selectedTemplate === "deal_announce"
      ? `Heads up {customer_name}!\n\n{deal_title} is live today only. Show this message to redeem.\nSee details: {deal_link}\n\n— {vendor_name}`
      : `Hi {customer_name},\n\nThanks for supporting us. Your feedback keeps us sharp!\nIf we can do anything better, reply here.\n\n— {vendor_name}`;

  // Review/Testimonial actions
  function toggleFeatured(id: number) {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r))
    );
  }

  // Followers actions
  function removeFollower(id: string) {
    persistFollowers(followers.filter((f) => f.id !== id));
  }
  function simulateNewFollower() {
    const id = Math.random().toString(36).slice(2, 7);
    const name = `Guest ${id}`;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    persistFollowers([{ id, name, since: today, lastSeen: today }, ...followers]);
  }

  // System: mark a review request as sent (so it stops showing)
  function markReviewRequested(id: string) {
    const next = redemptions.map((r) =>
      r.id === id ? { ...r, reviewRequested: true } : r
    );
    persistRedemptions(next);
  }

  return (
    <div className="p-6 md:p-8">
      {/* Title + New Message */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Messages</h1>
          <p className="text-sm text-gray-600">
            Communicate with customers, manage reviews, post testimonials, and reach followers.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setSingleRecipient(null); setComposerOpen(true); }}
            className="px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:opacity-90"
          >
            New Message
          </button>
          <button
            type="button"
            onClick={simulateNewFollower}
            className="px-3 py-2 rounded-xl border text-sm hover:bg-gray-100"
            title="Demo only: add a follower so you can test broadcast."
          >
            + Add Follower (demo)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { k: "all", label: "All" },
          { k: "customers", label: "Customers" },
          { k: "system", label: `System${pendingReviewRequests.length ? ` (${pendingReviewRequests.length})` : ""}` },
          { k: "reviews", label: "Reviews" },
          { k: "testimonials", label: "Testimonials" },
          { k: "followers", label: `Followers (${followers.length})` },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-3 py-1.5 rounded-full border text-sm ${
              tab === (t.k as any)
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content panes */}
      {tab === "system" ? (
        <div className="space-y-4">
          {/* Regular system messages table */}
          <div className="overflow-x-auto rounded-2xl border shadow-sm bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Preview</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages
                  .filter((m) => m.tag === "system")
                  .map((m) => (
                    <tr key={m.id} className={`border-t ${m.unread ? "font-semibold" : ""}`}>
                      <td className="px-4 py-3">{m.from}</td>
                      <td className="px-4 py-3">{m.subject}</td>
                      <td className="px-4 py-3 text-gray-600">{m.preview}</td>
                      <td className="px-4 py-3">{m.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pending review requests */}
          <div className="rounded-2xl border shadow-sm bg-white">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Pending Review Requests</h2>
                <p className="text-xs text-gray-500">
                  These redemptions were verified — send a review link and mark as requested.
                </p>
              </div>
            </div>
            {pendingReviewRequests.length === 0 ? (
              <div className="p-4 text-sm text-gray-600">Nothing pending. As redemptions are verified, they’ll appear here.</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Deal</th>
                    <th className="px-4 py-3 font-medium">Code</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {pendingReviewRequests.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="px-4 py-3">{new Date(r.date).toLocaleString()}</td>
                      <td className="px-4 py-3">{r.dealTitle}</td>
                      <td className="px-4 py-3">{r.code}</td>
                      <td className="px-4 py-3">{r.customer ?? "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1.5 rounded border hover:bg-gray-100"
                            onClick={() => navigator.clipboard.writeText(makeReviewLink("vendor-123", r.id))}
                          >
                            Copy Review Link
                          </button>
                          <button
                            className="px-3 py-1.5 rounded bg-orange-500 text-white"
                            onClick={() => markReviewRequested(r.id)}
                          >
                            Mark Requested
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : tab === "reviews" ? (
        <div className="rounded-2xl border shadow-sm bg-white">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Reviews & Testimonials</h2>
              <p className="text-xs text-gray-500">
                Review → one-click “Post to Merchant Page”.
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Average Rating:{" "}
              <span className="font-semibold">
                {(
                  reviews.reduce((s, r) => s + r.rating, 0) /
                  Math.max(1, reviews.length)
                ).toFixed(1)}{" "}
                / 5
              </span>{" "}
              <span className="text-orange-500">{star.repeat(4)}</span>
            </div>
          </div>
          <div className="divide-y">
            {reviews.map((r) => (
              <ReviewRow
                key={r.id}
                review={r}
                onToggleFeatured={() => toggleFeatured(r.id)}
              />
            ))}
          </div>
        </div>
      ) : tab === "testimonials" ? (
        <div className="rounded-2xl border shadow-sm bg-white">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Testimonials (Live on Merchant Page)
              </h2>
              <p className="text-xs text-gray-500">
                Unpost or preview your public section.
              </p>
            </div>
            <a
              href="/vendor/preview#testimonials"
              className="text-sm px-3 py-1.5 rounded-xl border hover:bg-gray-100"
            >
              Preview Merchant Page
            </a>
          </div>
          {testimonials.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">
              No testimonials posted yet. Go to the <b>Reviews</b> tab and click{" "}
              <b>Post to Merchant Page</b>.
            </div>
          ) : (
            <ul className="divide-y">
              {testimonials.map((t) => (
                <li
                  key={t.id}
                  className="p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-orange-500 text-sm">
                        {star.repeat(t.rating)}
                      </div>
                      <div className="text-xs text-gray-500">• {t.date}</div>
                    </div>
                    <p className="mt-1 text-sm text-gray-700 leading-snug">
                      {t.comment}
                    </p>
                  </div>
                  <div className="shrink-0 flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded border hover:bg-gray-100 text-sm"
                      onClick={() => toggleFeatured(t.id)}
                    >
                      Unpost
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : tab === "followers" ? (
        <div className="rounded-2xl border shadow-sm bg-white">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Followers</h2>
              <p className="text-xs text-gray-500">
                Send messages to all followers or individually.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setSelectedTemplate("invite_follow"); setComposerOpen(true); }}
              className="px-3 py-1.5 rounded-xl bg-orange-500 text-white text-sm"
            >
              Broadcast to Followers
            </button>
          </div>
          {followers.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">
              No followers yet. Use the <b>Invite to Follow</b> template in the composer to share your follow link.
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Since</th>
                  <th className="px-4 py-3 font-medium">Last Seen</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {followers.map((f) => (
                  <tr key={f.id} className="border-t">
                    <td className="px-4 py-3">{f.name}</td>
                    <td className="px-4 py-3">{f.since}</td>
                    <td className="px-4 py-3">{f.lastSeen ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 rounded border hover:bg-gray-100"
                          onClick={() => { setSingleRecipient(f.name); setSelectedTemplate("deal_announce"); setComposerOpen(true); }}
                        >
                          Message
                        </button>
                        <button
                          className="px-3 py-1.5 rounded border hover:bg-gray-100"
                          onClick={() => navigator.clipboard.writeText(makeFollowLink(vendorId))}
                          title="Copy your follow link"
                        >
                          Copy Invite Link
                        </button>
                        <button
                          className="px-3 py-1.5 rounded border hover:bg-gray-100"
                          onClick={() => removeFollower(f.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <>
          {/* Inbox table */}
          <div className="overflow-x-auto rounded-2xl border shadow-sm bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Preview</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {inboxRows.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => router.push(`/vendor/messages/${m.id}`)}
                    className={`border-t hover:bg-orange-50 cursor-pointer ${m.unread ? "font-semibold" : ""}`}
                  >
                    <td className="px-4 py-3">{m.from}</td>
                    <td className="px-4 py-3">{m.subject}</td>
                    <td className="px-4 py-3 text-gray-600">{m.preview}</td>
                    <td className="px-4 py-3">{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Placeholder */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {inboxRows.length} of {messages.length}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border rounded hover:bg-gray-100">
                Prev
              </button>
              <button className="px-3 py-1.5 border rounded hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Composer Drawer */}
      {composerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setComposerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold">Compose</h2>
              <button
                className="px-3 py-1.5 rounded border hover:bg-gray-100"
                onClick={() => setComposerOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Template selector */}
              <div>
                <label className="text-sm font-medium">Template</label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={selectedTemplate}
                  onChange={(e) =>
                    setSelectedTemplate(e.target.value as any)
                  }
                >
                  {templates.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Use merge tags like {"{customer_name}"} {"{vendor_name}"} {"{deal_title}"}.
                </p>
              </div>

              {/* Audience picker (demo) */}
              <div>
                <label className="text-sm font-medium">Audience</label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  defaultValue={singleRecipient ? "single" : "followers"}
                >
                  <option value="followers">All Followers</option>
                  <option value="redeemers7">Past Redeemers (7 days)</option>
                  <option value="single">Single Recipient</option>
                </select>
                {singleRecipient && (
                  <p className="text-xs text-gray-600 mt-1">
                    Sending to: <b>{singleRecipient}</b>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={templateSubject}
                  readOnly
                />
              </div>

              {/* Body */}
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="mt-1 w-full border rounded-lg px-3 py-2 h-48 leading-6"
                  value={templateBody}
                  readOnly
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(templateBody)}
                    className="px-3 py-1.5 rounded-xl bg-orange-500 text-white text-sm"
                  >
                    Copy Message
                  </button>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(makeFollowLink(vendorId))}
                    className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-100"
                  >
                    Copy Follow Link
                  </button>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(makeReviewLink(vendorId))}
                    className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-100"
                  >
                    Copy Review Link
                  </button>
                </div>
              </div>

              {/* Channel */}
              <div>
                <label className="text-sm font-medium">Channel</label>
                <div className="mt-1 flex gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked /> In-app
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" disabled /> SMS (soon)
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button className="px-4 py-2 rounded-xl border hover:bg-gray-100">
                  Save Draft
                </button>
                <button className="px-4 py-2 rounded-xl bg-orange-500 text-white">
                  Send
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-orange-50 p-3 text-xs text-orange-900">
              <b>Tip:</b> Post a deal? Broadcast to followers first for instant lift.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
