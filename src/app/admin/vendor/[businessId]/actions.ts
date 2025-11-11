"use server";

import { createClient } from "@/lib/supabaseServer"; // 👈 use your server helper here

export async function approveBusiness(businessId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("vendor")
    .update({ status: "approved" })
    .eq("id", businessId);

  if (error) {
    console.error("approveBusiness error:", error.message);
    throw new Error(error.message);
  }
}

export async function pauseBusiness(businessId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("vendor")
    .update({ status: "paused" })
    .eq("id", businessId);

  if (error) {
    console.error("pauseBusiness error:", error.message);
    throw new Error(error.message);
  }
}

export async function assignRepToBusiness(businessId: string, repId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("vendor")
    .update({ rep_id: repId })
    .eq("id", businessId);

  if (error) {
    console.error("assignRepToBusiness error:", error.message);
    throw new Error(error.message);
  }
}

export async function featureDealForCity(businessId: string, city: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("vendor")
    .update({ featured_city: city })
    .eq("id", businessId);

  if (error) {
    console.error("featureDealForCity error:", error.message);
    throw new Error(error.message);
  }
}
