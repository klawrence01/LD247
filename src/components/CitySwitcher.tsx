"use client";

import { useRouter } from "next/navigation";
import { CITIES } from "@/lib/cities";

export default function CitySwitcher({ current }: { current: string }) {
  const router = useRouter();
  const value = current?.toLowerCase() || "atlanta";
  const isKnown = CITIES.some(c => c.slug === value);
  const safe = isKnown ? value : "atlanta";

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-gray-500">City</span>
      <select
        className="rounded-xl border px-3 py-2"
        value={safe}
        onChange={(e) => router.push(`/city/${e.target.value}`)}
      >
        {CITIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
