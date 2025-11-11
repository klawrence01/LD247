"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type BillingRecord = {
  id: string;
  vendor_name: string | null;
  vendor_id: string | null;
  plan: string | null;
  status: string | null;
  amount: number | null;
  currency: string | null;
  next_billing_at: string | null;
  created_at: string | null;
  salesperson: string | null;
  state: string | null;
  region: string | null;
  customer_email: string | null;
};

type PaymentHistory = {
  id: string;
  subscription_id: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  paid_at: string | null;
  created_at: string | null;
  note: string | null;
};

const STATUS_FILTERS = ["active", "trialing", "past_due", "canceled"] as const;
const PLAN_FILTERS = ["All plans", "Trial", "Starter", "Pro", "Franchise"] as const;
const MONTH_FILTERS = ["All months", "This month", "Last month"] as const;

const LD247_REGIONS = [
  "New England",
  "Mid-Atlantic",
  "Southeast",
  "Midwest",
  "Rocky Mountains",
  "Southwest",
  "Pacific Coastal",
];

export default function AdminBillingPage() {
  const supabase = getSupabaseBrowser();

  const [tableName, setTableName] = useState<string | null>(null);
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number] | "all">("all");
  const [planFilter, setPlanFilter] = useState("All plans");
  const [monthFilter, setMonthFilter] =
    useState<(typeof MONTH_FILTERS)[number]>("All months");
  const [search, setSearch] = useState("");

  const [salespeople, setSalespeople] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [hasRegionData, setHasRegionData] = useState(false);

  const [salespersonFilter, setSalespersonFilter] = useState("ALL");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [regionFilter, setRegionFilter] = useState("ALL");

  // modal state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRecords, setHistoryRecords] = useState<PaymentHistory[]>([]);
  const [historyFor, setHistoryFor] = useState<BillingRecord | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      // try subscriptions first
      let { data, error } = await supabase.from("subscriptions").select("*");
      let activeTable = "subscriptions";

      if (error) {
        const fallback = await supabase
          .from("vendor_subscriptions")
          .select("*");
        if (fallback.error) {
          setError(
            "No billing table found. Create 'subscriptions' or 'vendor_subscriptions' in Supabase."
          );
          setLoading(false);
          return;
        } else {
          data = fallback.data;
          activeTable = "vendor_subscriptions";
        }
      }

      setTableName(activeTable);

      const normalized: BillingRecord[] = (data || []).map((row: any) => ({
        id: row.id,
        vendor_name:
            row.vendor_name ||
            row.business_name ||
            row.company_name ||
            row.name ||
            null,
        vendor_id: row.vendor_id ? String(row.vendor_id) : null,
        plan: row.plan || row.plan_name || null,
        status: row.status || null,
        amount: row.amount || row.price || null,
        currency: row.currency || "USD",
        next_billing_at: row.next_billing_at || row.renews_at || null,
        created_at: row.created_at || null,
        salesperson:
            row.salesperson ||
            row.sales_rep ||
            row.rep_name ||
            (row.rep_id ? `Rep ${row.rep_id}` : null) ||
            null,
        state: row.state || null,
        region: row.region || null,
        customer_email: row.customer_email || row.email || null,
      }));

      // build filter options
      const uniqSales = Array.from(
        new Set(
          normalized
            .map((r) => r.salesperson)
            .filter(Boolean) as string[]
        )
      ).sort();
      setSalespeople(uniqSales);

      const uniqStates = Array.from(
        new Set(
          normalized
            .map((r) => r.state)
            .filter(Boolean) as string[]
        )
      ).sort();
      setStates(uniqStates);

      const anyRegion = normalized.some((r) => !!r.region);
      setHasRegionData(anyRegion);

      setRecords(normalized);
      setLoading(false);
    };

    load();
  }, [supabase]);

  // filter records client-side
  const filteredRecords = records.filter((r) => {
    // status
    if (statusFilter !== "all") {
      if ((r.status || "").toLowerCase() !== statusFilter) return false;
    }

    // plan
    if (planFilter !== "All plans") {
      if ((r.plan || "").toLowerCase() !== planFilter.toLowerCase())
        return false;
    }

    // month
    if (monthFilter !== "All months") {
      const now = new Date();
      const target = new Date(
        monthFilter === "This month"
          ? now.getFullYear()
          : now.getMonth() === 0
          ? now.getFullYear() - 1
          : now.getFullYear(),
        monthFilter === "This month"
          ? now.getMonth()
          : now.getMonth() === 0
          ? 11
          : now.getMonth() - 1,
        1
      );

      const dateString = r.next_billing_at || r.created_at;
      if (dateString) {
        const d = new Date(dateString);
        const sameMonth =
          d.getFullYear() === target.getFullYear() &&
          d.getMonth() === target.getMonth();
        if (!sameMonth) return false;
      } else {
        return false;
      }
    }

    // salesperson
    if (salespersonFilter !== "ALL") {
      if ((r.salesperson || "") !== salespersonFilter) return false;
    }

    // state
    if (stateFilter !== "ALL") {
      if ((r.state || "") !== stateFilter) return false;
    }

    // region
    if (hasRegionData && regionFilter !== "ALL") {
      if ((r.region || "") !== regionFilter) return false;
    }

    // search
    if (search.trim().length > 0) {
      const term = search.trim().toLowerCase();
      const name = (r.vendor_name || "").toLowerCase();
      const id = (r.vendor_id || "").toLowerCase();
      const email = (r.customer_email || "").toLowerCase();
      if (!name.includes(term) && !id.includes(term) && !email.includes(term))
        return false;
    }

    return true;
  });

  // open modal + load history
  const openHistory = async (record: BillingRecord) => {
    setHistoryFor(record);
    setHistoryOpen(true);
    setHistoryLoading(true);

    const { data, error } = await supabase
      .from("subscription_payments")
      .select("*")
      .eq("subscription_id", record.id)
      .order("created_at", { ascending: false });

    if (!error) {
      const normalized: PaymentHistory[] = (data || []).map((row: any) => ({
        id: row.id,
        subscription_id: row.subscription_id || null,
        amount: row.amount || null,
        currency: row.currency || "USD",
        status: row.status || null,
        paid_at: row.paid_at || null,
        created_at: row.created_at || null,
        note: row.note || null,
      }));
      setHistoryRecords(normalized);
    } else {
      setHistoryRecords([]);
    }

    setHistoryLoading(false);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
    setHistoryFor(null);
    setHistoryRecords([]);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-sm text-white/50 mt-2">
          See subscriptions, plan levels, and upcoming renewals — with salesperson, state, and history.
        </p>
        {tableName ? (
          <p className="text-[10px] text-white/30 mt-1">
            Using Supabase table: <strong>{tableName}</strong>
          </p>
        ) : null}
      </div>

      {/* filters row 1 */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex gap-3">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm border transition ${
              statusFilter === "all"
                ? "bg-orange-500 text-white border-orange-400"
                : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
            }`}
          >
            All statuses
          </button>
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition ${
                statusFilter === status
                  ? "bg-orange-500 text-white border-orange-400"
                  : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
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
            {PLAN_FILTERS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">
            Filter by month
          </label>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value as any)}
            className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
          >
            {MONTH_FILTERS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-white/50 block mb-1">
            Search vendor / email / ID
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* filters row 2 */}
      <div className="flex flex-wrap gap-4 items-end">
        {salespeople.length > 0 ? (
          <div>
            <label className="text-xs text-white/50 block mb-1">
              Filter by salesperson
            </label>
            <select
              value={salespersonFilter}
              onChange={(e) => setSalespersonFilter(e.target.value)}
              className="bg-white/5 text-white text-sm rounded-lg px-3 py-2 border border-white/10"
            >
              <option value="ALL">All salespeople</option>
              {salespeople.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {states.length > 0 ? (
          <div>
            <label className="text-xs text-white/50 block mb-1">
              Filter by state
            </label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
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
        ) : null}

        {hasRegionData ? (
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
              {LD247_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      {/* content */}
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading billing data…
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5 text-red-100 text-sm">
          {error}
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          No billing records found for these filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecords.map((rec) => (
            <BillingCard key={rec.id} record={rec} onViewHistory={() => openHistory(rec)} />
          ))}
        </div>
      )}

      {/* history modal */}
      {historyOpen ? (
        <HistoryModal
          onClose={closeHistory}
          loading={historyLoading}
          payments={historyRecords}
          subscription={historyFor}
        />
      ) : null}
    </div>
  );
}

function BillingCard({
  record,
  onViewHistory,
}: {
  record: BillingRecord;
  onViewHistory: () => void;
}) {
  const amount =
    record.amount !== null && !Number.isNaN(record.amount)
      ? `$${(record.amount / 100).toFixed(2)}`
      : "—";

  const mailtoLink = record.customer_email
    ? `mailto:${record.customer_email}?subject=${encodeURIComponent(
        "LocalDeals247 Billing"
      )}&body=${encodeURIComponent(
        `Hi ${record.vendor_name || ""},\n\nThis is LocalDeals247 regarding your ${
          record.plan || "current"
        } subscription.`
      )}`
    : null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {record.vendor_name || "Unknown Vendor"}
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Vendor ID: {record.vendor_id || "—"}
          </p>
          {record.customer_email ? (
            <p className="text-xs text-white/40 mt-1">{record.customer_email}</p>
          ) : null}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
            record.status === "active"
              ? "bg-green-500/10 text-green-200"
              : record.status === "past_due"
              ? "bg-red-500/10 text-red-200"
              : "bg-orange-500/10 text-orange-200"
          }`}
        >
          {record.status || "unknown"}
        </span>
      </div>

      <div className="h-1 w-10 rounded-full bg-orange-400/80" />

      <p className="text-xs text-white/40">Plan: {record.plan || "—"}</p>
      <p className="text-xs text-white/40">
        Amount: {amount} {record.currency || ""}
      </p>
      <p className="text-xs text-white/40">
        Salesperson: {record.salesperson || "—"}
      </p>
      <p className="text-xs text-white/40">
        Location: {record.state || record.region || "—"}
      </p>
      <p className="text-xs text-white/30">
        Next billing:{" "}
        {record.next_billing_at
          ? new Date(record.next_billing_at).toLocaleString()
          : "—"}
      </p>
      <p className="text-[10px] text-white/25">
        Created:{" "}
        {record.created_at
          ? new Date(record.created_at).toLocaleString()
          : "—"}
      </p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onViewHistory}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 text-xs py-2 rounded-lg transition"
        >
          View history
        </button>
        {mailtoLink ? (
          <a
            href={mailtoLink}
            className="bg-white/5 hover:bg-white/10 text-white/50 text-xs py-2 px-3 rounded-lg transition text-center"
          >
            Email
          </a>
        ) : (
          <button
            disabled
            className="bg-white/5 text-white/20 text-xs py-2 px-3 rounded-lg"
          >
            Email
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryModal({
  onClose,
  loading,
  payments,
  subscription,
}: {
  onClose: () => void;
  loading: boolean;
  payments: PaymentHistory[];
  subscription: BillingRecord | null;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Payment history
            </h2>
            <p className="text-[11px] text-white/40">
              {subscription?.vendor_name} — {subscription?.plan}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-sm"
          >
            Close
          </button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
            {loading ? (
              <p className="text-white/50 text-sm">Loading…</p>
            ) : payments.length === 0 ? (
              <p className="text-white/40 text-sm">
                No payments recorded for this subscription.
              </p>
            ) : (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                  >
                    <div>
                      <p className="text-sm text-white">
                        {p.paid_at
                          ? new Date(p.paid_at).toLocaleString()
                          : p.created_at
                          ? new Date(p.created_at).toLocaleString()
                          : "—"}
                      </p>
                      <p className="text-[11px] text-white/40">
                        {p.note || "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">
                        {p.amount
                          ? `$${(p.amount / 100).toFixed(2)} ${
                              p.currency || ""
                            }`
                          : "—"}
                      </p>
                      <p
                        className={`text-[10px] uppercase ${
                          p.status === "paid"
                            ? "text-green-300"
                            : "text-orange-200"
                        }`}
                      >
                        {p.status || "paid"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
