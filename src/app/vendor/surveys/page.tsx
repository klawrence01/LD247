"use client";

import { useState } from "react";
import VendorNav from "@/components/vendor/VendorNav";

type TempResponse = {
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
};

export default function VendorSurveyToolsPage() {
  // ----- form state -----
  const [surveyTitle, setSurveyTitle] = useState("How was your visit?");
  const [question1, setQuestion1] = useState(
    "How would you rate your experience today (1-5)?"
  );
  const [question2, setQuestion2] = useState(
    "Is there anything we could do better next time?"
  );
  const [shareLink, setShareLink] = useState<string | null>(null);

  // ----- sample responses -----
  const [responses] = useState<TempResponse[]>([
    {
      name: "Maria G.",
      email: "maria@example.com",
      rating: 5,
      comment: "Amazing service. I'm definitely coming back!",
      date: "2025-10-21",
    },
    {
      name: "Tony R.",
      email: "tony@example.com",
      rating: 4,
      comment: "Pizza was on point, delivery was a little slow.",
      date: "2025-10-20",
    },
    {
      name: "Jess P.",
      email: "jess@example.com",
      rating: 2,
      comment: "The girl at the counter was rude.",
      date: "2025-10-19",
    },
  ]);

  // ----- actions -----
  function handleGenerateLink() {
    const fakeId = Math.random().toString(36).slice(2, 8);
    setShareLink(`https://localdeals247.com/survey/${fakeId}`);
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                Dashboard / Surveys & Feedback
              </p>
              <h1 className="text-2xl font-bold text-gray-900">Survey Tools</h1>
              <p className="text-sm text-gray-600">
                Ask customers how you did, read their answers, and send a
                follow-up.
              </p>
            </div>

            {/* Quick Action */}
            <div className="mt-4 sm:mt-0">
              <button
                className="inline-flex items-center rounded-xl bg-[#ff7a00] px-4 py-2 text-white text-sm font-semibold shadow hover:opacity-90 focus:outline-none"
                onClick={handleGenerateLink}
              >
                Generate New Survey Link
              </button>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Build / Share Survey */}
            <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Create / Edit Your Survey
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                This is what your customers will see after their visit. Keep it
                simple. We’ll collect the answers for you.
              </p>

              <div className="space-y-5">
                {/* Survey Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Survey Title
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Shown at the top of the survey. Example: “Tell us how we
                    did.”
                  </p>
                </div>

                {/* Question 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Question 1
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={question1}
                    onChange={(e) => setQuestion1(e.target.value)}
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Great for ratings or “Would you recommend us?”
                  </p>
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Question 2 (optional)
                  </label>
                  <textarea
                    className="w-full min-h-[70px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#ff7a00] focus:outline-none"
                    value={question2}
                    onChange={(e) => setQuestion2(e.target.value)}
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Use this for comments like “Anything we could do better?”
                  </p>
                </div>

                {/* Share Link / Instructions */}
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    How to use this:
                  </p>
                  <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
                    <li>
                      Click{" "}
                      <span className="font-semibold">
                        Generate New Survey Link
                      </span>{" "}
                      (top right).
                    </li>
                    <li>
                      Text that link or show it to the customer after their
                      visit.
                    </li>
                    <li>
                      Their answers will show on the right, under{" "}
                      <span className="font-semibold">Latest Responses</span>.
                    </li>
                  </ol>

                  {shareLink ? (
                    <div className="mt-4">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Your active survey link:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs shadow-sm text-gray-700"
                          value={shareLink}
                          readOnly
                        />
                        <button
                          className="text-[12px] font-semibold rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100"
                          onClick={() => {
                            navigator.clipboard.writeText(shareLink);
                          }}
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">
                        You can paste this in a text, email, or QR code.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-500 mt-3 italic">
                      (No active link yet. Click “Generate New Survey Link” to
                      create one.)
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT: Responses & Follow-Up */}
            <section className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <LatestResponsesPanel responses={responses} />
            </section>
          </div>

          {/* Footer note */}
          <div className="mt-10 text-[12px] text-gray-500 leading-relaxed">
            <p className="font-semibold text-gray-700 mb-1">
              Why this matters:
            </p>
            <p>
              High ratings and fast follow-up = better reviews, stronger repeat
              business, and proof that you take care of your customers. This
              page will become a weapon for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- subcomponents -----------------

function LatestResponsesPanel({ responses }: { responses: TempResponse[] }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Latest Responses
          </h2>
          <p className="text-sm text-gray-600">
            Read what customers said and follow up if needed.
          </p>
        </div>

        {/* stat card */}
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
            Avg Rating
          </p>
          <p className="text-xl font-bold text-gray-900 leading-none">
            {calcAverageRating(responses).toFixed(1)}
            <span className="text-sm text-gray-500">/5</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                Customer
              </th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                Rating
              </th>
              <th className="px-4 py-3 font-semibold">Comment</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">
                Follow Up
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {responses.map((r, i) => (
              <tr key={i} className="align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900 leading-tight">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-tight">
                    {r.email}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-1 text-[12px] font-semibold text-gray-800">
                    {r.rating} / 5
                  </div>
                </td>

                <td className="px-4 py-3 text-[13px] text-gray-700 max-w-[220px]">
                  {r.comment}
                </td>

                <td className="px-4 py-3 text-[12px] text-gray-600 whitespace-nowrap">
                  {formatDate(r.date)}
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    className="text-[12px] font-semibold rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100"
                    onClick={() => {
                      alert(
                        `Follow-up note to ${r.name} (${r.email})\n\nThis will open your Message Center so you can send a thank-you or fix an issue.`
                      );
                    }}
                  >
                    Send Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Engagement footnote */}
      <div className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        <p className="mb-2">
          Use <span className="font-semibold">Send Reply</span> for:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>“Thank you so much, please come back.”</li>
          <li>“Sorry about that, here’s a coupon for next time.”</li>
          <li>“Can we call you to fix this?”</li>
        </ul>
      </div>
    </>
  );
}

// helpers

function calcAverageRating(list: TempResponse[]) {
  if (!list.length) return 0;
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return total / list.length;
}

function formatDate(dateStr: string) {
  // "YYYY-MM-DD" -> "Oct 21, 2025"
  const [yyyy, mm, dd] = dateStr.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(mm, 10) - 1;
  const month = monthNames[monthIndex] || mm;
  return `${month} ${parseInt(dd, 10)}, ${yyyy}`;
}
