"use client";

import VendorNav from "@/components/vendor/VendorNav";

export default function VendorAnalyticsPage() {
  // Fake data for now. Later this will come from Supabase.
  const followersTotal = 132;
  const followersNew = 14;

  const surveyResponsesThisWeek = 27;
  const averageRating = 4.7;

  const rewardsIssuedThisWeek = 19; // how many reward screens were shown
  const postReachThisWeek = 132; // how many people would have seen latest blast

  const lastPostHeadline = "Half Off Wings After 7pm";
  const lastPostWhen = "2 days ago";

  // mini engagement "chart" data
  // impressions = people who saw the deal/update
  // redemptions = people who actually used/redeemed
  const weeklyEngagement = [
    { label: "Mon", impressions: 42, redemptions: 6 },
    { label: "Tue", impressions: 55, redemptions: 8 },
    { label: "Wed", impressions: 61, redemptions: 10 },
    { label: "Thu", impressions: 47, redemptions: 4 },
    { label: "Fri", impressions: 73, redemptions: 12 },
    { label: "Sat", impressions: 88, redemptions: 15 },
    { label: "Sun", impressions: 39, redemptions: 5 },
  ];

  // We'll scale bar heights visually
  const maxImpressions = Math.max(...weeklyEngagement.map((d) => d.impressions));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* layout: sidebar + main content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: vendor nav */}
        <VendorNav />

        {/* RIGHT: analytics content */}
        <div className="flex-1 min-w-0">
          {/* Page header */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-1">
              Dashboard / Analytics
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Performance & Reach
            </h1>
            <p className="text-sm text-gray-600 max-w-xl">
              See how many people you’re reaching, how many came back,
              and what they’re saying about you.
            </p>
          </div>

          {/* TOP GRID: Core stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Followers */}
            <StatCard
              title="Your Followers"
              main={`${followersTotal}`}
              sub={`${followersNew} new this week`}
              desc="These are people who scanned your code, filled your survey, and said “yes, tell me when you’ve got something.”"
              highlight
            />

            {/* Surveys / Rating */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                    Survey Feedback
                  </div>
                  <div className="text-[12px] text-gray-500 leading-tight">
                    This week
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                    Avg Rating
                  </div>
                  <div className="text-xl font-bold text-gray-900 leading-none">
                    {averageRating.toFixed(1)}
                    <span className="text-sm text-gray-500">/5</span>
                  </div>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900 leading-none mb-1">
                {surveyResponsesThisWeek}
              </div>
              <div className="text-[12px] text-gray-600 leading-tight mb-4">
                survey responses this week
              </div>

              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-[12px] text-gray-700 leading-snug">
                You’re collecting real customer feedback. Use “Send Reply” to
                turn bad reviews into saved customers.
              </div>
            </div>

            {/* Rewards / Return visits */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                    Instant Rewards Used
                  </div>
                  <div className="text-[12px] text-gray-500 leading-tight">
                    This week
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                    Comebacks
                  </div>
                  <div className="text-xl font-bold text-gray-900 leading-none">
                    {rewardsIssuedThisWeek}
                  </div>
                </div>
              </div>

              <div className="text-[13px] text-gray-700 leading-snug mb-4">
                {rewardsIssuedThisWeek} customers saw your “Show this to the
                cashier” screen and got a deal. That’s {rewardsIssuedThisWeek} new
                chances to earn repeat money.
              </div>

              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-[12px] text-gray-700 leading-snug">
                Every reward someone claims is someone who’s now following
                you. You own that audience.
              </div>
            </div>
          </div>

          {/* MIDDLE GRID: Broadcast reach + Last post */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Broadcast reach / Last post */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                    Your Last Update
                  </div>
                  <div className="text-[12px] text-gray-500 leading-tight">
                    {lastPostWhen}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                    Reach
                  </div>
                  <div className="text-xl font-bold text-gray-900 leading-none">
                    {postReachThisWeek}
                  </div>
                  <div className="text-[12px] text-gray-500 leading-tight">
                    people saw it
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-4">
                <div className="text-[13px] font-bold text-gray-900 leading-snug mb-1">
                  {lastPostHeadline}
                </div>
                <div className="text-[12px] text-gray-700 leading-snug">
                  Posted to your followers. They saw it because they scanned
                  your code in the store. No ads. No begging social media.
                </div>
              </div>

              <div className="text-[12px] text-gray-600 leading-relaxed">
                <p className="mb-2 font-semibold text-gray-800">
                  Why this matters:
                </p>
                <p>
                  You pressed one button and {postReachThisWeek} people heard
                  you. That’s your own list. The more followers you collect,
                  the louder you get.
                </p>
              </div>
            </div>

            {/* Weekly engagement mini-chart */}
            <WeeklyEngagementChart data={weeklyEngagement} max={maxImpressions} />
          </div>

          {/* RECENT ACTIVITY TABLE */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              A quick summary of how people interacted with you.
            </p>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-700 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Event
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Impressions
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Redemptions
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Avg Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  <tr className="align-top">
                    <td className="px-4 py-3 text-[13px] text-gray-700 whitespace-nowrap">
                      Sat
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 text-[13px] leading-tight">
                        “Half Off Wings After 7pm” promo sent
                      </div>
                      <div className="text-[12px] text-gray-500 leading-tight">
                        Followers notified
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      88
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      15
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                  </tr>

                  <tr className="align-top">
                    <td className="px-4 py-3 text-[13px] text-gray-700 whitespace-nowrap">
                      Fri
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 text-[13px] leading-tight">
                        Rewards claimed in-store
                      </div>
                      <div className="text-[12px] text-gray-500 leading-tight">
                        “Show this to the cashier” screen used
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      12
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                  </tr>

                  <tr className="align-top">
                    <td className="px-4 py-3 text-[13px] text-gray-700 whitespace-nowrap">
                      Thu
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 text-[13px] leading-tight">
                        New survey responses
                      </div>
                      <div className="text-[12px] text-gray-500 leading-tight">
                        6 customers rated you
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      4.8 / 5
                    </td>
                  </tr>

                  <tr className="align-top">
                    <td className="px-4 py-3 text-[13px] text-gray-700 whitespace-nowrap">
                      Wed
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 text-[13px] leading-tight">
                        New followers captured
                      </div>
                      <div className="text-[12px] text-gray-500 leading-tight">
                        From your QR survey link
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">
                      —
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[12px] text-gray-500 leading-relaxed">
              “Impressions” = people who saw your post/deal.  
              “Redemptions” = people who showed the code and tried to use it.  
              This is how you measure real money, not just likes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * StatCard
 * Reusable little summary box for top metrics.
 */
function StatCard({
  title,
  main,
  sub,
  desc,
  highlight = false,
}: {
  title: string;
  main: string;
  sub?: string;
  desc?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl shadow p-6 border flex flex-col " +
        (highlight
          ? "bg-[#ff7a00] border-[#ff7a00] text-white"
          : "bg-white border-gray-100 text-gray-900")
      }
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            className={
              "text-sm font-semibold leading-tight " +
              (highlight ? "text-white" : "text-gray-900")
            }
          >
            {title}
          </div>
          {sub && (
            <div
              className={
                "text-[12px] leading-tight " +
                (highlight ? "text-white/80" : "text-gray-500")
              }
            >
              {sub}
            </div>
          )}
        </div>
      </div>

      <div
        className={
          "text-3xl font-bold leading-none mb-1 " +
          (highlight ? "text-white" : "text-gray-900")
        }
      >
        {main}
      </div>

      {desc && (
        <div
          className={
            "text-[12px] leading-snug " +
            (highlight ? "text-white/90" : "text-gray-600")
          }
        >
          {desc}
        </div>
      )}
    </div>
  );
}

/**
 * WeeklyEngagementChart
 * A simple bar visualization: impressions vs redemptions by day.
 * We’re not importing any libs yet, so we fake a chart with div heights.
 */
function WeeklyEngagementChart({
  data,
  max,
}: {
  data: { label: string; impressions: number; redemptions: number }[];
  max: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-sm font-semibold text-gray-900 leading-tight">
            Weekly Engagement
          </div>
          <div className="text-[12px] text-gray-500 leading-tight">
            Impressions & redemptions by day
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex items-end gap-4 h-40">
        {data.map((d, i) => {
          // scale bars: impressions = tall bar, redemptions = short overlay bar
          const impressionsHeight = Math.max(
            8,
            Math.round((d.impressions / max) * 120)
          );
          const redemptionsHeight = Math.max(
            4,
            Math.round((d.redemptions / max) * 120)
          );

          return (
            <div key={i} className="flex flex-col items-center flex-1 min-w-[28px]">
              {/* bars */}
              <div className="relative w-6 flex flex-col justify-end">
                {/* impressions bar */}
                <div
                  className="w-full rounded-t-md bg-gray-300"
                  style={{ height: impressionsHeight + "px" }}
                  title={`${d.impressions} impressions`}
                />
                {/* redemptions bar (overlay front as a slimmer bar) */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 rounded-t-md bg-[#ff7a00]"
                  style={{ height: redemptionsHeight + "px" }}
                  title={`${d.redemptions} redemptions`}
                />
              </div>

              {/* labels */}
              <div className="mt-2 text-center">
                <div className="text-[11px] font-semibold text-gray-800 leading-tight">
                  {d.label}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight">
                  {d.impressions} / {d.redemptions}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-300" />
          <span>Impressions (people who saw your deal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[#ff7a00]" />
          <span>Redemptions (people who tried to use it)</span>
        </div>
      </div>

      <div className="text-[12px] text-gray-600 leading-relaxed mt-6">
        <p className="mb-2 font-semibold text-gray-800">
          What this means:
        </p>
        <p>
          High impressions means people are watching you. High redemptions
          means people are actually walking in and spending money. If you’re
          getting views but not redemptions, tighten the offer.
        </p>
      </div>
    </div>
  );
}
