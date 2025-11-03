"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Deal = {
  id: number;
  title: string;
  vendor: string;
  vendorSlug: string;
  image: string;
  price: string;
  originalPrice?: string;
  date: string; // "YYYY-MM-DD"
};

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekend(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const dow = d.getDay(); // 0=Sun ... 6=Sat
  return dow === 0 || dow === 6;
}

export default function DealsGrid({ deals, cityName }: { deals: Deal[]; cityName: string }) {
  const [filter, setFilter] = useState<"all" | "today" | "tomorrow" | "weekend">("all");

  const today = useMemo(() => ymd(new Date()), []);
  const tomorrow = useMemo(() => {
    const t = new Date(); t.setDate(t.getDate() + 1);
    return ymd(t);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail as any;
      if (["today", "tomorrow", "weekend", "all"].includes(detail)) setFilter(detail);
    };
    window.addEventListener("ld247:filter" as any, handler);
    return () => window.removeEventListener("ld247:filter" as any, handler);
  }, []);

  const shown = useMemo(() => {
    if (filter === "all") return deals;
    if (filter === "today") return deals.filter((d) => d.date === today);
    if (filter === "tomorrow") return deals.filter((d) => d.date === tomorrow);
    return deals.filter((d) => isWeekend(d.date));
  }, [deals, filter, today, tomorrow]);

  const onImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    (e.currentTarget as HTMLImageElement).src = "/logo-ld247.png";
  };

  return (
    <section id="deals" style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Deals in {cityName}</h2>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          Showing: <strong style={{ textTransform: "capitalize" }}>{filter}</strong>
        </div>
      </div>

      {shown.length === 0 ? (
        <div style={{ padding: "1rem", border: "1px dashed #ccc", borderRadius: 12, background: "#fff" }}>
          No deals for that filter yet. Try another pill above 👆
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
          {shown.map((deal) => (
            <Link key={deal.id} href={`/vendor/${deal.vendorSlug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>
                <img src={deal.image} alt={deal.title} onError={onImgError}
                     style={{ width: "100%", height: "160px", objectFit: "contain", padding: "1rem" }} />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{deal.title}</h3>
                  <p style={{ margin: "0 0 0.5rem" }}>{deal.vendor}</p>
                  <p style={{ fontWeight: "bold", color: "#e63946" }}>
                    {deal.price}{" "}
                    {deal.originalPrice && (
                      <span style={{ textDecoration: "line-through", color: "#777", marginLeft: "0.5rem" }}>
                        {deal.originalPrice}
                      </span>
                    )}
                  </p>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>Date: {deal.date}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
