"use client";

import { useState } from "react";

export default function ActivateBlock({ leadId }: { leadId: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleActivate() {
    try {
      setSubmitting(true);
      setErrorMsg(null);

      const res = await fetch(`/api/leads/${leadId}/activate`, {
        method: "POST",
      });

      if (!res.ok) {
        const body = await res.json();
        setErrorMsg(body.error || "Could not activate.");
        setSubmitting(false);
        return;
      }

      // redirect to live confirmation page
      window.location.href = `/vendor/lead/${leadId}/live`;
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-3 text-center">
      <div className="text-sm font-semibold text-gray-900">
        Ready to turn this on?
      </div>

      <button
        onClick={handleActivate}
        disabled={submitting}
        className="w-full rounded-lg bg-orange-600 text-white font-semibold text-sm py-3 hover:bg-orange-700 disabled:opacity-50"
      >
        {submitting ? "Activating..." : "Start My 30-Day Promo"}
      </button>

      <div className="text-[11px] text-gray-500 leading-snug">
        No charge today. At the end of 30 days, you’ll choose:
        <br />
        <span className="font-medium text-gray-900">$49/mo self-managed</span>{" "}
        or{" "}
        <span className="font-medium text-gray-900">$99/mo done-for-you</span>
        .
      </div>

      {errorMsg && (
        <div className="text-[11px] text-red-600 mt-2">{errorMsg}</div>
      )}

      <div className="text-center text-[11px] text-gray-500 leading-relaxed">
        Your Local Deals 24/7 rep can help set up your first “attention grabber”
        deal so you start strong.
      </div>
    </section>
  );
}
