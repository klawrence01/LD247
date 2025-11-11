// src/app/sales/landing/[slug]/page.tsx

// this is the public landing a business owner sees
// when they scan a salesperson's QR

// NOTE: uses Supabase REST so it works in a server component
// make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set

async function getSalesTarget(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sales_qr_targets?slug=eq.${slug}&select=*`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    // cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.[0] ?? null;
}

export default async function SalesLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const target = await getSalesTarget(params.slug);

  if (!target) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white px-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center space-y-3">
          <h1 className="text-xl font-semibold">LocalDeals247</h1>
          <p className="text-sm text-white/50">
            This sales link isn&apos;t active. Please contact your LD247 rep.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full space-y-5">
        <div>
          <p className="text-[10px] text-orange-200 uppercase tracking-[0.35em] mb-3">
            LocalDeals247
          </p>
          <h1 className="text-2xl font-bold mb-2">
            {target.rep_name
              ? `You were visited by ${target.rep_name}`
              : "LocalDeals247 Sales"}
          </h1>
          <p className="text-sm text-white/60">
            We help local businesses get seen, followed, and visited with
            cooperative marketing.
          </p>
        </div>

        <div className="space-y-2 text-sm text-white/60">
          <p className="font-medium text-white">What you can do here:</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-white/45">
            <li>Book a virtual or in-person call</li>
            <li>Ask your rep a question</li>
            <li>Keep this link for your records</li>
          </ul>
        </div>

        <div className="space-y-2">
          {/* swap this to your real booking page */}
          <a
            href="https://calendly.com/"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-center text-white text-sm py-2 rounded-lg transition"
          >
            Book an appointment
          </a>

          {target.rep_email ? (
            <a
              href={`mailto:${target.rep_email}?subject=LocalDeals247 follow up`}
              className="block w-full bg-white/5 hover:bg-white/10 text-center text-white/80 text-sm py-2 rounded-lg transition"
            >
              Email {target.rep_name || "your rep"}
            </a>
          ) : null}
        </div>

        <p className="text-[10px] text-white/20">
          Link: /sales/landing/{params.slug}
        </p>
      </div>
    </div>
  );
}
