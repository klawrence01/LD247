import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use anon key for read-only; service role works too if you have it.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function startOfDayISO(d: Date) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return x.toISOString(); // 00:00:00Z
}
function nextDayISO(d: Date) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
  return x.toISOString(); // next day 00:00:00Z
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = (searchParams.get("city") || "").toLowerCase();
    const dateStr = searchParams.get("date"); // expected yyyy-mm-dd

    if (!city || !dateStr) {
      return NextResponse.json({ error: "Missing city or date" }, { status: 400 });
    }

    const date = new Date(dateStr + "T00:00:00Z");
    const dayStart = startOfDayISO(date);
    const dayEnd = nextDayISO(date);

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // 1) Try a "deals" table with a single date column (date/timestamptz)
    let rows: any[] = [];
    let dealsErr: any = null;

    const dealsRes = await supabase
      .from("deals")
      .select("id,title,description,image_url,imageUrl,vendor,vendor_name,city,date")
      .eq("city", city)
      // robust to date or timestamptz:
      .gte("date", dayStart)
      .lt("date", dayEnd)
      .limit(60);

    if (dealsRes.error && dealsRes.error.code !== "42P01") {
      dealsErr = dealsRes.error;
    } else if (!dealsRes.error && dealsRes.data?.length) {
      rows = dealsRes.data;
    }

    // 2) If empty or table missing, try a "coupons" table with a date range
    if (rows.length === 0) {
      const couponsRes = await supabase
        .from("coupons")
        .select(
          "id,title,description,image_url,imageUrl,vendor,vendor_name,city,start_date,end_date"
        )
        .eq("city", city)
        // active on that day:  start_date < nextDay && end_date >= dayStart
        .lt("start_date", dayEnd)
        .gte("end_date", dayStart)
        .limit(60);

      if (!couponsRes.error && couponsRes.data?.length) {
        rows = couponsRes.data;
      } else if (couponsRes.error && couponsRes.error.code !== "42P01") {
        dealsErr = dealsErr || couponsRes.error;
      }
    }

    // Normalize output
    const out = (rows || []).map((r: any) => ({
      id: r.id,
      title: r.title ?? "Untitled Deal",
      description: r.description ?? "",
      imageUrl: r.imageUrl ?? r.image_url ?? null,
      vendor: r.vendor ?? r.vendor_name ?? "",
      city: r.city ?? city,
      // prefer explicit 'date', else clamp to requested date if coupon span
      date:
        r.date ??
        dateStr,
    }));

    return NextResponse.json(out);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
