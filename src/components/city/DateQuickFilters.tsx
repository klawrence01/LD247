// src/components/city/DateQuickFilters.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WhenKey } from "@/lib/dateFilters";
import { useCallback } from "react";

const OPTIONS: { key: WhenKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "weekend", label: "This Weekend" },
];

export default function DateQuickFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = (sp.get("when") as WhenKey) || "today";

  const setWhen = useCallback(
    (key: WhenKey) => {
      const params = new URLSearchParams(sp.toString());
      params.set("when", key);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, sp]
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map(({ key, label }) => {
        const isActive = current === key;
        return (
          <button
            key={key}
            onClick={() => setWhen(key)}
            className={[
              "px-4 py-2 rounded-full border text-sm",
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black",
            ].join(" ")}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
