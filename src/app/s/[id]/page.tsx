import { createSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Survey" };

export default async function PublicSurvey({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();

  const { data: survey } = await supabase.from("surveys")
    .select("id, title, business_id, is_active")
    .eq("id", params.id).single();
  if (!survey || !survey.is_active) {
    return <div className="max-w-xl mx-auto px-4 py-16">This survey is not available.</div>;
  }

  const { data: questions } = await supabase.from("survey_questions")
    .select("id, kind, prompt, options, sort_order")
    .eq("survey_id", survey.id)
    .order("sort_order", { ascending: true });

  async function submitResponse(formData: FormData) {
    "use server";
    const supa = createSupabaseServer();
    const survey_id = String(formData.get("survey_id") || "");
    const email = String(formData.get("email") || "").trim();

    // 1) create response
    const { data: resp } = await supa.from("survey_responses")
      .insert({ survey_id, respondent_email: email || null })
      .select("id").single();

    if (resp?.id) {
      // 2) answers
      const payload: any[] = [];
      (questions ?? []).forEach(q => {
        let value: any = null;
        if (q.kind === "multi_choice") {
          const all = formData.getAll(`q_${q.id}`) as string[];
          value = all;
        } else {
          const v = formData.get(`q_${q.id}`);
          if (q.kind === "rating") value = Number(v || 0);
          else value = v ?? "";
        }
        payload.push({ response_id: resp.id, question_id: q.id, value });
      });
      if (payload.length) await supa.from("survey_answers").insert(payload);

      // 3) upsert contact (if email given)
      if (email) {
        // find or create contact for this owner via business
        const { data: biz } = await supa.from("businesses").select("owner_user_id").eq("id", survey.business_id).single();
        if (biz?.owner_user_id) {
          // insert into contacts (owner trigger sets owner_user_id)
          await supa.from("contacts").insert({ email }).select("id").single().catch(()=>null);
        }
      }
    }

    revalidatePath(`/s/${survey_id}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{survey.title}</h1>
      <form action={submitResponse} className="mt-6 space-y-5">
        <input type="hidden" name="survey_id" value={survey.id} />

        <div>
          <label className="text-sm font-medium">Your email (optional)</label>
          <input name="email" type="email" placeholder="you@example.com" className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>

        {(questions ?? []).map(q => (
          <div key={q.id} className="rounded-lg border p-4">
            <div className="font-medium">{q.prompt}</div>
            <div className="mt-2">
              {q.kind === "short_text" && <input name={`q_${q.id}`} className="w-full border rounded-lg px-3 py-2" />}
              {q.kind === "long_text" && <textarea name={`q_${q.id}`} className="w-full min-h-[120px] border rounded-lg px-3 py-2" />}
              {q.kind === "rating" && (
                <select name={`q_${q.id}`} className="border rounded-lg px-3 py-2">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              )}
              {q.kind === "single_choice" && (
                <div className="space-y-1">
                  {(q.options as string[] ?? []).map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input type="radio" name={`q_${q.id}`} value={opt} /> <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.kind === "multi_choice" && (
                <div className="space-y-1">
                  {(q.options as string[] ?? []).map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input type="checkbox" name={`q_${q.id}`} value={opt} /> <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <button className="rounded-lg bg-black text-white px-4 py-2">Submit</button>
      </form>

      <p className="mt-6 text-sm text-gray-600">Thanks for your feedback!</p>
    </div>
  );
}
