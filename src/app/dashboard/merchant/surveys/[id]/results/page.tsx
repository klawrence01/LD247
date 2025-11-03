import { createSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Survey Results" };

async function sendReply(formData: FormData) {
  "use server";
  const supa = createSupabaseServer();
  const survey_id = String(formData.get("survey_id") || "");
  const email     = String(formData.get("email") || "").trim();
  const subject   = String(formData.get("subject") || "").trim();
  const body      = String(formData.get("body") || "");

  if (!email || !subject) return;

  // upsert contact
  const { data: contact } = await supa.from("contacts")
    .insert({ email })
    .select("id,email")
    .single()
    .catch(async () => {
      const { data } = await supa.from("contacts").select("id,email").eq("email", email).single();
      return { data };
    });

  if (!contact) return;

  // create message as 'sent'
  const { data: msg } = await supa.from("messages")
    .insert({ subject, body_text: body, body_html: body, status: "sent" })
    .select("id").single();
  if (!msg) return;

  await supa.from("message_recipients").insert({ message_id: msg.id, contact_id: contact.id, email: contact.email });

  revalidatePath(`/dashboard/merchant/surveys/${survey_id}/results`);
}

export default async function SurveyResults({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();

  const [{ data: survey }, { data: responses }, { data: qa }] = await Promise.all([
    supabase.from("surveys").select("id,title").eq("id", params.id).single(),
    supabase.from("survey_responses").select("id, respondent_email, created_at").eq("survey_id", params.id).order("created_at", { ascending: false }),
    supabase.from("survey_answers").select("response_id, question_id, value, survey_questions!inner(id,prompt,kind)").eq("survey_questions.survey_id", params.id),
  ]);

  // Map answers by response
  const byResp: Record<string, any[]> = {};
  (qa ?? []).forEach(row => {
    const r = row.response_id as string;
    if (!byResp[r]) byResp[r] = [];
    byResp[r].push(row);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Results • {survey?.title}</h1>

      <div className="mt-6 space-y-4">
        {(responses ?? []).map(r => (
          <div key={r.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {new Date(r.created_at).toLocaleString()}
                {r.respondent_email ? ` • ${r.respondent_email}` : ""}
              </div>
              {r.respondent_email && (
                <details className="ml-4">
                  <summary className="cursor-pointer text-sm underline">Send a note back</summary>
                  <form action={sendReply} className="mt-2 grid gap-2 sm:grid-cols-6">
                    <input type="hidden" name="survey_id" value={params.id} />
                    <input name="email" defaultValue={r.respondent_email} className="border rounded-lg px-2 py-1 sm:col-span-2" />
                    <input name="subject" placeholder="Subject" className="border rounded-lg px-2 py-1 sm:col-span-2" required />
                    <input name="body" placeholder="Short message" className="border rounded-lg px-2 py-1 sm:col-span-2" />
                    <button className="rounded-lg border px-3 py-1 sm:col-span-6">Send</button>
                  </form>
                </details>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {(byResp[r.id] ?? []).map((a, i) => (
                <div key={i} className="rounded border px-3 py-2">
                  <div className="text-sm font-medium">{a.survey_questions.prompt}</div>
                  <div className="text-sm text-gray-800">
                    {Array.isArray(a.value) ? a.value.join(", ") : (typeof a.value === "object" ? JSON.stringify(a.value) : String(a.value))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {(responses ?? []).length === 0 && <div className="text-sm text-gray-500">No responses yet.</div>}
      </div>
    </div>
  );
}
