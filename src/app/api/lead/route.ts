// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { createSupabaseAnon } from "@/utils/supabase/edge";

// Expected form fields from /sales:
// businessName, category, city, state, contact, offer, source

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const businessName = (formData.get("businessName") || "").toString().trim();
    const category = (formData.get("category") || "").toString().trim();
    const city = (formData.get("city") || "").toString().trim();
    const state = (formData.get("state") || "").toString().trim();
    const contact = (formData.get("contact") || "").toString().trim();
    const offer = (formData.get("offer") || "").toString().trim();
    const source = (formData.get("source") || "").toString().trim();

    // Basic required validation
    if (!businessName || !category || !city || !state || !contact) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAnon();

    // Insert into Supabase table "leads"
    const { error } = await supabase.from("leads").insert([
      {
        business_name: businessName,
        category,
        city,
        state,
        contact_info: contact,
        first_offer_idea: offer || null,
        source_hint: source || null,
      },
    ]);

    if (error) {
      console.error("lead insert error", error);
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("lead POST error", err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
