// /src/app/admin/inbound/page.tsx
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";
import ClaimLeadForm from "./ClaimLeadForm";

export default async function InboundPage() {
  // 1) get the real supabase client (MUST await)
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  // 2) get all unclaimed inbound leads
  const { data: inboundLeads = [], error: leadErr } = await supabase
    .from("rep_leads")
    .select(
      "id, business_name, contact_phone, best_time, stage, created_at, source_city, sales_rep_id"
    )
    .is("sales_rep_id", null); // adjust filter to what you want

  if (leadErr) {
    console.error("inbound leads fetch failed", leadErr);
  }

  // 3) get list of reps to assign to (if you need it on this page)
  const { data: reps = [] } = await supabase
    .from("sales_reps")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Inbound Leads</h1>

      {inboundLeads.length === 0 ? (
        <p className="text-sm text-muted-foreground">No inbound leads.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {inboundLeads.map((lead) => (
            <div key={lead.id} className="border rounded-lg p-4 bg-white">
              <h2 className="font-semibold">{lead.business_name}</h2>
              <p className="text-sm text-muted-foreground">
                From: {lead.source_city ?? "Unknown"}
              </p>
              <p className="text-sm text-muted-foreground">
                Best time: {lead.best_time ?? "—"}
              </p>

              {/* pass reps + this lead to the form */}
              <div className="mt-4">
                <ClaimLeadForm leadId={lead.id} reps={reps} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
