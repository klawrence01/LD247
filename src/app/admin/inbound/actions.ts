"use server";

import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

// canonical version: accept ONE object
export async function assignInboundLead(args: {
  leadId: string;
  repId: string;
}) {
  const { leadId, repId } = args;

  const supabase = await createSupabaseServerClient(); // or await createSupabaseServer();

  const { error } = await supabase
    .from("rep_leads")
    .update({
      sales_rep_id: repId,
      stage: "assigned_from_inbound",
    })
    .eq("id", leadId);

  if (error) {
    console.error("inbound assign failed", error);
    throw new Error("Could not assign lead");
  }

  return { success: true };
}

// keep the old name the form imports
export { assignInboundLead as claimInboundLead };
