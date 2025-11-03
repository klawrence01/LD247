"use client";

import { useState, useTransition } from "react";
import { submitInboundLead } from "./actions";

export default function CityLeadForm({
  city,
}: {
  city: string;
}) {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!businessName.trim()) {
      setMsg("Please enter your business name.");
      return;
    }
    if (!phone.trim()) {
      setMsg("Please enter a phone number.");
      return;
    }

    startTransition(async () => {
      const resp = await submitInboundLead({
        city,
        business_name: businessName.trim(),
        contact_phone: phone.trim(),
        best_time: bestTime.trim(),
      });

      if (!resp.ok) {
        setMsg(resp.message || "Something went wrong. Please try again.");
        return;
      }

      // success: clear form + show thank you
      setBusinessName("");
      setPhone("");
      setBestTime("");
      setMsg(
        "Got it. A Local Deals 24/7 rep will reach out shortly."
      );
    });
  }

  return (
    <div className="rounded-2xl bg-white border border-neutral-300 shadow-sm p-6">
      <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
        Own a business in {city}?
      </div>
      <h3 className="text-lg font-bold text-neutral-900 leading-tight">
        Want to be featured here?
      </h3>
      <p className="text-[13px] text-neutral-600 leading-relaxed mt-2">
        Free to talk. No obligation. We&apos;ll call or stop in and
        explain how this works.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]"
      >
        {/* Business Name */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-[12px] text-neutral-700 font-medium">
            Business Name *
          </label>
          <input
            className="bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            placeholder="Sofia's Bakery"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] text-neutral-700 font-medium">
            Best Phone *
          </label>
          <input
            className="bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            placeholder="(860) 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Best Time */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] text-neutral-700 font-medium">
            Best Time To Reach You
          </label>
          <input
            className="bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            placeholder="Mornings / after lunch / etc"
            value={bestTime}
            onChange={(e) => setBestTime(e.target.value)}
          />
        </div>

        {/* Status / Message */}
        {msg && (
          <div className="md:col-span-2 text-[12px] leading-snug rounded-lg border px-3 py-2"
            style={{
              backgroundColor: "rgb(255 247 237)", // orange-50
              borderColor: "rgb(254 215 170)", // orange-200
              color: "rgb(124 45 18)", // orange-800
            }}
          >
            {msg}
          </div>
        )}

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[13px] rounded-lg px-3 py-2 border border-orange-500/40 text-center shadow-sm"
          >
            {isPending ? "Sending…" : "Get Featured"}
          </button>
          <div className="text-[11px] text-neutral-500 leading-snug text-center mt-2">
            We&apos;ll reach out. You don&apos;t pay anything until you
            say yes.
          </div>
        </div>
      </form>
    </div>
  );
}
