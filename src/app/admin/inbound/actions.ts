"use server";

import { createSupabaseServer } from "@/utils/supabase/server";

// Assign an inbound (unclaimed) lead to a rep
export async function claimInboundLead(opts: {
  leadId: string;
  repId: string;
}) {
  const { leadId, repId } = opts;
  const supabase = createSupabaseServer();

  // Update the lead to attach sales_rep_id and move the stage forward
  const { error } = await supabase
    .from("rep_leads")
    .update({
      sales_rep_id: repId,
      stage: "assigned_from_inbound",
    })
    .eq("id", leadId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
  };
}
