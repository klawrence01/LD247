// src/app/admin/sales-tools/assets/page.tsx
"use client";

import Link from "next/link";

const ASSETS = [
  {
    name: "LD247 merchant one-pager (PDF)",
    desc: "Short explainer you can send to business owners.",
    href: "/files/ld247-merchant.pdf",
    type: "pdf",
  },
  {
    name: "Sales script – first contact",
    desc: "Talk track used on the Sales tools page.",
    href: "/admin/training", // reuse your training for now
    type: "internal",
  },
  {
    name: "LD247 platform demo (YouTube)",
    desc: "Send this if merchant wants a walkthrough first.",
    href: "https://www.youtube.com/",
    type: "video",
  },
];

export default function SalesAssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales assets</h1>
          <p className="text-sm text-white/50 mt-2">
            Central place for reps to grab approved LD247 sales materials.
          </p>
        </div>
        <Link
          href="/admin/sales-tools"
          className="bg-white/10 hover:bg-white/15 text-white text-sm px-4 py-2 rounded-lg"
        >
          ← Back to sales tools
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ASSETS.map((asset) => (
          <div
            key={asset.name}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-white font-semibold text-sm">{asset.name}</h2>
              <span className="text-[10px] text-white/30">{asset.type}</span>
            </div>
            <p className="text-xs text-white/50">{asset.desc}</p>
            <Link
              href={asset.href}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded-lg text-center"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
