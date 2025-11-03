// src/app/rep/dashboard/page.tsx

import Link from "next/link";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = {
  title: "Rep Dashboard - Local Deals 24/7",
  description:
    "See your leads, activation status, and live business onboarding.",
};

async function getLeads() {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("vendor_leads")
    .select(
      `
      id,
      business_name,
      owner_name,
      email,
      phone,
      city,
      state,
      region_tag,
      status,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading leads:", error.message);
    return [];
  }

  return data || [];
}

function StatusBadge({ status }: { status: string }) {
  const base =
    "inline-block rounded-full px-2 py-[2px] text-[10px] font-semibold leading-none";
  if (status === "activated") {
    return (
      <span className={base + " bg-green-100 text-green-700 border border-green-300"}>
        activated
      </span>
    );
  }
  return (
    <span className={base + " bg-yellow-100 text-yellow-700 border border-yellow-300"}>
      new
    </span>
  );
}

export default async function RepDashboardPage() {
  const leads = await getLeads();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* HEADER */}
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Rep Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Track your signups, see who activated, and jump directly into what
          the business owner sees.
        </p>
      </section>

      {/* SUMMARY STRIP */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DashboardStat
          label="Total Leads"
          value={leads.length.toString()}
        />
        <DashboardStat
          label="Activated"
          value={leads.filter((l: any) => l.status === "activated").length.toString()}
        />
        <DashboardStat
          label="New"
          value={leads.filter((l: any) => l.status !== "activated").length.toString()}
        />
        <DashboardStat
          label="Regions Covered"
          value={Array.from(new Set(leads.map((l: any) => l.region_tag))).length.toString()}
        />
      </section>

      {/* LEADS TABLE */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Recent Leads
        </div>

        {leads.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">
            No leads yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {leads.map((lead: any) => (
              <li key={lead.id} className="p-4 text-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* LEFT BLOCK */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-semibold text-gray-900 leading-tight">
                      {lead.business_name || "Unnamed Business"}
                    </div>
                    <StatusBadge status={lead.status || "new"} />
                  </div>

                  <div className="text-gray-600 leading-tight text-xs">
                    {lead.city}, {lead.state} • {lead.region_tag}
                  </div>

                  <div className="text-[11px] text-gray-500 leading-tight mt-1">
                    Owner: {lead.owner_name || "—"} • {lead.phone || "no phone"}
                  </div>

                  <div className="text-[11px] text-gray-500 leading-tight break-all">
                    {lead.email}
                  </div>

                  <div className="text-[10px] text-gray-400 leading-tight mt-1">
                    {formatDateTime(lead.created_at)} • {lead.id.slice(0, 8)}
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-col items-start gap-2 shrink-0">
                  {/* View what THEY see */}
                  <Link
                    href={`/vendor/lead/${lead.id}`}
                    className="rounded-lg border border-gray-300 bg-white text-gray-800 text-[11px] font-semibold px-3 py-2 leading-none hover:bg-gray-50"
                  >
                    View QR / Landing
                  </Link>

                  {/* If activated, jump to their 'You're Live' confirmation */}
                  {lead.status === "activated" && (
                    <Link
                      href={`/vendor/lead/${lead.id}/live`}
                      className="rounded-lg bg-orange-600 text-white text-[11px] font-semibold px-3 py-2 leading-none hover:bg-orange-700"
                    >
                      Live Status
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FOOTER NOTE / SCRIPT HELP */}
      <section className="text-[11px] text-gray-500 leading-relaxed">
        <div className="font-semibold text-gray-700 text-xs mb-1">
          Pitch reminder:
        </div>
        <div className="mb-2">
          We help small businesses increase their business by 30 to 90%. Some
          owners tell us their slowest days became their busiest — and they
          didn’t spend thousands on ads.
        </div>
        <div>
          "What's the best email to send your setup link to? I’ll build your page
          right now.”
        </div>
      </section>
    </div>
  );
}

function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="text-xl font-bold text-gray-900 leading-tight">
        {value}
      </div>
    </div>
  );
}

// Tiny util to display "Oct 28, 9:41 AM"
function formatDateTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
