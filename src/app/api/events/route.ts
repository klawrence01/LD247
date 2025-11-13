// /src/app/api/events/route.ts
import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    // 1) real client (MUST await now)
    const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

    // 2) read body
    const { business_id, type, meta } = await req.json();

    // 3) insert event
    const { error } = await supabase.from("events").insert({
      business_id,
      type,
      meta: meta ?? {},
    });

    if (error) {
      console.error("events insert failed", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("events route error", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
