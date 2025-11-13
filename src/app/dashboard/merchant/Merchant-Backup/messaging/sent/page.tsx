// /src/app/dashboard/merchant/Merchant-Backup/messaging/sent/page.tsx
import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";

export default async function MerchantBackupSentMessagesPage() {
  // must await now because our helper is async
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  const { data: rows = [], error } = await supabase
    .from("messages")
    .select("id, subject, created_at")
    .eq("status", "sent")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("sent messages fetch failed", error);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Sent Messages (Backup)</h1>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No sent messages.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((m: any) => (
            <li key={m.id} className="border rounded-lg p-3 bg-white">
              <h2 className="font-semibold">{m.subject}</h2>
              <p className="text-xs text-muted-foreground">
                {m.created_at}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
