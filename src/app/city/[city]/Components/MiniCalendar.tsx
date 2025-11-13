"use client";

import { useState } from "react";

type MiniCalendarProps = {
  // you were calling it with city={city}, so let's accept it
  city?: string;
  initialDate?: string; // "2025-11-01" style if you ever want it
  onSelect?: (ymd: string) => void;
};

export default function MiniCalendar({
  city,
  initialDate,
  onSelect,
}: MiniCalendarProps) {
  // just keep a simple selected date string
  const [selected, setSelected] = useState<string>(
    initialDate ?? todayYMD()
  );

  function handleSelect(ymd: string) {
    setSelected(ymd);
    onSelect?.(ymd);
  }

  // very dumb calendar: just shows today + 6 days
  const days = makeNextNDays(7);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="border-b px-3 py-2">
        <p className="text-sm font-semibold">Availability</p>
        {city ? (
          <p className="text-xs text-muted-foreground">
            {city}
          </p>
        ) : null}
      </div>
      <div className="flex gap-2 p-3 overflow-x-auto">
        {days.map((d) => {
          const isSelected = d.ymd === selected;
          return (
            <button
              key={d.ymd}
              type="button"
              onClick={() => handleSelect(d.ymd)}
              className={
                "flex flex-col items-center justify-center rounded-md border px-3 py-2 text-xs min-w-[3.25rem]" +
                (isSelected
                  ? " bg-primary text-primary-foreground border-primary"
                  : " bg-background/50 hover:bg-muted")
              }
            >
              <span className="font-medium">{d.day}</span>
              <span className="text-[0.6rem] uppercase tracking-wide text-muted-foreground">
                {d.weekday}
              </span>
            </button>
          );
        })}
      </div>
      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        Selected: {selected}
      </div>
    </div>
  );
}

function todayYMD() {
  const d = new Date();
  return toYMD(d);
}

function makeNextNDays(n: number) {
  const out: { ymd: string; day: string; weekday: string }[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      ymd: toYMD(d),
      day: d.getDate().toString(),
      weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }
  return out;
}

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
