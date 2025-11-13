// src/app/api/leads/[Lead_id]/plan/route.ts

export async function POST(req: Request, ...ctx: any[]) {
  const context = ctx[0] ?? {};

  // handle both Lead_id and lead_id just in case
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

  // TODO: your real "plan" logic here
  // e.g. look up lead and return available plans

  return new Response(JSON.stringify({ ok: true, leadId, action: "plan" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
