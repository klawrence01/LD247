'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

// Build a rolling 5-week window starting on the Sunday of this week
function buildWindow(weeks = 5) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // back to Sunday

  const out: { date: Date; iso: string; booked: boolean }[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    // Fake-book some days (25%)
    const booked = Math.random() < 0.25;
    out.push({ date: d, iso, booked });
  }
  return out;
}

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Slots() {
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => buildWindow(5), []);
  const [selected, setSelected] = useState<string[]>([]);

  const isBeyond30 = (d: Date) => {
    const limit = new Date(today);
    limit.setDate(today.getDate() + 30);
    return d > limit;
  };

  const toggle = (iso: string) =>
    setSelected((s) => (s.includes(iso) ? s.filter((x) => x !== iso) : [...s, iso]));

  // Split into weeks for rendering rows
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Purchase Slots / Availability</h1>
        <Link href="/vendor/dashboard" className="text-sm text-orange-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <p className="mb-4 text-gray-600">
        Tap the dates you want. <span className="font-medium">Booked</span> or
        <span className="font-medium"> &gt;30 days</span> are unavailable.
      </p>

      {/* Responsive calendar wrapper: on small screens allow horizontal scroll to avoid squish */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        {/* Keep a sensible minimum width so cells stay tappable on phones */}
        <div className="min-w-[560px]">
          {/* Weekday header */}
          <div className="grid grid-cols-7 border-b bg-gray-50">
            {DOW.map((d) => (
              <div key={d} className="px-2 py-2 text-center text-xs font-medium sm:text-sm">
                {d}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week, i) => (
            <div key={i} className="grid grid-cols-7 border-b last:border-b-0">
              {week.map(({ date, iso, booked }) => {
                const selectedNow = selected.includes(iso);
                const beyond = isBeyond30(date);
                const disabled = booked || beyond;
                const isToday = date.toDateString() === today.toDateString();

                // Style: compact, no big boxes; circular day pill with subtle states
                const base =
                  'mx-auto my-2 flex h-9 w-9 items-center justify-center rounded-full text-sm sm:h-10 sm:w-10';
                const state = disabled
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : selectedNow
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-500 text-white hover:opacity-90';

                return (
                  <div
                    key={iso}
                    className="flex flex-col items-center justify-center px-1 py-2 text-center"
                  >
                    <button
                      disabled={disabled}
                      onClick={() => toggle(iso)}
                      className={`${base} ${state} ${isToday && !disabled ? 'ring-2 ring-yellow-300' : ''}`}
                      title={date.toDateString()}
                    >
                      {date.getDate()}
                    </button>

                    {/* Show month label only on the 1st to save space */}
                    <div className="mt-1 text-[10px] leading-none text-gray-500">
                      {date.getDate() === 1 ? date.toLocaleString('default', { month: 'short' }) : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend + Purchase */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-green-500" /> Available
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500" /> Selected
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-gray-300" /> Booked / &gt;30 days
        </span>
      </div>

      {selected.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => {
              alert(`Purchased slots: ${selected.join(', ')}`);
              setSelected([]);
            }}
            className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
          >
            Purchase {selected.length} Slot{selected.length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}
