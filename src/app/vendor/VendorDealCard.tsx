"use client";
import * as React from "react";

type Props = {
  title?: string | null;
  imageUrl?: string | null;
  dealType?: string | null; // 'percent_off' | 'amount_off' | 'bogo' | ...
  value?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
  businessName?: string | null;
  businessSlug?: string | null;
  className?: string;
  ctaText?: string;
  onClick?: () => void;
  // NEW
  dateLabel?: string;
  description?: string | null;
};

const fmtDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const fmtBadgeFromStatus = (s?: string | null) => {
  switch ((s || "").toLowerCase()) {
    case "active":
      return { label: "Active", className: "bg-green-600 text-white" };
    case "upcoming":
      return { label: "Upcoming", className: "bg-amber-500 text-white" };
    case "expired":
      return { label: "Expired", className: "bg-gray-400 text-white" };
    default:
      return { label: "Deal", className: "bg-gray-900 text-white" };
  }
};

const fmtValue = (t?: string | null, v?: number | null) => {
  if (v == null || !isFinite(v)) return null;
  const type = (t || "").toLowerCase();
  if (type === "percent_off" || type === "percentage")
    return `${Math.round(v)}% OFF`;
  if (type === "amount_off") return `$${v} OFF`;
  return v;
};

export default function VendorDealCard({
  title,
  imageUrl,
  dealType,
  value,
  startDate,
  endDate,
  status,
  businessName,
  businessSlug,
  className = "",
  ctaText = "View deal",
  onClick,
  dateLabel,
  description,
}: Props) {
  const badge = fmtBadgeFromStatus(status);

  return (
    <article
      className={`flex gap-4 rounded-2xl border bg-white p-4 ${className}`}
    >
      {/* image */}
      <div className="h-20 w-28 overflow-hidden rounded-lg bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || "/images/pizza.jpg"}
          alt={title || "Deal"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            {title || "Deal"}
          </h3>
          {badge ? (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${badge.className}`}
            >
              {badge.label}
            </span>
          ) : null}
        </div>

        {/* NEW: show the calendar-selected date */}
        {dateLabel ? (
          <div className="text-xs text-gray-500 mt-0.5">{dateLabel}</div>
        ) : (
          <div className="text-xs text-gray-500">
            {fmtDate(startDate)} → {fmtDate(endDate)}
          </div>
        )}

        {/* NEW: show the bold offer line */}
        {description ? (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        ) : null}

        {businessName && (
          <div className="text-xs text-gray-600 mt-1">
            {businessSlug ? (
              <a className="underline" href={`/vendor/${businessSlug}`}>
                {businessName}
              </a>
            ) : (
              businessName
            )}
          </div>
        )}

        <div className="pt-2 flex items-center gap-2">
          {fmtValue(dealType, value) ? (
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
              {fmtValue(dealType, value)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onClick}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 active:bg-gray-100"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </article>
  );
}
