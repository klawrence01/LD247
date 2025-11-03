"use client";

import { useState, useTransition } from "react";
import { featureDealForCity } from "./actions";
import { useRouter } from "next/navigation";

export default function FeatureDealButton({
  businessId,
  defaultCity,
}: {
  businessId: string;
  defaultCity: string | null;
}) {
  const router = useRouter();
  const [city, setCity] = useState(defaultCity || "");
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleFeature(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!city.trim()) {
      setMsg("City is required.");
      return;
    }

    startTransition(async () => {
      const resp = await featureDealForCity({
        businessId,
        city: city.trim(),
      });

      if (!resp.ok) {
        setMsg(resp.message || "Failed to feature deal.");
        return;
      }

      setMsg("Deal is now featured for that city.");
      router.refresh();
    });
  }

  return (
    <div className="text-[13px] bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
        Feature This Deal Citywide
      </div>

      <form onSubmit={handleFeature} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-neutral-400 uppercase tracking-wide font-semibold">
            City / Market
          </label>

          <input
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-100 text-[13px] placeholder-neutral-600 outline-none"
            placeholder="Hartford, CT"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="flex flex-wrap gap-2 text-[11px] text-neutral-300">
            {["Hartford, CT", "New Haven, CT", "Springfield, MA"].map(
              (preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCity(preset)}
                  className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-md px-2 py-1 leading-none"
                >
                  {preset}
                </button>
              )
            )}
          </div>
        </div>

        {msg && (
          <div className="text-[12px] text-neutral-300 bg-neutral-800/40 border border-neutral-700 rounded-lg px-2 py-2 leading-snug">
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-[12px] rounded-lg px-3 py-2 border border-orange-500/40 w-full text-center"
        >
          {isPending ? "Featuring…" : "Feature Deal"}
        </button>

        <p className="text-[11px] text-neutral-500 leading-snug">
          This will push their hero deal as the top spotlight in that city.
        </p>
      </form>
    </div>
  );
}
