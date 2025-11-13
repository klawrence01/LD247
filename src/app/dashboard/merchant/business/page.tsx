// /src/app/dashboard/merchant/business/page.tsx
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export default async function MerchantBusinessPage() {
  // 1) get real supabase client
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  // 2) get current user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    // you can redirect instead if you want
    throw new Error("Not authenticated.");
  }

  // 3) fetch this merchant’s business record(s)
  const { data: businesses = [], error: bizErr } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id);

  if (bizErr) {
    console.error("fetch businesses failed", bizErr);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Business</h1>

      {businesses.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You don’t have a business on file yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {businesses.map((b) => (
            <li key={b.id} className="border rounded-lg p-4 bg-white">
              <h2 className="font-semibold">{b.name}</h2>
              <p className="text-sm text-muted-foreground">
                {b.city}, {b.state}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
