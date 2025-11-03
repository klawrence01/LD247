// src/app/api/redeemCoupon/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function sb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

/*
POST body (formData):
- claim_id: uuid from coupon_claims.id
*/
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const claim_id = (formData.get("claim_id") || "")
      .toString()
      .trim();

    if (!claim_id) {
      return NextResponse.json(
        { error: "Missing claim_id." },
        { status: 400 }
      );
    }

    const supabase = sb();

    const { error } = await supabase
      .from("coupon_claims")
      .update({
        status: "redeemed",
        redeemed_at: new Date().toISOString(),
      })
      .eq("id", claim_id);

    if (error) {
      console.error("redeemCoupon update error", error);
      return NextResponse.json(
        { error: "Database update failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("redeemCoupon POST error", err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
