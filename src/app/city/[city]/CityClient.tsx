"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DealRow } from "./page";

type Props = {
  citySlug: string;
  cityTitle: string;
  initialDeals: DealRow[];
};

// --- tiny date helpers -------------------------------------
function startOfThisWeekMondayAnchored(d = new Date()) {
  // Always render Monday .. Sunday with *today* pinned into the correct slot,
  // but Monday shown in the leftmost position.
  const dt = new Date(d);
  const day = dt.getDay(); // 0..6 (Sun..Sat)
  const diff = (day === 0 ? -6 : 1 - day); // shift so Monday is 1
  dt.setDate(dt.getDate() + diff);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function addDays(d: Date, n: number) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return dt;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDay(d: Date) {
  return d.getDate();
}

function formatWeekdayLabel(i: number) {
  // 0..6 Monday..Sunday
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i];
}

// --- share helper ------------------------------------------
async function shareDeal(deal: DealRow, citySlug: string) {
  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/deal/${deal.id}`;
  const title = deal.title ?? "Local deal";
  const text = `${title} · ${deal.category ?? ""} · ${deal.price ? `$${deal.price.toFixed(2)}` : ""}`;
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Deal link copied to your clipboard.");
    }
  } catch (e) {
    console.error(e);
  }
}

// --- card ---------------------------------------------------
function DealCard({ deal, citySlug }: { deal: DealRow; citySlug: string }) {
  const vendor = deal.vendors ?? null;
  return (
    <div className="flex gap-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative h-32 w-48 flex-shrink-0 sm:h-40 sm:w-64">
        <Image
          src={deal.image_url || "/images/placeholder/deal-640x420.jpg"}
          alt={deal.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 256px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        {/* Vendor */}
        {vendor && (
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
              {vendor.logo_url ? (
                <Image
                  src={vendor.logo_url}
                  alt={vendor.name ?? "Vendor"}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              ) : null}
            </div>
            <span className="truncate">{vendor.name ?? "Vendor"}</span>
          </div>
        )}

        {/* Title */}
        <Link
          href={`/deal/${deal.id}`}
          className="line-clamp-1 text-lg font-semibold hover:underline"
        >
          {deal.title}
        </Link>

        {/* Category + address */}
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {deal.category && <span>{deal.category}</span>}
          {deal.address && (
            <>
              <span>•</span>
              <span className="truncate">{deal.address}</span>
            </>
          )}
        </div>

        {/* Price row */}
        <div className="mt-2 flex items-baseline gap-2">
          {typeof deal.price === "number" && (
            <div className="text-base font-semibold">
              ${deal.price.toFixed(2)}
            </div>
          )}
          {typeof deal.original_price === "number" && (
            <div className="text-sm text-muted-foreground line-through">
              (was ${deal.original_price.toFixed(2)})
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Link
            href={`/deal/${deal.id}`}
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View Deal
          </Link>
          <button
            type="button"
            onClick={() => shareDeal(deal, citySlug)}
            className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Share this deal
          </button>
        </div>
      </div>
    </div>
  );
}

// --- page client -------------------------------------------
export default function CityClient({ citySlug, cityTitle, initialDeals }: Props) {
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [query, setQuery] = useState("");

  // Monday-anchored week with *today* pinned to the right date box
  const weekStart = useMemo(() => startOfThisWeekMondayAnchored(activeDate), [activeDate]);
  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  // Filter by simple text (title/category/vendor/address)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialDeals;
    return initialDeals.filter((d) => {
      const vendorName = d.vendors?.name?.toLowerCase() ?? "";
      const addr = d.address?.toLowerCase() ?? "";
      return (
        (d.title?.toLowerCase() ?? "").includes(q) ||
        (d.category?.toLowerCase() ?? "").includes(q) ||
        vendorName.includes(q) ||
        addr.includes(q)
      );
    });
  }, [query, initialDeals]);

  return (
    <>
      {/* Controls row (city switcher omitted here; you already have top-nav) */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for pizza, barbers, coffee…"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring md:w-[380px]"
          />
        </div>

        {/* Mini calendar (Mon..Sun) */}
        <div className="rounded-xl border p-3">
          <div className="mb-2 flex gap-3 text-xs text-muted-foreground">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-9 text-center">
                {formatWeekdayLabel(i)}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {week.map((d, i) => {
              const isToday = isSameDay(d, new Date());
              const isActive = isSameDay(d, activeDate);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveDate(d)}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border text-sm",
                    isActive ? "bg-foreground text-background" : "",
                    !isActive && isToday ? "border-foreground" : "border-muted-foreground/40",
                  ].join(" ")}
                  title={d.toDateString()}
                >
                  {formatDay(d)}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Showing dates starting today →
          </div>
        </div>
      </div>

      {/* Deals list */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-xl border p-6 text-center text-muted-foreground">
            No active deals found for {cityTitle}.
          </div>
        ) : (
          filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} citySlug={citySlug} />
          ))
        )}
      </div>
    </>
  );
}
