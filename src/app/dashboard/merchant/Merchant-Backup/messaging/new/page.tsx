import {
  createSupabaseServerClient,
} from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function MerchantBackupNewMessagePage() {
  const supabase = await createSupabaseServerClient();
  const { data: existing = [] } = await supabase
    .from("messages")
    .select("id, subject")
    .order("created_at", { ascending: false });

  async function createMessage(formData: FormData) {
    "use server";

    const supabase = await createSupabaseServerClient();

    const subject = String(formData.get("subject") || "").trim();
    const body_text = String(formData.get("body_text") || "").trim();
    const body_html = String(formData.get("body_html") || "").trim();
    const status = "draft";

    const { error } = await supabase
      .from("messages")
      .insert({ subject, body_text, body_html, status })
      .select("id")
      .single();

    if (error) {
      console.error("message insert failed", error);
      throw new Error("Could not create message");
    }

    revalidatePath("/dashboard/merchant/messaging/new");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">New Message (Backup)</h1>

      <form action={createMessage} className="space-y-3 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input name="subject" className="border rounded px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Body (text)</label>
          <textarea name="body_text" className="border rounded px-2 py-1 w-full min-h-[120px]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Body (HTML)</label>
          <textarea name="body_html" className="border rounded px-2 py-1 w-full min-h-[120px]" />
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Save Message
        </button>
      </form>

      <div>
        <h2 className="font-semibold mb-2 text-sm text-muted-foreground">
          Existing messages
        </h2>
        <ul className="space-y-1">
          {existing.map((m: any) => (
            <li key={m.id} className="text-sm">
              {m.subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
