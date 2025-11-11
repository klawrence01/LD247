"use client";

import { useEffect, useState, useMemo } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type Salesman = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  region?: string | null;
  states?: string[] | null;
  vendor_count: number;
};

export default function AdminSalesmenPage() {
  const supabase = getSupabaseBrowser();

  const [reps, setReps] = useState<Salesman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [regionFilter, setRegionFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      // 1) try to load a real reps table first
      // we'll try common names: salesmen, salesmen, reps, sales_team
      let repsData: any[] | null = null;
      let tableUsed: string | null = null;

      const tryTables = ["salesmen", "reps", "sales_team"];

      for (const tbl of tryTables) {
        const { data, error } = await supabase.from(tbl).select("*");
        if (!error && data) {
          repsData = data;
          tableUsed = tbl;
          break;
        }
      }

      if (repsData && tableUsed) {
        // we got a real reps table — now we should get vendor counts per rep
        const { data: vendorsData } = await supabase
          .from("vendors")
          .select("id, rep_id");

        const counts: Record<string, number> = {};
        (vendorsData || []).forEach((v: any) => {
          const repId = v.rep_id || v.rep || null;
          if (!repId) return;
          counts[repId] = (counts[repId] || 0) + 1;
        });

        const normalized: Salesman[] = repsData.map((r: any) => ({
          id: r.id ? String(r.id) : r.rep_id ? String(r.rep_id) : "unknown",
          name: r.name || r.full_name || r.display_name || "Unnamed rep",
          email: r.email || null,
          phone: r.phone || null,
          region: r.region || null,
          states: r.states || null,
          vendor_count: counts[r.id] || counts[r.rep_id] || 0,
        }));

        const uniqRegions = Array.from(
          new Set(
            normalized
              .map((r) => r.region)
              .filter(Boolean) as string[]
          )
        ).sort();

        setRegions(uniqRegions);
        setReps(normalized);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log("Salesmen loaded from table:", tableUsed);
        return;
      }

      // 2) fallback — no reps table. Build reps from vendors.rep_id
      const { data: vendors, error: vendorsError } = await supabase
        .from("vendors")
        .select("*");

      if (vendorsError) {
        // try singular
        const alt = await supabase.from("vendor").select("*");
        if (alt.error) {
          setError(
            "Could not load salesmen. No reps table found and vendor table is not readable."
          );
          setLoading(false);
          return;
        }
        buildFromVendors(alt.data);
        return;
      }

      buildFromVendors(vendors);

      function buildFromVendors(vendorRows: any[]) {
        // group by rep_id
        const groups: Record<string, { count: number; states: Set<string> }> =
          {};
        vendorRows.forEach((v) => {
          const repId = v.rep_id || v.salesperson || "unassigned";
          if (!groups[repId]) {
            groups[repId] = { count: 0, states: new Set() };
          }
          groups[repId].count += 1;
          if (v.state) groups[repId].states.add(v.state);
        });

        const derived: Salesman[] = Object.entries(groups).map(
          ([repId, info]) => ({
            id: repId,
            name: repId === "unassigned" ? "Unassigned" : repId,
            email: null,
            phone: null,
            region: null,
            states: Array.from(info.states),
            vendor_count: info.count,
          })
        );

        // collect regions (none in this derived mode)
        setRegions([]);
        setReps(derived);
        setLoading(false);
      }
    };

    load();
  }, [supabase]);

  const filtered = useMemo(() => {
    return reps.filter((r) => {
      if (regionFilter !== "ALL") {
        if ((r.region || "") !== regionFilter) return false;
      }
      if (search.trim().length > 0) {
        const term = search.trim().toLowerCase();
        if (
          !r.name.toLowerCase().includes(term) &&
          !r.id.toLowerCase().includes(term) &&
          !(r.email || "").toLowerCase().includes(term)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [reps, regionFilter, search]);

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Salesmen</h1>
        <p className="text-sm text-white/50 mt-2">
          See which reps are attached to vendors, how many accounts they own,
          and which states they cover.
        </p>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by region
          </label>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            <option value="ALL">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-white/50 block mb-1">
            Search reps
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, id, or email…"
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* content */}
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading reps…
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5 text-red-100 text-sm">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          No salesmen found for these filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((rep) => (
            <SalesmanCard key={rep.id} rep={rep} />
          ))}
        </div>
      )}
    </div>
  );
}

function SalesmanCard({ rep }: { rep: Salesman }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {rep.name || "Unnamed rep"}
          </h2>
          <p className="text-xs text-white/30 mt-1">ID: {rep.id}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-100">
          {rep.vendor_count} vendors
        </span>
      </div>

      {rep.email ? (
        <p className="text-xs text-white/50">{rep.email}</p>
      ) : null}

      <p className="text-xs text-white/40">
        Region: {rep.region ? rep.region : "—"}
      </p>

      <p className="text-[11px] text-white/25">
        States:{" "}
        {rep.states && rep.states.length > 0
          ? rep.states.join(", ")
          : "Not specified"}
      </p>

      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 text-xs py-2 rounded-lg transition">
          View rep
        </button>
        <button className="bg-white/5 hover:bg-white/10 text-white/50 text-xs py-2 px-3 rounded-lg transition">
          Message
        </button>
      </div>
    </div>
  );
}
