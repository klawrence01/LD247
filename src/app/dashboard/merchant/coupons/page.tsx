// /src/app/dashboard/merchant/coupons/page.tsx
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export default async function MerchantCouponsPage() {
  // 1) must await now (Next 15 → async cookies → async supabase helper)
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  // 2) get current user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    throw new Error("Not authenticated.");
  }

  // 3) fetch coupons for this merchant (adjust to your schema)
  const { data: coupons = [], error: couponErr } = await supabase
    .from("coupons")
    .select("*")
    .eq("merchant_id", user.id);

  if (couponErr) {
    console.error("coupon fetch failed", couponErr);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Coupons</h1>

      {coupons.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You don’t have any coupons yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {coupons.map((c) => (
            <li key={c.id} className="border rounded-lg p-4 bg-white">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="text-sm text-muted-foreground">
                {c.description ?? ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
