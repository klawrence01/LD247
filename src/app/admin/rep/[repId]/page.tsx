import { createSupabaseServer } from "@/utils/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Rep Detail | Local Deals 24/7",
  description: "Pipeline, activity, and accounts for this sales rep.",
};

type RepRecord = {
  id: string;
  name: string;
  territory: string | null;
  status: string | null;
};

type LeadRow = {
  id: string;
  business_name: string;
  contact_phone: string | null;
  best_time: string | null;
  stage: string | null;
  created_at: string | null;
};

type BizRow = {
  id: string;
  name: string;
  city: string | null;
  status: string | null;
  updated_at: string | null;
};

export default async function RepDetailPage({
  params,
}: {
  params: { repId: string };
}) {
  const supabase = createSupabaseServer();
  const repId = params.repId;

  //
  // 1. Fetch this rep
  //
  const { data: rep, error: repErr } = await supabase
    .from("sales_reps")
    .select("id, name, territory, status")
    .eq("id", repId)
    .single();

  if (repErr || !rep) {
    return (
      <div className="text-neutral-100">
        <h1 className="text-xl font-semibold text-white mb-2">
          Rep not found
        </h1>
        <p className="text-sm text-neutral-400">
          That rep ID doesn&apos;t exist.
        </p>
      </div>
    );
  }

  //
  // 2. Leads in their pipeline
  //
  const { data: leads = [] } = await supabase
    .from("rep_leads")
    .select(
      "id, business_name, contact_phone, best_time, stage, created_at"
    )
    .eq("sales_rep_id", rep.id)
    .order("created_at", { ascending: false })
    .limit(20);

  // derive some quick stats from leads for this rep
  const leadsThisWeekCount = countSince(leads, 7);
  const demoCount = leads.filter(
    (l) => l.stage === "demo_scheduled"
  ).length;
  const contactedCount = leads.filter(
    (l) => l.stage === "contacted"
  ).length;

  //
  // 3. Businesses owned by this rep
  //
  const { data: accounts = [] } = await supabase
    .from("businesses")
    .select(
      "id, name, city, status, updated_at"
    )
    .eq("assigned_rep_id", rep.id)
    .order("updated_at", { ascending: false })
    .limit(20);

  const activeAccountsCount = accounts.filter((b: BizRow) => {
    if (!b.status) return false;
    const s = b.status.toLowerCase();
    return s === "active" || s === "live";
  }).length;

  //
  // 4. Upcoming appointments
  //    For now we treat leads with stage=demo_scheduled or a best_time note
  //
  const upcomingAppointments = leads
    .filter(
      (l) =>
        l.stage === "demo_scheduled" ||
        (l.best_time && l.best_time.trim().length > 0)
    )
    .slice(0, 5)
    .map((l) => ({
      id: l.id,
      time: l.best_time || "N/A",
      business: l.business_name,
      phone: l.contact_phone || "—",
      status:
        l.stage === "demo_scheduled" ? "Confirmed" : "Needs Confirm",
    }));

  return (
    <div className="text-neutral-100 space-y-10">
      {/* HEADER / PROFILE SUMMARY */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-white leading-tight">
            {rep.name}
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {rep.territory || "—"} •{" "}
            <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1 align-middle">
              {rep.status || "—"}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mt-6 max-w-sm">
            <MiniStat
              label="Leads (7d)"
              value={leadsThisWeekCount}
              hint="Fresh pipeline this week"
            />
            <MiniStat
              label="Active Accounts"
              value={activeAccountsCount}
              hint="Live / onboarding vendors"
            />
            <MiniStat
              label="Contacted"
              value={contactedCount}
              hint="Owner talked to rep"
            />
            <MiniStat
              label="Demos Set"
              value={demoCount}
              hint="Meetings scheduled"
            />
          </div>
        </div>

        <div className="text-sm bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[220px]">
          <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
            Actions
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/sales/${slugify(rep.name)}`}
              className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 text-center"
            >
              View Public Rep Page
            </Link>

            <Link
              href={`/rep/dashboard`}
              className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 text-center"
            >
              Impersonate Rep Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING APPOINTMENTS */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Upcoming Appointments
            </h2>
            <p className="text-sm text-neutral-400">
              Calls / walk-ins the rep has lined up.
            </p>
          </div>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            No upcoming meetings logged.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 pr-4 font-medium">Business</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-neutral-800 last:border-none"
                  >
                    <td className="py-3 pr-4 text-neutral-300">
                      {appt.time}
                    </td>
                    <td className="py-3 pr-4 text-white font-medium">
                      {appt.business}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1">
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {appt.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ACTIVE ACCOUNTS / BUSINESSES */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Accounts Owned by {rep.name}
            </h2>
            <p className="text-sm text-neutral-400">
              Vendors this rep is responsible for keeping happy.
            </p>
          </div>
        </div>

        {accounts.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            No assigned vendors yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">Business</th>
                  <th className="py-2 pr-4 font-medium">City</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium">Last Update</th>
                  <th className="py-2 font-medium text-right">Open</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((biz: BizRow) => (
                  <tr
                    key={biz.id}
                    className="border-b border-neutral-800 last:border-none"
                  >
                    <td className="py-3 pr-4 text-white font-semibold">
                      {biz.name}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {biz.city || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1">
                        {biz.status || "—"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {biz.updated_at
                        ? new Date(biz.updated_at).toLocaleString()
                        : "—"}
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Link
                        href={`/admin/vendor/${biz.id}`}
                        className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200"
                      >
                        View Vendor
                      </Link>
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

// Small helper stats
function MiniStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3">
      <div className="text-white text-lg font-semibold leading-none">
        {value}
      </div>
      <div className="text-[13px] font-medium text-neutral-200 leading-tight mt-1">
        {label}
      </div>
      <div className="text-[11px] text-neutral-500 leading-snug">{hint}</div>
    </div>
  );
}

function countSince(leads: LeadRow[], days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return leads.filter((l) => {
    if (!l.created_at) return false;
    const ts = new Date(l.created_at).getTime();
    return ts >= cutoff;
  }).length;
}

// turn "Jordan Miles" -> "jordan-miles"
function slugify(name: string | null | undefined) {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
