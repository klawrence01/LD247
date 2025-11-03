// src/app/api/follow/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function sb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

// Expected form data:
// business_id: the vendor they're following
// user_id: optional for now (can be null until auth lands)

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const business_id = (formData.get("business_id") || "")
      .toString()
      .trim();
    const user_id = (formData.get("user_id") || "")
      .toString()
      .trim();

    if (!business_id) {
      return NextResponse.json(
        { error: "Missing business_id." },
        { status: 400 }
      );
    }

    const supabase = sb();

    const { error } = await supabase.from("follows").insert([
      {
        business_id,
        user_id: user_id || null,
      },
    ]);

    if (error) {
      console.error("follow insert error", error);
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("follow POST error", err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
