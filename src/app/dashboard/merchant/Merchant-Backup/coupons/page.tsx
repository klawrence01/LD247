// /src/app/dashboard/merchant/Merchant-Backup/coupons/page.tsx
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export default async function MerchantBackupCouponsPage() {
  // must await now
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    throw new Error("Not authenticated.");
  }

  const { data: coupons = [], error: couponErr } = await supabase
    .from("coupons")
    .select("*")
    .eq("merchant_id", user.id);

  if (couponErr) {
    console.error("fetch coupons failed", couponErr);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Coupons (Backup)</h1>
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
