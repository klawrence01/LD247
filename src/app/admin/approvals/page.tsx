// src/app/admin/approvals/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseBrowser"; // standardized name

type Vendor = {
  id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  plan: string | null;
  logo_url: string | null;
  website: string | null;
  status: string | null;
  created_at: string | null;
};

const STATUS_TABS = ["pending", "active", "rejected"] as const;

export default function AdminApprovalsPage() {
  const supabase = createClient();

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [activeStatus, setActiveStatus] =
    useState<(typeof STATUS_TABS)[number]>("pending");
  const [activeState, setActiveState] = useState<string>("ALL");
  const [activePlan, setActivePlan] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  // 1) load distinct states and plans once
  useEffect(() => {
    const loadFilters = async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("state, plan");

      if (error) {
        console.error(error);
        // don't kill UI, just leave filters empty
        return;
      }

      const uniqueStates = Array.from(
        new Set(
          (data || [])
            .map((row) => row.state?.trim())
            .filter(Boolean) as string[]
        )
      ).sort();

      const uniquePlans = Array.from(
        new Set(
          (data || [])
            .map((row) => row.plan?.trim())
            .filter(Boolean) as string[]
        )
      ).sort();

      setStates(uniqueStates);
      setPlans(uniquePlans);
    };

    loadFilters();
  }, [supabase]);

  // 2) load vendors for current status + state + plan + search
  useEffect(() => {
    const loadVendors = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("vendors")
        .select(
          "id, name, city, state, plan, logo_url, website, status, created_at"
        )
        .eq("status", activeStatus)
        .order("created_at", { ascending: false });

      if (activeState !== "ALL") {
        query = query.eq("state", activeState);
      }

      if (activePlan !== "ALL") {
        query = query.eq("plan", activePlan);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        setError("Could not load vendors.");
        setLoading(false);
        return;
      }

      let filtered = data || [];

      if (search.trim().length > 0) {
        const term = search.trim().toLowerCase();
        filtered = filtered.filter((v) =>
          (v.name || "").toLowerCase().includes(term)
        );
      }

      setVendors(filtered);
      setLoading(false);
    };

    loadVendors();
  }, [supabase, activeStatus, activeState, activePlan, search]);

  // update vendor + refresh list in place
  const updateVendorStatus = async (
    id: string,
    newStatus: "active" | "rejected"
  ) => {
    const { error: updateError } = await supabase
      .from("vendors")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      alert("Error updating vendor status.");
      return;
    }

    // optional log — won't crash if table doesn't exist
    await supabase
      .from("vendor_actions")
      .insert({ vendor_id: id, action: newStatus })
      .catch(() => {
        // ignore
      });

    // remove from current list
    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Vendor Approvals
        </h1>
        <p className="text-sm text-white/50 mt-2">
          Review and approve vendors waiting to go live on LocalDeals247 — by
          status, state, and plan.
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* status tabs */}
        <div className="flex gap-3">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatus(tab)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition ${
                activeStatus === tab
                  ? "bg-orange-500 text-white border-orange-400"
                  : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
              }`}
            >
              {tab === "active" ? "Approved" : tab}
            </button>
          ))}
        </div>

        {/* state dropdown */}
        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by state
          </label>
          <select
            value={activeState}
            onChange={(e) => setActiveState(e.target.value)}
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

        {/* plan dropdown */}
        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by plan
          </label>
          <select
            value={activePlan}
            onChange={(e) => setActivePlan(e.target.value)}
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

        {/* search */}
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-white/50 block mb-1">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vendor name…"
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading vendors…
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5 text-red-100 text-sm">
          {error}
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          No vendors found for these filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              showActions={activeStatus === "pending"}
              onApprove={() => updateVendorStatus(vendor.id, "active")}
              onReject={() => updateVendorStatus(vendor.id, "rejected")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VendorCard({
  vendor,
  showActions,
  onApprove,
  onReject,
}: {
  vendor: Vendor;
  showActions: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {vendor.name || "Unnamed Vendor"}
          </h2>
          <p className="text-xs text-white/40 mt-1">
            {vendor.city
              ? `${vendor.city}, ${vendor.state || ""}`
              : vendor.state || "—"}
          </p>
          {vendor.website ? (
            <p className="text-xs text-white/30">{vendor.website}</p>
          ) : null}
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-200 text-xs uppercase tracking-wide">
          {vendor.status}
        </span>
      </div>

      <div className="h-1 w-10 rounded-full bg-orange-400/80" />

      <p className="text-xs text-white/30">
        Created:{" "}
        {vendor.created_at
          ? new Date(vendor.created_at).toLocaleString()
          : "Unknown"}
      </p>
      <p className="text-xs text-white/30">
        Plan: {vendor.plan ? vendor.plan : "—"}
      </p>

      {showActions ? (
        <div className="flex gap-2 mt-2">
          <button
            onClick={onApprove}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-orange-500/90 hover:bg-orange-500 text-sm text-white font-medium py-2 rounded-lg transition"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/70 transition"
          >
            Reject
          </button>
        </div>
      ) : null}
    </div>
  );
}
