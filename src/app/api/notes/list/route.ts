// /src/app/api/notes/list/route.ts
import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export async function GET() {
  // get the real client (must await now)
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  // check auth
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // fetch notes for this user
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ notes: data ?? [] });
}
