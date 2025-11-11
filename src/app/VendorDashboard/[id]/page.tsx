// src/app/VendorDashboard/[id]/page.tsx
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function VendorDashboardByIdPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <p className="text-slate-300 text-sm mb-6">
        Viewing vendor with id: <span className="font-mono">{id}</span>
      </p>
      <div className="rounded-xl border border-slate-200/10 bg-slate-900/40 p-4">
        <p className="text-slate-200 text-sm">
          Replace this with the real vendor detail component.
        </p>
      </div>
    </div>
  );
}
