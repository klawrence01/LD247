"use client";

import { useState } from "react";

export default function ChoosePlanBlock({
  leadId,
  regionTag,
}: {
  leadId: string;
  regionTag: string;
}) {
  const [submittingPlan, setSubmittingPlan] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function pickPlan(plan: "self-managed" | "done-for-you") {
    try {
      setSubmittingPlan(plan);
      setErrorMsg(null);

      const res = await fetch(`/api/leads/${leadId}/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const body = await res.json();
        setErrorMsg(body.error || "Could not save your choice.");
        setSubmittingPlan(null);
        return;
      }

      const body = await res.json();
      if (body.plan_choice === "self-managed") {
        setConfirmation(
          "You're locked in at $49/mo (Self-Managed). You stay visible in " +
            regionTag +
            " and control your own specials."
        );
      } else if (body.plan_choice === "done-for-you") {
        setConfirmation(
          "You're locked in at $99/mo (Done-For-You). We'll handle the promos and keep you active in " +
            regionTag +
            "."
        );
      }

      setSubmittingPlan(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Something went wrong.");
      setSubmittingPlan(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="text-sm font-semibold text-gray-900">
        Pick your path going forward:
      </div>

      <div className="grid gap-4">
        {/* Self-Managed */}
        <button
          onClick={() => pickPlan("self-managed")}
          disabled={!!submittingPlan}
          className="w-full text-left rounded-2xl border border-gray-300 bg-white shadow-sm p-4 hover:bg-gray-50 disabled:opacity-50"
        >
          <div className="text-base font-bold text-gray-900 leading-tight">
            $49/mo — Self-Managed
          </div>
          <div className="text-[13px] text-gray-700 leading-snug mt-1">
            You control your own specials and updates. Stay visible in {regionTag}.
          </div>
          <div className="text-[11px] text-gray-500 leading-snug mt-2">
            Best if you like promoting certain days, happy hours, or slow times.
          </div>
          {submittingPlan === "self-managed" && (
            <div className="text-[11px] text-orange-600 mt-2">
              Saving your choice…
            </div>
          )}
        </button>

        {/* Done-For-You */}
        <button
          onClick={() => pickPlan("done-for-you")}
          disabled={!!submittingPlan}
          className="w-full text-left rounded-2xl border border-gray-900 bg-gray-900 text-white shadow-sm p-4 hover:bg-gray-800 disabled:opacity-50"
        >
          <div className="text-base font-bold leading-tight">
            $99/mo — Done For You
          </div>
          <div className="text-[13px] leading-snug mt-1">
            We create and post offers for you. You approve, we handle it.
          </div>
          <div className="text-[11px] text-gray-300 leading-snug mt-2">
            Best if you’re busy and just want results.
          </div>
          {submittingPlan === "done-for-you" && (
            <div className="text-[11px] text-orange-300 mt-2">
              Saving your choice…
            </div>
          )}
        </button>
      </div>

      {confirmation && (
        <div className="text-[12px] font-semibold text-green-700 bg-green-50 border border-green-300 rounded-xl p-3 leading-snug text-left">
          {confirmation}
        </div>
      )}

      {errorMsg && (
        <div className="text-[11px] text-red-600 leading-snug">{errorMsg}</div>
      )}

      <div className="text-[11px] text-gray-500 leading-relaxed max-w-sm mx-auto text-center">
        Your Local Deals 24/7 rep will stay with you either way.
      </div>
    </section>
  );
}
