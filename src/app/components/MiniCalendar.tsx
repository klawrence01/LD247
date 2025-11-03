"use client";

import React from "react";

function fire(filter: "all" | "today" | "tomorrow" | "weekend") {
  window.dispatchEvent(new CustomEvent("ld247:filter", { detail: filter }));
  const el = document.getElementById("deals");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<{ label: string; isEmpty?: boolean; isToday?: boolean }> = [];
  for (let i = 0; i < firstDay; i++) cells.push({ label: "", isEmpty: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === now.getDate();
    cells.push({ label: String(d), isToday });
  }
  while (cells.length % 7 !== 0) cells.push({ label: "", isEmpty: true });

  return (
    <section style={{ padding: "2rem", borderTop: "1px solid #eee", background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>
          {monthName} {year}
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button style={pillBtn} onClick={() => fire("today")}>Today</button>
          <button style={pillBtn} onClick={() => fire("tomorrow")}>Tomorrow</button>
          <button style={pillBtn} onClick={() => fire("weekend")}>This Weekend</button>
          <button style={pillBtn} onClick={() => fire("all")}>All</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: "#666" }}>
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            style={{
              height: 34,
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              background: c.isEmpty ? "#f9f9f9" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: c.isToday ? 700 : 500,
              boxShadow: c.isToday ? "inset 0 0 0 2px #e63946" : undefined,
            }}
          >
            {c.label}
          </div>
        ))}
      </div>
    </section>
  );
}

const pillBtn: React.CSSProperties = {
  border: "1px solid #ddd",
  background: "#fff",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: "0.85rem",
  cursor: "pointer",
};
