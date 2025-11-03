import { createSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = { title: "Surveys" };

async function createSurvey(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const title = String(formData.get("title") || "").trim();
  const slug  = String(formData.get("business_slug") || "").trim();
  if (!title || !slug) return;

  const { data: biz } = await supabase.from("businesses").select("id").eq("slug", slug).single();
  if (!biz) return;
  await supabase.from("surveys").insert({ business_id: biz.id, title, is_active: true });
  revalidatePath("/dashboard/merchant/surveys");
}

async function addQuestion(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const survey_id = String(formData.get("survey_id") || "");
  const kind = String(formData.get("kind") || "short_text");
  const prompt = String(formData.get("prompt") || "").trim();
  const options = String(formData.get("options") || "").trim();
  const opts = options ? options.split("|").map(s => s.trim()).filter(Boolean) : [];
  if (!survey_id || !prompt) return;
  await supabase.from("survey_questions").insert({ survey_id, kind, prompt, options: opts, sort_order: Date.now() % 1000000 });
  revalidatePath("/dashboard/merchant/surveys");
}

export default async function SurveysPage() {
  const supabase = createSupabaseServer();
  const [{ data: businesses }, { data: surveys }] = await Promise.all([
    supabase.from("businesses").select("slug,name").order("created_at", { ascending: true }),
    supabase.from("surveys").select("id,title,is_active,created_at,business_id,businesses!inner(slug,name)").order("created_at", { ascending: false }),
  ]);

  const defaultSlug = businesses?.[0]?.slug ?? "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Surveys</h1>
        <Link href="/dashboard/merchant/messaging" className="text-sm underline">Back to Messaging</Link>
      </div>

      {/* Create survey */}
      <form action={createSurvey} className="mt-6 grid gap-3 rounded-xl border p-4 sm:grid-cols-3">
        <input name="title" placeholder="Survey title (e.g. 'Customer Feedback')" className="border rounded-lg px-3 py-2 sm:col-span-2" required />
        <input name="business_slug" placeholder="business slug" defaultValue={defaultSlug} className="border rounded-lg px-3 py-2" required />
        <button className="rounded-lg bg-black text-white px-4 py-2 sm:col-span-3">Create Survey</button>
      </form>

      {/* Surveys list */}
      <div className="mt-8 space-y-4">
        {(surveys ?? []).map(s => (
          <div key={s.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-xs text-gray-500">{s.businesses?.name} • <code>/s/{s.id}</code></div>
              </div>
              <div className="flex gap-2">
                <Link href={`/s/${s.id}`} className="rounded-lg border px-3 py-1 text-sm" target="_blank">Open</Link>
                <Link href={`/dashboard/merchant/surveys/${s.id}/results`} className="rounded-lg border px-3 py-1 text-sm">Results</Link>
              </div>
            </div>

            {/* Add question */}
            <form action={addQuestion} className="mt-4 grid gap-3 sm:grid-cols-6">
              <input type="hidden" name="survey_id" value={s.id} />
              <select name="kind" className="border rounded-lg px-3 py-2">
                <option value="short_text">Short text</option>
                <option value="long_text">Long text</option>
                <option value="rating">Rating (1–5)</option>
                <option value="single_choice">Single choice</option>
                <option value="multi_choice">Multi choice</option>
              </select>
              <input name="prompt" placeholder="Question prompt" className="border rounded-lg px-3 py-2 sm:col-span-3" required />
              <input name="options" placeholder="Choices (A|B|C) for choice kinds" className="border rounded-lg px-3 py-2 sm:col-span-2" />
              <button className="rounded-lg border px-3 py-2 sm:col-span-6">Add Question</button>
            </form>
          </div>
        ))}
        {(surveys ?? []).length === 0 && <div className="text-sm text-gray-500">No surveys yet.</div>}
      </div>
    </div>
  );
}
