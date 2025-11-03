import Link from "next/link";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Sent Notes" };

export default async function SentPage() {
  const supabase = createSupabaseServer();
  const { data: rows } = await supabase
    .from("messages")
    .select("id, subject, created_at")
    .eq("status","sent")
    .order("created_at",{ascending:false});

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sent Notes</h1>
        <Link href="/dashboard/merchant/messaging" className="text-sm underline">Back</Link>
      </div>
      <div className="mt-6 space-y-2">
        {(rows ?? []).map(m => (
          <div key={m.id} className="rounded-lg border px-4 py-3">
            <div className="font-medium">{m.subject}</div>
            <div className="text-xs text-gray-500">{new Date(m.created_at).toLocaleString()}</div>
          </div>
        ))}
        {(rows ?? []).length === 0 && <div className="text-gray-500 text-sm">You haven’t sent any notes yet.</div>}
      </div>
    </div>
  );
}
