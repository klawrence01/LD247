// src/app/api/leads/[lead_id]/plan/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  context: { params: { lead_id: string } }
) {
  const { lead_id } = context.params;
  const supabase = createSupabaseServer();

  // read JSON body: { plan: "self-managed" } or { plan: "done-for-you" }
  let body: any;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const chosenPlan = body.plan;

  if (
    chosenPlan !== "self-managed" &&
    chosenPlan !== "done-for-you"
  ) {
    return NextResponse.json(
      { error: "Invalid plan." },
      { status: 400 }
    );
  }

  // update vendor_leads with the plan_choice
  const { data, error } = await supabase
    .from("vendor_leads")
    .update({
      plan_choice: chosenPlan,
    })
    .eq("id", lead_id)
    .select(
      "id, business_name, region_tag, plan_choice, trial_expires_at"
    )
    .single();

  if (error) {
    console.error("Plan update error:", error.message);
    return NextResponse.json(
      { error: "Could not save plan choice." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    lead_id: data.id,
    plan_choice: data.plan_choice,
    region_tag: data.region_tag,
    trial_expires_at: data.trial_expires_at,
  });
}
