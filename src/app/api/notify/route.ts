// src/app/api/notify/route.ts
import { NextResponse } from "next/server";
import { createSupabaseAnon } from "@/utils/supabase/edge";

// Expected form fields from /notify:
// contact (required), notes (optional), business_id (hidden field), deal_id (optional hidden)

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const contact = (formData.get("contact") || "").toString().trim();
    const notes = (formData.get("notes") || "").toString().trim();
    const business_id = (formData.get("business_id") || "")
      .toString()
      .trim();
    const deal_id = (formData.get("deal_id") || "").toString().trim();

    if (!contact || !business_id) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAnon();

    // Insert into Supabase table "waitlist"
    const { error } = await supabase.from("waitlist").insert([
      {
        business_id: business_id || null,
        deal_id: deal_id || null,
        contact: contact,
        notes: notes || null,
      },
    ]);

    if (error) {
      console.error("waitlist insert error", error);
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("notify POST error", err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
