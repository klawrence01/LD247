import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createSupabaseServer();
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { business_id, subject, body_html, audience_type = "all", audience_ref = null, status = "draft", scheduled_at = null } = body;

  if (!business_id || !subject || !body_html) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      business_id,
      subject,
      body_html,
      audience_type,
      audience_ref,
      status,
      scheduled_at,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ note: data }, { status: 201 });
}
