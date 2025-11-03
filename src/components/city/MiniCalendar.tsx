"use client";

import { addDays, formatDayLabel } from "@/utils/deals";
import { useMemo } from "react";

type Props = {
  today: Date;
  selectedDate: Date;
  onSelect: (d: Date) => void;
};

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function MiniCalendar({ today, selectedDate, onSelect }: Props) {
  // Build a 7-day window with "today" anchored in the left (Monday) cell
  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) arr.push(addDays(today, i));
    return arr;
  }, [today]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
      {days.map((d, idx) => {
        const active = isSameDay(d, selectedDate);
        return (
          <button
            key={idx}
            onClick={() => onSelect(d)}
            className={[
              "w-[92px] shrink-0 rounded-xl border px-2 py-2 text-center",
              active ? "border-orange-500 ring-1 ring-orange-500" : "border-gray-200",
            ].join(" ")}
          >
            <div className="text-[11px] font-semibold text-gray-600">{weekdays[idx]}</div>
            <div className="text-[15px] font-medium text-gray-900">{formatDayLabel(d)}</div>
          </button>
        );
      })}
    </div>
  );
}
