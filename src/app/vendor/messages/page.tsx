// src/app/vendor/messages/page.tsx
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = {
  title: "Vendor • Messages",
};

export default async function VendorMessagesPage() {
  // IMPORTANT: await the server client
  const supabase = await createSupabaseServer();

  // get current user (SSR)
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    // not logged in → send to login (adjust path if yours is different)
    redirect("/login");
  }

  // optional: load recent messages (safe to leave even if table is empty)
  const { data: rows = [], error: msgErr } = await supabase
    .from("messages")
    .select("id, subject, created_at")
    .order("created_at", { ascending: false })
    .limit(25);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Messages</h1>

      {msgErr ? (
        <p className="mt-4 text-sm text-red-500">
          Couldn’t load messages: {msgErr.message}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No messages yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {rows.map((m) => (
            <li key={m.id} className="rounded-lg border p-3">
              <div className="text-sm font-medium">{m.subject ?? "(no subject)"}</div>
              <div className="text-xs text-gray-500">
                {new Date(m.created_at as string).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
