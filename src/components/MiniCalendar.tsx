// src/components/MiniCalendar.tsx
"use client";
import { useMemo, useState } from "react";

function formatYMD(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function MiniCalendar({
  initialDate,
  onSelect,
}: {
  initialDate?: string;
  onSelect?: (ymd: string) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [anchor, setAnchor] = useState<Date>(initialDate ? new Date(initialDate) : today);

  const week = useMemo(() => {
    // 7-day strip starting at anchor - place anchor at index 3 (center-ish)
    const start = new Date(anchor);
    start.setDate(anchor.getDate() - 3);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [anchor]);

  const select = (d: Date) => {
    setAnchor(d);
    onSelect?.(formatYMD(d));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <button className="text-sm px-2 py-1 border rounded" onClick={() => setAnchor(new Date(anchor.getTime() - 86400000))}>
          ◀
        </button>
        <div className="text-sm font-medium">
          {anchor.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
        </div>
        <button className="text-sm px-2 py-1 border rounded" onClick={() => setAnchor(new Date(anchor.getTime() + 86400000))}>
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {week.map((d) => {
          const isToday = formatYMD(d) === formatYMD(today);
          const isAnchor = formatYMD(d) === formatYMD(anchor);
          return (
            <button
              key={d.toISOString()}
              onClick={() => select(d)}
              className={
                "rounded-xl p-2 border text-center " +
                (isAnchor ? "border-black" : "border-gray-200") +
                (isToday ? " bg-gray-100" : "")
              }
              aria-label={d.toDateString()}
            >
              <div className="text-xs text-gray-500">{d.toLocaleDateString(undefined, { weekday: "short" })}</div>
              <div className="text-lg font-semibold">{d.getDate()}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
