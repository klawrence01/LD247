"use server";

import { createSupabaseServer } from "@/utils/supabase/server";

// Assign / reassign rep ownership
export async function assignRepToBusiness(opts: {
  businessId: string;
  repId: string | null;
}) {
  const { businessId, repId } = opts;

  const supabase = createSupabaseServer();

  const { error } = await supabase
    .from("businesses")
    .update({
      assigned_rep_id: repId, // can be null to unassign
    })
    .eq("id", businessId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return { ok: true };
}

// Mark a business live/active
export async function approveBusiness(opts: { businessId: string }) {
  const { businessId } = opts;

  const supabase = createSupabaseServer();

  const { error } = await supabase
    .from("businesses")
    .update({
      status: "active",
    })
    .eq("id", businessId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return { ok: true };
}

// Force-take a business offline (billing/complaint/etc)
export async function pauseBusiness(opts: { businessId: string }) {
  const { businessId } = opts;

  const supabase = createSupabaseServer();

  const { error } = await supabase
    .from("businesses")
    .update({
      status: "on_hold",
    })
    .eq("id", businessId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return { ok: true };
}

// Feature this business's deal for a given city
// We'll snapshot the vendor hero_message at time of feature.
export async function featureDealForCity(opts: {
  businessId: string;
  city: string;
}) {
  const { businessId, city } = opts;

  const supabase = createSupabaseServer();

  // get hero_message so we save something attractive in featured_deals
  const { data: bizData, error: bizErr } = await supabase
    .from("businesses")
    .select("hero_message")
    .eq("id", businessId)
    .single();

  if (bizErr || !bizData) {
    return {
      ok: false,
      message: "Could not load business hero_message",
    };
  }

  const message = bizData.hero_message || null;

  const { error } = await supabase.from("featured_deals").insert({
    business_id: businessId,
    city,
    message,
    // starts_at defaults to now(),
    // ends_at stays null (meaning "currently featured")
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return { ok: true };
}
