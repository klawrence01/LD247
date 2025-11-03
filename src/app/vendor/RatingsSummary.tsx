"use client";
import * as React from "react";

type RatingsSummaryProps = {
  rating?: number | null;
  count?: number | null;
  totalReviews?: number | null;
  breakdown?: Partial<{ five: number; four: number; three: number; two: number; one: number }>;
  size?: "sm" | "md" | "lg";
};

export default function RatingsSummary({
  rating: _rating,
  count,
  totalReviews,
  breakdown,
  size = "md",
}: RatingsSummaryProps) {
  const rating = typeof _rating === "number" ? _rating : 0;
  const reviews = typeof count === "number" ? count : (typeof totalReviews === "number" ? totalReviews : 0);
  const ratingFixed = Number.isFinite(rating) ? rating : 0;
  const reviewsInt = Number.isFinite(reviews) ? Math.max(0, Math.floor(reviews)) : 0;

  const cls = {
    wrap: "rounded-xl border p-4",
    header: size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg",
    score: size === "lg" ? "text-4xl" : size === "sm" ? "text-2xl" : "text-3xl",
    star: size === "lg" ? "h-5 w-5" : size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
  };

  const rows = breakdown
    ? [
        { label: "5", value: breakdown.five ?? 0 },
        { label: "4", value: breakdown.four ?? 0 },
        { label: "3", value: breakdown.three ?? 0 },
        { label: "2", value: breakdown.two ?? 0 },
        { label: "1", value: breakdown.one ?? 0 },
      ]
    : [];

  const totalFromBreakdown = rows.reduce((s, r) => s + (Number.isFinite(r.value) ? r.value : 0), 0) || 0;
  const pct = (n: number) => (!totalFromBreakdown || !Number.isFinite(n) || n < 0 ? 0 : Math.round((n / totalFromBreakdown) * 100));

  return (
    <div className={cls.wrap}>
      <div className="flex items-end justify-between">
        <div>
          <div className={`font-semibold ${cls.header}`}>Ratings</div>
          <div className="text-sm text-gray-500">What customers are saying</div>
        </div>
        <div className="text-right">
          <div className={`font-bold leading-none ${cls.score}`}>{ratingFixed.toFixed(1)}</div>
          <div className="mt-1 text-gray-500">({reviewsInt.toLocaleString()})</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1" aria-label={`${ratingFixed.toFixed(1)} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const full = Math.floor(ratingFixed);
          const half = ratingFixed - full >= 0.5 && i === full;
          const filled = i < full;
          return (
            <svg key={i} viewBox="0 0 24 24" className={`${cls.star} text-yellow-500`} aria-hidden>
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {half && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
            </svg>
          );
        })}
        <span className="ml-2 text-sm text-gray-600">{ratingFixed.toFixed(1)} / 5</span>
      </div>

      {rows.length > 0 && (
        <div className="mt-4 grid gap-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <div className="w-6 text-right text-xs text-gray-600">{r.label}★</div>
              <div className="flex-1 bg-gray-200/60 rounded h-2 overflow-hidden">
                <div className="bg-gray-900 h-2" style={{ width: `${pct(r.value)}%` }} />
              </div>
              <div className="w-14 text-right text-xs text-gray-600">{pct(r.value)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
