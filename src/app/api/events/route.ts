import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServer(); // anon OK for insert per policy
    const body = await req.json();
    const { business_id, type, meta } = body || {};

    if (!business_id || !type) {
      return NextResponse.json({ error: "business_id and type are required" }, { status: 400 });
    }

    const { error } = await supabase.from("events").insert({
      business_id,
      type,
      meta: meta ?? {},
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unknown error" }, { status: 500 });
  }
}
