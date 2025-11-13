// Server Component
import Link from "next/link";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Messaging • Sent",
};

export default async function SentMessagesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: rows, error } = await supabase
    .from("messages")
    .select("id, subject, created_at")
    .eq("status", "sent")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Sent Messages</h1>
        <p className="mt-4 text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Sent Messages</h1>

      {(!rows || rows.length === 0) ? (
        <p className="mt-4 text-sm text-gray-500">No messages sent yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((m) => (
            <li key={m.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.subject ?? "(no subject)"}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(m.created_at as string).toLocaleString()}
                  </div>
                </div>
                {/* If you have a detail route, update this href accordingly */}
                <Link
                  className="text-sm underline"
                  href={`/dashboard/merchant/messaging/${m.id}`}
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
