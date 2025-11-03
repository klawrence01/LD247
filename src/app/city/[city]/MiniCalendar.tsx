"use client";
import { useMemo } from "react";

type Props = { currentDate?: Date; onChange?: (d: Date) => void };

export default function MiniCalendar({ currentDate, onChange }: Props) {
  const cd = currentDate ?? new Date();
  const set = onChange ?? (() => {});

  const days = useMemo(() => {
    const out: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(cd);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + i);
      out.push(d);
    }
    return out;
  }, [cd]);

  const isSameDay = (a?: Date, b?: Date) =>
    !!a && !!b && a.toDateString() === b.toDateString();

  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });

  const goToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    set(d);
  };
  const goTomorrow = () => {
    const d = new Date(cd);
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    set(d);
  };
  const goWeekend = () => {
    const d = new Date(cd);
    const day = d.getDay();
    const toSat = (6 - day + 7) % 7;
    d.setDate(d.getDate() + toSat);
    d.setHours(0, 0, 0, 0);
    set(d);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-3">
        <button type="button" onClick={goToday} className="px-3 py-1 border rounded">Today</button>
        <button type="button" onClick={goTomorrow} className="px-3 py-1 border rounded">Tomorrow</button>
        <button type="button" onClick={goWeekend} className="px-3 py-1 border rounded">This Weekend</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <button
            type="button"
            key={i}
            onClick={() => set(d)}
            className={`p-2 rounded text-center ${
              isSameDay(d, cd) ? "bg-orange-500 text-white" : "bg-white border"
            }`}
          >
            {fmt(d)}
          </button>
        ))}
      </div>
    </div>
  );
}
