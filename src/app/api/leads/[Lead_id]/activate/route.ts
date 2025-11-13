// src/app/api/leads/[Lead_id]/activate/route.ts

export async function POST(req: Request, ...ctx: any[]) {
  // Next will pass the context as the second arg
  const context = ctx[0] ?? {};
  const leadId =
    context?.params?.Lead_id ??
    context?.params?.lead_id ??
    (typeof context?.params === "string" ? context.params : null);

  if (!leadId) {
    return new Response(JSON.stringify({ error: "lead_id missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // TODO: put your real activate logic here
  // e.g. update DB: activate leadId

  return new Response(JSON.stringify({ ok: true, leadId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
