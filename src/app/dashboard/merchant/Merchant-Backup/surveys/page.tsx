"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ uses your existing client

// Shape of each survey row we expect back from Supabase
type SurveyRecord = {
  id: string;
  business_id: string;
  question: string;
  type: "rating-1-5" | "yes-no";
  created_at: string;
  responses: number | null;
  avg_score: number | null;
  yes_percent: number | null;
};

export default function SurveysPage() {
  //
  // ---------------------------
  // LOCAL STATE
  // ---------------------------
  //
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);

  const [question, setQuestion] = useState("");
  const [surveyType, setSurveyType] = useState<"rating-1-5" | "yes-no">(
    "rating-1-5"
  );

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // TODO:
  // Replace this with the REAL business_id for the logged-in merchant.
  // Until you wire that up, page will load, and inserts will fail cleanly with a helpful message.
  const currentBusinessId = "REPLACE_WITH_REAL_BUSINESS_ID";

  //
  // ---------------------------
  // LOAD EXISTING SURVEYS
  // ---------------------------
  //
  async function loadSurveys() {
    setLoading(true);
    setErrorMsg(null);

    // If we don't yet know which business is logged in, don't even query.
    if (
      !currentBusinessId ||
      currentBusinessId === "REPLACE_WITH_REAL_BUSINESS_ID"
    ) {
      setSurveys([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("surveys")
      .select(
        `
          id,
          business_id,
          question,
          type,
          created_at,
          responses,
          avg_score,
          yes_percent
        `
      )
      .eq("business_id", currentBusinessId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading surveys:", error);
      setErrorMsg("Couldn't load surveys. Please try again.");
      setSurveys([]);
      setLoading(false);
      return;
    }

    setSurveys((data ?? []) as SurveyRecord[]);
    setLoading(false);
  }

  useEffect(() => {
    loadSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // ---------------------------
  // CREATE / SAVE NEW SURVEY
  // ---------------------------
  //
  async function handleCreateSurvey(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!question.trim()) {
      setErrorMsg("Write the question you want to ask.");
      return;
    }

    if (
      !currentBusinessId ||
      currentBusinessId === "REPLACE_WITH_REAL_BUSINESS_ID"
    ) {
      setErrorMsg(
        "No business_id found. Hook up currentBusinessId before saving."
      );
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("surveys").insert([
      {
        business_id: currentBusinessId,
        question: question.trim(),
        type: surveyType,
        // responses / avg_score / yes_percent will default or be updated later
      },
    ]);

    if (error) {
      console.error("Error creating survey:", error);
      setErrorMsg("Couldn't save your question. Please try again.");
      setSaving(false);
      return;
    }

    // reset form
    setQuestion("");
    setSurveyType("rating-1-5");
    setSaving(false);

    setSuccessMsg(
      "Saved. Next step: go to Messaging Center → Send a Note and paste this question to your list."
    );

    // Refresh list so new question shows up
    loadSurveys();
  }

  //
  // ---------------------------
  // RENDER
  // ---------------------------
  //
  return (
    <main className="p-6 text-gray-900">
      {/* Header / Intro */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold mb-2">Survey Tools</h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
          Ask your customers one simple question and see the answers here.
          <br />
          Use this to catch problems fast, thank happy customers, and collect
          real testimonials (not fake reviews).
        </p>
      </div>

      {/* Why this matters */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-8">
        <h2 className="text-lg font-semibold text-black mb-2">
          How this helps you
        </h2>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
          <li>
            Somebody had a bad time? Reach out fast and fix it before it turns
            into a 1-star blast online.
          </li>
          <li>
            Somebody loved you? Ask them for a testimonial you can post on your
            page.
          </li>
          <li>
            You see the truth in your own numbers — not guesses.
          </li>
        </ul>
      </div>

      {/* Create New Survey */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-10 max-w-xl">
        <h2 className="text-lg font-bold text-black mb-3">
          Create a New Question
        </h2>

        <form onSubmit={handleCreateSurvey} className="space-y-4 text-sm">
          {/* error / success messaging */}
          {errorMsg && (
            <div className="rounded-md border border-red-400 bg-red-50 text-red-700 px-3 py-2 text-[13px]">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="rounded-md border border-green-400 bg-green-50 text-green-700 px-3 py-2 text-[13px]">
              {successMsg}
            </div>
          )}

          {/* Question text */}
          <div>
            <label
              htmlFor="question"
              className="block font-medium text-gray-800 mb-1"
            >
              What do you want to ask?
            </label>

            <input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder='e.g. "How was your visit today?"'
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />

            <p className="text-[13px] text-gray-500 mt-1 leading-snug">
              Keep it short. One question works better than a giant form.
            </p>
          </div>

          {/* Type selector */}
          <div>
            <label className="block font-medium text-gray-800 mb-1">
              Answer Type
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="surveyType"
                  value="rating-1-5"
                  checked={surveyType === "rating-1-5"}
                  onChange={() => setSurveyType("rating-1-5")}
                />
                <span className="text-gray-800">
                  Star rating (1 to 5 stars)
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="surveyType"
                  value="yes-no"
                  checked={surveyType === "yes-no"}
                  onChange={() => setSurveyType("yes-no")}
                />
                <span className="text-gray-800">
                  Yes / No (“Would you recommend us?”)
                </span>
              </label>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className={`bg-black text-white font-semibold rounded-md px-4 py-2 hover:bg-gray-900 ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Question"}
          </button>

          <p className="text-[13px] text-gray-500 leading-snug">
            After you save it, go to{" "}
            <span className="font-medium text-gray-900">
              Messaging Center
            </span>{" "}
            → “Send a Note,” and drop this question to your list.
          </p>
        </form>
      </section>

      {/* Existing Surveys / Results */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-16">
        <h2 className="text-lg font-bold text-black mb-3">
          Recent Questions & Results
        </h2>

        {/* If we don't know the business yet, tell them why list is empty */}
        {!loading &&
        ( !currentBusinessId ||
          currentBusinessId === "REPLACE_WITH_REAL_BUSINESS_ID") ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            Connect this dashboard to your business_id to see results here.
          </div>
        ) : loading ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            Loading...
          </div>
        ) : surveys.length === 0 ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            You haven’t asked anything yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm text-sm">
            {surveys.map((s) => (
              <li
                key={s.id}
                className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-black break-words">
                    {s.question}
                  </div>

                  <div className="text-gray-600 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    {/* when it was asked */}
                    <div className="text-[13px]">
                      Asked{" "}
                      {new Date(s.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>

                    {/* summary stats */}
                    <div className="text-[13px] text-gray-500">
                      {s.type === "rating-1-5" ? (
                        <>
                          {s.responses ?? 0} responses • Avg{" "}
                          <span className="font-medium text-black">
                            {s.avg_score !== null &&
                            s.avg_score !== undefined
                              ? Number(s.avg_score).toFixed(1)
                              : "0.0"}
                            /5
                          </span>
                        </>
                      ) : (
                        <>
                          {s.responses ?? 0} responses •{" "}
                          <span className="font-medium text-black">
                            {s.yes_percent !== null &&
                            s.yes_percent !== undefined
                              ? `${s.yes_percent}% said Yes`
                              : "0% said Yes"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right md:text-left">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    onClick={() => {
                      // future: route to detailed drill-down
                      alert(
                        `This would open details for survey "${s.question}".`
                      );
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[13px] text-gray-500 leading-snug mt-4">
          Tip: If someone gives you 5 stars, ask if you can use their words on
          your page under “Testimonials.”
        </p>
      </section>

      {/* Footer note */}
      <footer className="text-[13px] text-gray-500 leading-snug border-t border-gray-200 pt-4">
        This is private feedback for you. It does not post publicly unless you
        choose to share it.
      </footer>
    </main>
  );
}
