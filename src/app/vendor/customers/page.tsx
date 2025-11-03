"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type FollowerRow = {
  id: string;
  business_id: string;
  user_id: string | null;
  created_at: string;
};

type RewardClaimRow = {
  id: string;
  business_id: string;
  reward_text: string | null;
  code: string | null;
  created_at: string;
  expires_at: string | null;
};

type SurveyResponseRow = {
  id: string;
  business_id: string;
  created_at: string;
  respondent_email: string | null;
};

export default function CustomersPage() {
  const supabase = getSupabaseBrowserClient();

  // Data state
  const [businessId, setBusinessId] = useState<string | null>(null);

  const [followers, setFollowers] = useState<FollowerRow[]>([]);
  const [claims, setClaims] = useState<RewardClaimRow[]>([]);
  const [responses, setResponses] = useState<SurveyResponseRow[]>([]);

  const [loading, setLoading] = useState(true);

  // Helper to show timestamps nicely
  function niceTime(ts: string | null | undefined) {
    if (!ts) return "";
    return dayjs(ts).format("MMM D, h:mm A");
  }

  // 1. Get vendor business_id from the user's JWT
  useEffect(() => {
    async function loadBusiness() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        // not logged in or no token
        setBusinessId(null);
        setLoading(false);
        return;
      }

      try {
        // decode JWT body
        const payload = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        const bId = payload?.business_id ?? null;
        setBusinessId(bId || null);
      } catch (err) {
        console.warn("Could not decode JWT", err);
        setBusinessId(null);
      }
    }

    loadBusiness();
  }, [supabase]);

  // 2. Once we know the businessId, pull activity from followers / reward_claims / survey_responses
  useEffect(() => {
    if (!businessId) {
      // No business? Stop loading, render the "no business" message.
      setLoading(false);
      return;
    }

    async function loadActivity() {
      try {
        // Followers
        const { data: followerRows, error: followersErr } = await supabase
          .from("followers")
          .select("id, business_id, user_id, created_at")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (!followersErr && followerRows) {
          setFollowers(followerRows as FollowerRow[]);
        }

        // Reward claims
        const { data: claimRows, error: claimsErr } = await supabase
          .from("reward_claims")
          .select("id, business_id, reward_text, code, created_at, expires_at")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (!claimsErr && claimRows) {
          setClaims(claimRows as RewardClaimRow[]);
        }

        // Survey responses (who answered + when)
        const { data: responseRows, error: responsesErr } = await supabase
          .from("survey_responses")
          .select("id, business_id, created_at, respondent_email")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (!responsesErr && responseRows) {
          setResponses(responseRows as SurveyResponseRow[]);
        }
      } finally {
        // Even if some queries failed or were empty, we are done "loading"
        setLoading(false);
      }
    }

    loadActivity();
  }, [businessId, supabase]);

  // Grab the "latest" item from each list
  const latestFollower = followers[0] || null;
  const latestClaim = claims[0] || null;
  const latestResponse = responses[0] || null;

  //
  // ----------- RENDERING -----------
  //

  // Still loading?
  if (loading) {
    return (
      <main className="min-h-screen p-6 text-center text-gray-600">
        <p className="text-lg">Loading your customers...</p>
      </main>
    );
  }

  // No business linked to this user?
  if (!businessId) {
    return (
      <main className="min-h-screen p-6 flex flex-col items-center text-center text-gray-700">
        <h1 className="text-xl font-semibold mb-2">No business found</h1>
        <p className="text-sm max-w-md">
          This account is not linked to a business. Sign in with a vendor
          account or assign <code>owner_user_id</code> in the{" "}
          <code>businesses</code> table.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-6 flex flex-col gap-6 text-gray-800">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Customers & Followers</h1>
        <p className="text-sm text-gray-600">
          See who's following you, who claimed rewards, and who answered your
          survey.
        </p>
      </header>

      {/* Stat cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Followers card */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Followers
          </div>
          <div className="text-3xl font-bold mt-1">{followers.length}</div>
          <div className="text-[13px] text-gray-600 mt-2">
            {latestFollower
              ? `Newest follower joined ${niceTime(
                  latestFollower.created_at
                )}`
              : "No followers yet"}
          </div>
        </div>

        {/* Reward claims card */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Recent Reward
          </div>
          {latestClaim ? (
            <>
              <div className="font-semibold text-gray-900 text-sm mt-1">
                {latestClaim.reward_text || "Reward claimed"}
              </div>
              <div className="text-[13px] text-gray-600 mt-1">
                Code {latestClaim.code || "—"} at{" "}
                {niceTime(latestClaim.created_at)}
              </div>
              <div className="text-[11px] text-gray-500 mt-2">
                Expires {niceTime(latestClaim.expires_at) || "N/A"}
              </div>
            </>
          ) : (
            <div className="text-[13px] text-gray-600 mt-1">
              No reward claims yet
            </div>
          )}
        </div>

        {/* Survey responses card */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Recent Survey Response
          </div>
          {latestResponse ? (
            <>
              <div className="text-sm font-semibold text-gray-900 mt-1">
                {latestResponse.respondent_email || "Anonymous"}
              </div>
              <div className="text-[13px] text-gray-600 mt-1">
                Answered your survey {niceTime(latestResponse.created_at)}
              </div>
              <div className="text-[11px] text-gray-500 mt-2">
                (Detailed answers not shown yet)
              </div>
            </>
          ) : (
            <div className="text-[13px] text-gray-600 mt-1">
              No survey responses yet
            </div>
          )}
        </div>
      </section>

      {/* Activity feed */}
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Recent Activity
        </h2>

        {followers.length === 0 &&
        claims.length === 0 &&
        responses.length === 0 ? (
          <div className="text-[13px] text-gray-600">
            You don’t have any activity yet.
            <br />
            Share your survey link or today-only offer code with customers to
            start building your audience.
          </div>
        ) : (
          <ul className="space-y-3 text-[13px] text-gray-800">
            {claims.slice(0, 5).map((c) => (
              <li
                key={`claim-${c.id}`}
                className="border-b border-gray-100 pb-2 last:border-none"
              >
                <div className="font-semibold text-gray-900">
                  Reward claimed
                </div>
                <div className="text-gray-700">
                  {c.reward_text || "Reward"} — code {c.code || "—"}
                </div>
                <div className="text-[11px] text-gray-500">
                  {niceTime(c.created_at)}
                </div>
              </li>
            ))}

            {followers.slice(0, 5).map((f) => (
              <li
                key={`follower-${f.id}`}
                className="border-b border-gray-100 pb-2 last:border-none"
              >
                <div className="font-semibold text-gray-900">
                  New follower
                </div>
                <div className="text-gray-700">
                  Someone joined your audience.
                </div>
                <div className="text-[11px] text-gray-500">
                  {niceTime(f.created_at)}
                </div>
              </li>
            ))}

            {responses.slice(0, 5).map((r) => (
              <li
                key={`response-${r.id}`}
                className="border-b border-gray-100 pb-2 last:border-none"
              >
                <div className="font-semibold text-gray-900">
                  Survey response
                </div>
                <div className="text-gray-700">
                  {r.respondent_email || "Anonymous"} checked in.
                </div>
                <div className="text-[11px] text-gray-500">
                  {niceTime(r.created_at)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
