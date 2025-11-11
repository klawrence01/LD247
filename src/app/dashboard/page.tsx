// src/app/dashboard/page.tsx
import React from "react";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">LD247 Dashboard</h1>
      <p className="text-slate-300 text-sm">
        Placeholder dashboard component so vendor/test pages can import it on
        Vercel. Replace with real metrics later.
      </p>
      <div className="rounded-xl border border-slate-200/10 bg-slate-900/40 p-4">
        <p className="text-slate-200 text-sm">
          No data to show yet. Connect Supabase queries here.
        </p>
      </div>
    </div>
  );
}
