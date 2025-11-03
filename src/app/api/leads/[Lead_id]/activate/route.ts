// src/app/api/leads/[lead_id]/activate/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  context: { params: { lead_id: string } }
) {
  const { lead_id } = context.params;
  const supabase = createSupabaseServer();

  // 1. Look up the lead in vendor_leads
  const { data: lead, error: leadError } = await supabase
    .from("vendor_leads")
    .select(
      `
      id,
      business_name,
      owner_name,
      email,
      phone,
      city,
      state,
      region_tag,
      status,
      activated_at,
      trial_expires_at
    `
    )
    .eq("id", lead_id)
    .single();

  if (leadError || !lead) {
    console.error("Lead lookup error:", leadError?.message);
    return NextResponse.json(
      { error: "Lead not found." },
      { status: 404 }
    );
  }

  // If they already activated before, don't break, just continue gracefully.
  const alreadyActivated = lead.status === "activated";

  // We'll compute new timestamps if not yet activated.
  // NOTE: trial_expires_at = now + 30 days
  const nowIso = new Date().toISOString();
  const expiresIso = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // 2. Update the lead row: status, activated_at, trial_expires_at
  if (!alreadyActivated) {
    const { error: updateErr } = await supabase
      .from("vendor_leads")
      .update({
        status: "activated",
        activated_at: nowIso,
        trial_expires_at: expiresIso,
      })
      .eq("id", lead_id);

    if (updateErr) {
      console.error("Lead update error:", updateErr.message);
      return NextResponse.json(
        { error: "Could not activate this lead." },
        { status: 500 }
      );
    }
  }

  // 3. Create their business record in `businesses`
  //
  // We'll create a URL slug from the business name.
  // Later you can enforce uniqueness or add "-ct" / "-002" etc.
  const slugBase = (lead.business_name || "local-business")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const slug = slugBase;

  // Insert a basic business row. If it already exists, we *try* again gracefully.
  const { data: bizRow, error: bizError } = await supabase
    .from("businesses")
    .insert({
      name: lead.business_name,
      slug: slug,
      city: lead.city,
      state: lead.state,
      region_tag: lead.region_tag,
      description:
        "This local business is getting set up on Local Deals 24/7. Check back for live specials.",
      owner_email: lead.email,
      owner_phone: lead.phone,
      active: true,
      // You may already have other columns like created_at defaulting automatically.
    })
    .select("id, slug, city, state, region_tag")
    .single();

  if (bizError) {
    // This might happen if a row with that slug/name already exists.
    // We don't block activation over it — the trial clock is the critical thing.
    console.warn("Business insert warning:", bizError.message);
  }

  // 4. Return JSON so the client can redirect to /vendor/lead/[id]/live
  return NextResponse.json({
    ok: true,
    lead_id,
    business_name: lead.business_name,
    city: lead.city,
    state: lead.state,
    region_tag: lead.region_tag,
    slug: bizRow?.slug || slug,
    activated_at: alreadyActivated ? lead.activated_at || nowIso : nowIso,
    trial_expires_at: alreadyActivated
      ? lead.trial_expires_at || expiresIso
      : expiresIso,
  });
}
