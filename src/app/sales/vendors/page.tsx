// src/app/sales/vendors/page.tsx
"use client";

import React from "react";

export default function SalesVendorsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">Sales → Vendors</h1>
      <p className="text-slate-300 text-sm mb-6">
        Placeholder sales vendors view. Removed getSupabaseBrowserClient()
        import so Vercel can build. Hook this to Supabase later.
      </p>
      <div className="rounded-xl border border-slate-200/10 bg-slate-900/40 p-4">
        <p className="text-slate-200 text-sm">No vendors to show.</p>
      </div>
    </div>
  );
}
