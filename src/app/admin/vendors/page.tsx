"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type VendorRecord = {
  id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  region: string | null;
  plan: string | null;
  status: string | null;
  public_url?: string | null;
  website?: string | null;
  created_at?: string | null;
  rep_id?: string | null;
};

type SubscriptionRecord = {
  id: string;
  vendor_id: string | null;
  vendor_name: string | null;
  status: string | null;
  plan: string | null;
};

const STATUS_FILTERS = ["all", "pending", "active", "suspended"] as const;

export default function AdminVendorsPage() {
  const supabase = getSupabaseBrowser();

  const [vendors, setVendors] = useState<VendorRecord[]>([]);
  const [subs, setSubs] = useState<SubscriptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number]>("all");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [planFilter, setPlanFilter] = useState("ALL");
  const [salesFilter, setSalesFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // filter options
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const [salespeople, setSalespeople] = useState<string[]>([]);
  const [hasRegion, setHasRegion] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      // 1) vendors
      let { data: vendorsData, error: vendorsError } = await supabase
        .from("vendors")
        .select("*");
      let vendorsTableUsed = "vendors";

      if (vendorsError) {
        const alt = await supabase.from("vendor").select("*");
        if (alt.error) {
          setError(
            "Could not load vendors. Ensure you have a 'vendors' or 'vendor' table."
          );
          setLoading(false);
          return;
        } else {
          vendorsData = alt.data;
          vendorsTableUsed = "vendor";
        }
      }

      const normalizedVendors: VendorRecord[] = (vendorsData || []).map(
        (row: any) => ({
          id: row.id ? String(row.id) : "",
          name: row.name || row.business_name || row.company_name || null,
          city: row.city || null,
          state: row.state || null,
          region: row.region || null,
          plan: row.plan || row.plan_name || null,
          status: row.status || null,
          public_url: row.public_url || null,
          website: row.website || null,
          created_at: row.created_at || null,
          rep_id: row.rep_id || row.salesperson || null,
        })
      );

      // 2) subscriptions (to show billing status)
      let { data: subsData } = await supabase.from("subscriptions").select("*");
      if (!subsData) {
        // try fallback
        const altSub = await supabase.from("vendor_subscriptions").select("*");
        subsData = altSub.data || [];
      }
      const normalizedSubs: SubscriptionRecord[] = (subsData || []).map(
        (row: any) => ({
          id: row.id,
          vendor_id: row.vendor_id ? String(row.vendor_id) : null,
          vendor_name:
            row.vendor_name ||
            row.business_name ||
            row.company_name ||
            null,
          status: row.status || null,
          plan: row.plan || row.plan_name || null,
        })
      );

      // derive filters
      const uniqStates = Array.from(
        new Set(
          normalizedVendors.map((v) => v.state).filter(Boolean) as string[]
        )
      ).sort();
      const uniqCities = Array.from(
        new Set(
          normalizedVendors.map((v) => v.city).filter(Boolean) as string[]
        )
      ).sort();
      const uniqPlans = Array.from(
        new Set(
          normalizedVendors.map((v) => v.plan).filter(Boolean) as string[]
        )
      ).sort();
      const uniqSales = Array.from(
        new Set(
          normalizedVendors.map((v) => v.rep_id).filter(Boolean) as string[]
        )
      ).sort();
      const anyRegion = normalizedVendors.some((v) => !!v.region);

      setVendors(normalizedVendors);
      setSubs(normalizedSubs);
      setStates(uniqStates);
      setCities(uniqCities);
      setPlans(uniqPlans);
      setSalespeople(uniqSales);
      setHasRegion(anyRegion);
      setLoading(false);

      // eslint-disable-next-line no-console
      console.log("Vendors loaded from table:", vendorsTableUsed);
    };

    load();
  }, [supabase]);

  // helper: does vendor have active subscription?
  const hasActiveSub = (vendor: VendorRecord) => {
    // match by vendor_id first
    const byId = subs.find(
      (s) =>
        s.vendor_id &&
        vendor.id &&
        s.vendor_id.toLowerCase() === vendor.id.toLowerCase()
    );
    if (byId && byId.status === "active") return true;

    // fallback match by name
    const byName = subs.find(
      (s) =>
        s.vendor_name &&
        vendor.name &&
        s.vendor_name.toLowerCase() === vendor.name.toLowerCase()
    );
    if (byName && byName.status === "active") return true;

    return false;
  };

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      // status
      if (statusFilter !== "all") {
        if ((v.status || "").toLowerCase() !== statusFilter) return false;
      }
      // state
      if (stateFilter !== "ALL") {
        if ((v.state || "") !== stateFilter) return false;
      }
      // city
      if (cityFilter !== "ALL") {
        if ((v.city || "") !== cityFilter) return false;
      }
      // plan
      if (planFilter !== "ALL") {
        if ((v.plan || "") !== planFilter) return false;
      }
      // salesperson
      if (salesFilter !== "ALL") {
        if ((v.rep_id || "") !== salesFilter) return false;
      }
      // search
      if (search.trim().length > 0) {
        const term = search.trim().toLowerCase();
        const name = (v.name || "").toLowerCase();
        const city = (v.city || "").toLowerCase();
        const id = (v.id || "").toLowerCase();
        if (!name.includes(term) && !city.includes(term) && !id.includes(term))
          return false;
      }
      return true;
    });
  }, [
    vendors,
    statusFilter,
    stateFilter,
    cityFilter,
    planFilter,
    salesFilter,
    search,
  ]);

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Vendors</h1>
        <p className="text-sm text-white/50 mt-2">
          View and filter all vendors on LocalDeals247 — and jump to billing or messaging.
        </p>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm border transition ${
                statusFilter === status
                  ? "bg-orange-500/15 border-orange-500/40 text-white"
                  : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
              }`}
            >
              {status === "all"
                ? "All statuses"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by state
          </label>
          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
              setCityFilter("ALL");
            }}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            <option value="ALL">All states</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by city
          </label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            <option value="ALL">All cities</option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by plan
          </label>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            <option value="ALL">All plans</option>
            {plans.map((pl) => (
              <option key={pl} value={pl}>
                {pl}
              </option>
            ))}
          </select>
        </div>

        {salespeople.length > 0 ? (
          <div>
            <label className="text-xs text-white/50 block mb-1">
              Filter by salesperson
            </label>
            <select
              value={salesFilter}
              onChange={(e) => setSalesFilter(e.target.value)}
              className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
            >
              <option value="ALL">All salespeople</option>
              {salespeople.map((sp) => (
                <option key={sp} value={sp}>
                  {sp}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-white/50 block mb-1">
            Search vendor
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, or ID…"
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* content */}
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading vendors…
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5 text-red-100 text-sm">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          No vendors match these filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              billingActive={hasActiveSub(vendor)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VendorCard({
  vendor,
  billingActive,
}: {
  vendor: VendorRecord;
  billingActive: boolean;
}) {
  const messageHref =
    "/admin/messages?vendor_id=" +
    encodeURIComponent(vendor.id) +
    "&vendor_name=" +
    encodeURIComponent(vendor.name || "");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {vendor.name || "Unnamed Vendor"}
          </h2>
          <p className="text-xs text-white/40 mt-1">ID: {vendor.id}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span
            className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
              vendor.status === "active"
                ? "bg-green-500/10 text-green-200"
                : vendor.status === "pending"
                ? "bg-orange-500/10 text-orange-200"
                : vendor.status === "suspended"
                ? "bg-red-500/10 text-red-200"
                : "bg-white/5 text-white/30"
            }`}
          >
            {vendor.status || "unknown"}
          </span>
          <span
            className={`px-2 py-1 rounded text-[10px] ${
              billingActive
                ? "bg-green-500/10 text-green-50"
                : "bg-white/5 text-white/40"
            }`}
          >
            {billingActive ? "Billing: active" : "Billing: none"}
          </span>
        </div>
      </div>

      <div className="h-1 w-10 rounded-full bg-orange-400/80" />

      <p className="text-xs text-white/40">
        Location:{" "}
        {vendor.city || vendor.state
          ? `${vendor.city ? vendor.city + ", " : ""}${vendor.state || ""}`
          : "—"}
      </p>
      <p className="text-xs text-white/40">
        Plan: {vendor.plan || "—"}
      </p>
      <p className="text-xs text-white/40">
        Salesperson: {vendor.rep_id || "—"}
      </p>
      {vendor.created_at ? (
        <p className="text-[10px] text-white/25">
          Joined: {new Date(vendor.created_at).toLocaleString()}
        </p>
      ) : null}

      <div className="flex gap-2 mt-2">
        <Link
          href={messageHref}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 text-xs py-2 rounded-lg transition text-center"
        >
          Message
        </Link>
        {vendor.public_url || vendor.website ? (
          <a
            href={vendor.public_url || vendor.website || "#"}
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 hover:bg-white/10 text-white/50 text-xs py-2 px-3 rounded-lg transition text-center"
          >
            Site
          </a>
        ) : (
          <button
            disabled
            className="bg-white/5 text-white/20 text-xs py-2 px-3 rounded-lg"
          >
            Site
          </button>
        )}
      </div>
    </div>
  );
}
