// C:\Users\klawr\LD247\src\app\admin\vendor\[businessId]\actions.ts
"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export async function approveVendor(businessId: string) {
  const supabase = createSupabaseServerClient();
  await supabase
    .from("businesses")
    .update({ status: "approved" })
    .eq("id", businessId);
}

export async function rejectVendor(businessId: string) {
  const supabase = createSupabaseServerClient();
  await supabase
    .from("businesses")
    .update({ status: "rejected" })
    .eq("id", businessId);
}
