// src/app/rep/dashboard/page.tsx
import React from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const metadata = { title: "Rep • Dashboard" };

type Lead = {
  id: string;
  business_name: string | null;
  stage: string | null;
  created_at: string;
};

export default async function RepDashboardPage() {
  // ✅ supabase is a client (not a Promise) because we AWAIT it
  const supabase = await createSupabaseServerClient();

  const { data: leads, error } = await supabase
    .from("vendor_leads")
    .select("id, business_name, stage, created_at") // ❗ remove any stray backticks here
    .order("created_at", { ascending: false })
    .limit(25);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Rep Dashboard</h1>

      {error ? (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-red-700">
          Failed to load leads: {error.message}
        </div>
      ) : (
        <div className="mt-6">
          <div className="mb-2 text-sm text-gray-500">
            Showing {leads?.length ?? 0} lead{(leads?.length ?? 0) === 1 ? "" : "s"}
          </div>
          <ul className="divide-y divide-gray-200 rounded-lg border">
            {(leads as Lead[] | null)?.map((l) => (
              <li key={l.id} className="grid grid-cols-4 gap-4 p-3 text-sm">
                <span className="col-span-2 font-medium">
                  {l.business_name ?? "(no name)"}
                </span>
                <span className="text-gray-600">{l.stage ?? "—"}</span>
                <span className="text-gray-500">
                  {new Date(l.created_at).toLocaleString()}
                </span>
              </li>
            )) ?? <li className="p-3 text-sm text-gray-500">No leads yet.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
