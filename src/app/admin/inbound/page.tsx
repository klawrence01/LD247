import { createSupabaseServer } from "@/utils/supabase/server";
import ClaimLeadForm from "./ClaimLeadForm";

export const metadata = {
  title: "Inbound Leads | Admin | Local Deals 24/7",
  description: "Business owners asking to be featured. Claim and assign.",
};

export default async function InboundLeadsPage() {
  const supabase = createSupabaseServer();

  // 1. Get all unclaimed inbound leads
  const { data: inboundLeads = [] } = await supabase
    .from("rep_leads")
    .select(
      "id, business_name, contact_phone, best_time, stage, created_at, source_city, sales_rep_id"
    )
    .is("sales_rep_id", null)
    .eq("stage", "inbound_web")
    .order("created_at", { ascending: false });

  // 2. Get list of active reps to assign to
  const { data: activeReps = [] } = await supabase
    .from("sales_reps")
    .select("id, name, territory, status")
    .eq("status", "active")
    .order("name", { ascending: true });

  return (
    <div className="text-neutral-100 space-y-8">
      {/* HEADER */}
      <section>
        <h1 className="text-xl font-semibold text-white leading-tight">
          Inbound Leads
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Business owners who asked to be featured. Assign them to a closer.
        </p>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryStat
          label="Unclaimed Inbound"
          value={inboundLeads.length}
          hint="Leads waiting for a rep"
        />
        <SummaryStat
          label="Active Reps"
          value={activeReps.length}
          hint="Available to assign"
        />
        <SummaryStat
          label="Stage Filter"
          value={"inbound_web"}
          hint="Leads shown here are website requests"
        />
      </section>

      {/* LEADS TABLE */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Unclaimed Website Leads
            </h2>
            <p className="text-sm text-neutral-400">
              These came in from the public city pages.
            </p>
          </div>
        </div>

        {inboundLeads.length === 0 ? (
          <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
            No inbound leads are waiting right now.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="py-2 pr-4 font-medium">Business</th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    Phone
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    Best Time
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    City
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    When
                  </th>
                  <th className="py-2 pr-4 font-medium whitespace-nowrap">
                    Stage
                  </th>
                  <th className="py-2 font-medium text-right whitespace-nowrap">
                    Assign
                  </th>
                </tr>
              </thead>
              <tbody>
                {inboundLeads.map((lead: any) => (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-800 last:border-none align-top"
                  >
                    {/* BUSINESS NAME */}
                    <td className="py-3 pr-4 text-white font-semibold">
                      <div className="leading-tight">
                        {lead.business_name || "—"}
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="py-3 pr-4 text-neutral-200">
                      {lead.contact_phone || "—"}
                    </td>

                    {/* BEST TIME */}
                    <td className="py-3 pr-4 text-neutral-400 text-[12px] leading-snug">
                      {lead.best_time || "—"}
                    </td>

                    {/* CITY */}
                    <td className="py-3 pr-4 text-neutral-300 text-[13px] leading-snug">
                      {lead.source_city || "—"}
                    </td>

                    {/* WHEN */}
                    <td className="py-3 pr-4 text-neutral-400 text-[12px] leading-snug whitespace-nowrap">
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString()
                        : "—"}
                    </td>

                    {/* STAGE */}
                    <td className="py-3 pr-4">
                      <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded px-2 py-1">
                        {lead.stage || "—"}
                      </span>
                    </td>

                    {/* ASSIGN CONTROL */}
                    <td className="py-3 pr-4 text-right min-w-[180px]">
                      <ClaimLeadForm
                        leadId={lead.id}
                        reps={activeReps.map((r: any) => ({
                          id: r.id,
                          name: r.name,
                          territory: r.territory,
                        }))}
                      />
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

function SummaryStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
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
