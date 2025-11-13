"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSupabaseServer, // old name
  createSupabaseServerClient, // new name
} from "@/utils/supabase/server";

export async function submitRepLead(formData: FormData) {
  // 1) get supabase (MUST await now)
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  const rep_slug = formData.get("rep_slug") as string;
  const business_name = formData.get("business_name") as string;
  const contact_name = formData.get("contact_name") as string;
  const contact_email = formData.get("contact_email") as string;

  // 2) look up rep by slug
  const { data: repData, error: repErr } = await supabase
    .from("sales_reps")
    .select("id")
    .eq("slug", rep_slug)
    .single();

  if (repErr) {
    console.error("rep lookup failed", repErr);
    throw new Error("Rep not found");
  }

  // 3) insert lead (adjust table/columns to match your schema)
  const { error: leadErr } = await supabase.from("sales_leads").insert({
    sales_rep_id: repData.id,
    business_name,
    contact_name,
    contact_email,
  });

  if (leadErr) {
    console.error("lead insert failed", leadErr);
    throw new Error("Could not save lead");
  }

  // optional: refresh a page or redirect
  revalidatePath("/rep/dashboard");
  // redirect("/rep/dashboard");
}
