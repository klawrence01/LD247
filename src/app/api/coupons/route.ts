import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper: compute status by dates
function computeStatus(startISO: string, endISO: string) {
  const now = new Date();
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (now < start) return "upcoming";
  if (now > end) return "expired";
  return "active";
}

// NOTE: adjust vendorId retrieval once auth is fully wired.
// For now we accept a header or default demo vendor.
async function getVendorId() {
  // TODO: replace with real auth user → vendor_id lookup
  return "demo-vendor-1";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const vendor_id = await getVendorId();

    const startISO = new Date(body.startDate).toISOString();
    const endISO = new Date(body.endDate).toISOString();
    const status = computeStatus(startISO, endISO);

    const { error } = await supabase.from("coupons").insert([
      {
        vendor_id,
        title: body.title,
        deal_type: body.dealType,
        value: body.value,
        description: body.description,
        start_date: startISO,
        end_date: endISO,
        limit_per_person: body.limitPerPerson ?? 1,
        address_override: body.address || null,
        phone_override: body.phone || null,
        image_url: body.imageUrl || null,
        status,
      },
    ]);

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return new NextResponse(err.message || "Server error", { status: 500 });
  }
}
