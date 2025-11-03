import { createSupabaseServer } from "@/utils/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Search | Admin | Local Deals 24/7",
  description: "Search vendors, reps, and activity.",
};

export default async function AdminSearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = createSupabaseServer();
  const q = (searchParams.q || "").trim();

  // If no query yet, show helper / onboarding state
  if (!q) {
    return (
      <div className="text-neutral-100">
        <h1 className="text-xl font-semibold text-white mb-2">
          Search Admin Data
        </h1>
        <p className="text-sm text-neutral-400 mb-6">
          Use the box in the header to search vendors, cities, or reps.
        </p>

        <div className="text-[13px] text-neutral-500 bg-neutral-900 border border-neutral-800 rounded-xl p-4 max-w-md leading-relaxed">
          Examples:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>"tony" → Tony&apos;s Pizza vendor record</li>
            <li>"hartford" → vendors in Hartford, reps covering Hartford</li>
            <li>"kayla" → sales rep Kayla and her pipeline</li>
          </ul>
        </div>
      </div>
    );
  }

  // --- 1. Find businesses (vendors) matching the query ---
  const { data: bizMatchesRaw = [] } = await supabase
    .from("businesses")
    .select(
      "id, name, city, status, assigned_rep_id"
    )
    .or(`name.ilike.%${q}%,city.ilike.%${q}%`)
    .limit(20);

  // Collect rep_ids from those businesses
  const repIds = bizMatchesRaw
    .map((b: any) => b.assigned_rep_id)
    .filter(Boolean);

  // Look up assigned reps in one query
  let repLookup: Record<string, { name: string; territory: string | null }> =
    {};
  if (repIds.length > 0) {
    const { data: repRows = [] } = await supabase
      .from("sales_reps")
      .select("id, name, territory")
      .in("id", repIds);

    repLookup = repRows.reduce(
      (acc: Record<string, { name: string; territory: string | null }>, r: any) => {
        acc[r.id] = { name: r.name, territory: r.territory };
        return acc;
      },
      {}
    );
  }

  // Shape vendor matches for UI
  const bizMatches = bizMatchesRaw.map((b: any) => ({
    id: b.id,
    name: b.name,
    city: b.city,
    status: b.status,
    repId: b.assigned_rep_id || null,
    repName: b.assigned_rep_id ? repLookup[b.assigned_rep_id]?.name : null,
    repTerritory: b.assigned_rep_id
      ? repLookup[b.assigned_rep_id]?.territory
      : null,
  }));

  // --- 2. Find reps matching the query ---
  const { data: repMatchesRaw = [] } = await supabase
    .from("sales_reps")
    .select("id, name, territory, status")
    .or(`name.ilike.%${q}%,territory.ilike.%${q}%`)
    .limit(20);

  // Shape rep matches for UI
  const repMatches = repMatchesRaw.map((r: any) => ({
    id: r.id,
    name: r.name,
    territory: r.territory,
    status: r.status,
  }));

  return (
    <div className="text-neutral-100 space-y-10">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-white leading-tight">
          Search Results for “{q}”
        </h1>
        <p className="text-sm text-neutral-400">
          Vendors, territories, reps, activity.
        </p>
      </div>

      {/* VENDORS SECTION */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Vendors</h2>
              <p className="text-sm text-neutral-400">
                {bizMatches.length === 0
                  ? "No vendors found."
                  : `${bizMatches.length} match${
                      bizMatches.length === 1 ? "" : "es"
                    }`}
              </p>
            </div>
        </div>

        {bizMatches.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            Nothing here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">Business</th>
                  <th className="py-2 pr-4 font-medium">City</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium">Assigned Rep</th>
                  <th className="py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bizMatches.map((biz: any) => (
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
                      {biz.repName ? (
                        <>
                          <div className="text-white font-medium text-[13px] leading-tight">
                            {biz.repName}
                          </div>
                          <div className="text-[11px] text-neutral-500 leading-tight">
                            {biz.repTerritory || "—"}
                          </div>
                        </>
                      ) : (
                        <span className="text-neutral-500 text-[13px]">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/vendor/${biz.id}`}
                        className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200 inline-block"
                      >
                        View Vendor
                      </Link>
                      {biz.repId && (
                        <Link
                          href={`/admin/rep/${biz.repId}`}
                          className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200 inline-block ml-2"
                        >
                          View Rep
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* REPS SECTION */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Sales Reps / Agents
            </h2>
            <p className="text-sm text-neutral-400">
              {repMatches.length === 0
                ? "No reps found."
                : `${repMatches.length} match${
                    repMatches.length === 1 ? "" : "es"
                  }`}
            </p>
          </div>
        </div>

        {repMatches.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            Nothing here either.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">Rep</th>
                  <th className="py-2 pr-4 font-medium">Territory</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {repMatches.map((rep: any) => (
                  <tr
                    key={rep.id}
                    className="border-b border-neutral-800 last:border-none"
                  >
                    <td className="py-3 pr-4 text-white font-semibold">
                      {rep.name}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {rep.territory || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1">
                        {rep.status || "—"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Link
                        href={`/admin/rep/${rep.id}`}
                        className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200 inline-block"
                      >
                        View Rep
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
