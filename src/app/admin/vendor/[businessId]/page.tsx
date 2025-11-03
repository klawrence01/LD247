import { createSupabaseServer } from "@/utils/supabase/server";
import Link from "next/link";

import AssignRepForm from "./AssignRepForm";
import ApproveVendorButton from "./ApproveVendorButton";
import PauseVendorButton from "./PauseVendorButton";
import FeatureDealButton from "./FeatureDealButton";

export const metadata = {
  title: "Vendor Detail | Local Deals 24/7",
  description:
    "Business performance, assigned rep, activity, and admin controls.",
};

type RepInfo = {
  id: string;
  name: string;
  territory: string | null;
  status: string | null;
};

type LeadInfo = {
  id: string;
  business_name: string;
  contact_phone: string | null;
  best_time: string | null;
  stage: string | null;
  created_at: string | null;
  source_city?: string | null;
};

type FeaturedRow = {
  city: string;
  starts_at: string | null;
  ends_at: string | null;
};

export default async function VendorDetailPage({
  params,
}: {
  params: { businessId: string };
}) {
  const supabase = createSupabaseServer();
  const businessId = params.businessId;

  //
  // 1. Load vendor
  //
  const { data: vendor, error: vendorErr } = await supabase
    .from("businesses")
    .select(
      "id, name, city, status, hero_message, about_text, assigned_rep_id"
    )
    .eq("id", businessId)
    .single();

  if (vendorErr || !vendor) {
    return (
      <div className="text-neutral-100">
        <h1 className="text-xl font-semibold text-white mb-2">
          Vendor not found
        </h1>
        <p className="text-sm text-neutral-400">
          That business ID doesn&apos;t exist.
        </p>
      </div>
    );
  }

  //
  // 2. Load assigned rep (if any)
  //
  let rep: RepInfo | null = null;
  if (vendor.assigned_rep_id) {
    const { data: repData } = await supabase
      .from("sales_reps")
      .select("id, name, territory, status")
      .eq("id", vendor.assigned_rep_id)
      .single();
    if (repData) {
      rep = repData as RepInfo;
    }
  }

  //
  // 3. Load list of active reps for assignment dropdown
  //
  const { data: allReps = [] } = await supabase
    .from("sales_reps")
    .select("id, name, territory, status")
    .eq("status", "active")
    .order("name", { ascending: true });

  //
  // 4. Figure out which reps are already working fresh inbound
  //
  // We'll consider "fresh inbound" as: leads with stage='assigned_from_inbound'
  // created in the last 7 days, assigned to that rep.
  //
  const sevenDaysAgoISO = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: hotLeadRows = [] } = await supabase
    .from("rep_leads")
    .select("sales_rep_id, created_at, stage")
    .eq("stage", "assigned_from_inbound")
    .gte("created_at", sevenDaysAgoISO);

  const hotRepIdsSet = new Set<string>();
  for (const row of hotLeadRows) {
    if (row.sales_rep_id) {
      hotRepIdsSet.add(row.sales_rep_id);
    }
  }
  const hotRepIds = Array.from(hotRepIdsSet);

  //
  // 5. Pull recent leads related to THIS vendor by name
  //
  const { data: relatedLeads = [] } = await supabase
    .from("rep_leads")
    .select(
      "id, business_name, contact_phone, best_time, stage, created_at, source_city"
    )
    .ilike("business_name", `%${vendor.name}%`)
    .order("created_at", { ascending: false })
    .limit(5);

  //
  // 6. Vendor performance stats
  //
  const sinceDate = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 10); // YYYY-MM-DD

  let totalRedemptions7d = 0;
  {
    const { data: redemptionRows = [] } = await supabase
      .from("deal_stats_daily")
      .select("redemptions, business_id, date")
      .eq("business_id", businessId)
      .gte("date", sinceDate);

    totalRedemptions7d = redemptionRows.reduce(
      (sum: number, row: any) => sum + (row.redemptions || 0),
      0
    );
  }

  let alertRequests = 0;
  {
    const { data: alertRows = [] } = await supabase
      .from("deal_alert_requests")
      .select("id")
      .eq("business_id", businessId);

    alertRequests = alertRows.length;
  }

  //
  // 7. Where is this vendor currently featured (active placements)
  //
  const { data: featuredPlacesRaw = [] } = await supabase
    .from("featured_deals")
    .select("city, starts_at, ends_at")
    .eq("business_id", businessId)
    .or("ends_at.is.null,ends_at.gt.now()")
    .order("starts_at", { ascending: false });

  const featuredPlaces: FeaturedRow[] = featuredPlacesRaw.map((row: any) => ({
    city: row.city,
    starts_at: row.starts_at || null,
    ends_at: row.ends_at || null,
  }));

  //
  // helper: rep badge
  //
  function repNameWithHeat(repObj: RepInfo | null) {
    if (!repObj) return "Not assigned";
    const isHot = hotRepIds.includes(repObj.id);
    return (
      <>
        <span>{repObj.name}</span>
        {isHot ? (
          <span className="ml-1 inline-block align-middle bg-orange-600 text-white text-[10px] font-semibold leading-none px-1.5 py-0.5 rounded">
            🔥 inbound
          </span>
        ) : null}
      </>
    );
  }

  return (
    <div className="text-neutral-100 space-y-10">
      {/* HEADER ROW */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* LEFT: Vendor headline */}
        <div>
          <h1 className="text-2xl font-semibold text-white leading-tight">
            {vendor.name}
          </h1>

          <p className="text-sm text-neutral-400 leading-relaxed">
            {vendor.city || "—"} •{" "}
            <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1 align-middle">
              {vendor.status || "—"}
            </span>
          </p>

          {vendor.hero_message ? (
            <p className="text-[13px] text-neutral-300 leading-relaxed mt-4 max-w-xl">
              <span className="text-neutral-500 block text-[11px] uppercase tracking-wide font-semibold mb-1">
                Featured Offer
              </span>
              {vendor.hero_message}
            </p>
          ) : null}
        </div>

        {/* RIGHT: Control Panel */}
        <div className="text-sm bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[260px] space-y-6">
          {/* CURRENT REP SNAPSHOT */}
          <div>
            <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
              Assigned Rep
            </div>

            {rep ? (
              <>
                <div className="text-white font-semibold text-[14px] leading-tight flex flex-wrap items-center gap-x-1 gap-y-1">
                  {repNameWithHeat(rep)}
                </div>

                <div className="text-[12px] text-neutral-400 leading-tight">
                  {rep.territory || "—"}
                </div>

                <div className="text-[11px] text-neutral-500 leading-tight mt-1">
                  Status: {rep.status || "—"}
                </div>

                <div className="pt-3">
                  <Link
                    href={`/admin/rep/${rep.id}`}
                    className="inline-block text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200"
                  >
                    View Rep
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-neutral-500 text-[13px] leading-snug">
                Not assigned
              </div>
            )}
          </div>

          {/* ASSIGN / REASSIGN CONTROL */}
          <div className="border-t border-neutral-800 pt-4">
            <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
              Reassign / Claim
            </div>

            <AssignRepForm
              businessId={vendor.id}
              currentRepId={vendor.assigned_rep_id}
              reps={allReps.map((r: any) => ({
                id: r.id,
                name: r.name,
                territory: r.territory,
              }))}
              hotRepIds={hotRepIds}
            />
          </div>

          {/* APPROVAL / GO LIVE CONTROL */}
          <div className="border-t border-neutral-800 pt-4">
            <ApproveVendorButton
              businessId={vendor.id}
              currentStatus={vendor.status}
            />
          </div>

          {/* PAUSE / TAKE OFFLINE CONTROL */}
          <div className="border-t border-neutral-800 pt-4">
            <PauseVendorButton
              businessId={vendor.id}
              currentStatus={vendor.status}
            />
          </div>

          {/* FEATURE DEAL CITYWIDE CONTROL */}
          <div className="border-t border-neutral-800 pt-4">
            <FeatureDealButton
              businessId={vendor.id}
              defaultCity={vendor.city}
            />
          </div>

          {/* CURRENTLY FEATURED IN */}
          <div className="border-t border-neutral-800 pt-4">
            <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
              Currently Featured In
            </div>

            {featuredPlaces.length === 0 ? (
              <div className="text-[12px] text-neutral-500 leading-snug bg-neutral-800/40 border border-neutral-700 rounded-lg px-3 py-2">
                Not featured in any city right now.
              </div>
            ) : (
              <ul className="space-y-2">
                {featuredPlaces.map((f: FeaturedRow, idx: number) => (
                  <li
                    key={idx}
                    className="bg-neutral-800/40 border border-neutral-700 rounded-lg px-3 py-2 text-[12px] text-neutral-200 leading-snug"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-neutral-100">
                        {f.city}
                      </div>
                      <span className="bg-orange-600 text-white font-semibold rounded-md px-2 py-0.5 text-[10px] leading-none border border-orange-500/40 shadow">
                        LIVE
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-500 leading-snug mt-1">
                      since{" "}
                      {f.starts_at
                        ? new Date(f.starts_at).toLocaleDateString()
                        : "—"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* PERFORMANCE / STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox
          label="7-Day Redemptions"
          value={totalRedemptions7d}
          hint="How many times someone actually used their deal"
        />
        <StatBox
          label="Bring-It-Back Requests"
          value={alertRequests}
          hint="People who tapped 'Tell me when this deal returns'"
        />
        <StatBox
          label="Status"
          value={vendor.status || "—"}
          hint="active / pending / on_hold / paused"
        />
      </section>

      {/* ABOUT / STORY */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Business Info
            </h2>
            <p className="text-sm text-neutral-400">
              Owner-facing copy and positioning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
          {/* ABOUT TEXT */}
          <div>
            <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-1">
              About
            </div>
            <div className="text-neutral-200 text-[13px] leading-relaxed whitespace-pre-line bg-neutral-800/40 border border-neutral-700 rounded-xl p-4">
              {vendor.about_text || "—"}
            </div>
          </div>

          {/* HERO / FEATURED OFFER */}
          <div>
            <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-1">
              Featured Offer / Hero Message
            </div>
            <div className="text-neutral-200 text-[13px] leading-relaxed bg-neutral-800/40 border border-neutral-700 rounded-xl p-4">
              {vendor.hero_message || "—"}
            </div>
          </div>
        </div>
      </section>

      {/* RECENT LEADS / ACTIVITY */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
            <p className="text-sm text-neutral-400">
              How this business got into the system.
            </p>
          </div>
        </div>

        {relatedLeads.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            No matching rep leads found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 pr-4 font-medium">Stage</th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    Contact Phone
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    Best Time
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    City
                  </th>
                </tr>
              </thead>
              <tbody>
                {relatedLeads.map((lead: LeadInfo) => (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-800 last:border-none"
                  >
                    <td className="py-3 pr-4 text-neutral-300 whitespace-nowrap">
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString()
                        : "—"}
                    </td>

                    <td className="py-3 pr-4">
                      <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1">
                        {lead.stage || "—"}
                      </span>
                    </td>

                    <td className="py-3 pr-4 text-neutral-200 whitespace-nowrap">
                      {lead.contact_phone || "—"}
                    </td>

                    <td className="py-3 pr-4 text-neutral-400 text-[12px] leading-snug whitespace-nowrap">
                      {lead.best_time || "—"}
                    </td>

                    <td className="py-3 pr-4 text-neutral-400 text-[12px] leading-snug whitespace-nowrap">
                      {lead.source_city || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatBox({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="text-white text-2xl font-semibold">{value}</div>
        <span className="text-[10px] font-semibold px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
          stat
        </span>
      </div>
      <div className="mt-2">
        <div className="text-[13px] font-medium text-neutral-200">{label}</div>
        <div className="text-[11px] text-neutral-500 leading-snug">{hint}</div>
      </div>
    </div>
  );
}
