"use server";

import { createSupabaseServer } from "@/utils/supabase/server";

// This is called from the public city page lead form.
// We DO NOT assign a rep here — it's inbound. You or a dispatcher can assign later.
export async function submitInboundLead(opts: {
  city: string;
  business_name: string;
  contact_phone: string;
  best_time: string;
}) {
  const { city, business_name, contact_phone, best_time } = opts;

  // We'll store these as a new row in rep_leads with:
  // - sales_rep_id = null (unclaimed lead)
  // - stage = 'inbound_web'
  // That means "admin needs to route this to a rep."
  const supabase = createSupabaseServer();

  const { error } = await supabase.from("rep_leads").insert({
    sales_rep_id: null,
    business_name,
    contact_phone,
    best_time, // we'll reuse this for "best time to reach me"
    stage: "inbound_web",
    // You could add a column in rep_leads like "source_city" if you want.
    // If you do, just include it here:
    // source_city: city
  });

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
