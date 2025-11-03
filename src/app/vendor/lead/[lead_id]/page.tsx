// src/app/vendor/lead/[lead_id]/page.tsx

import { createSupabaseServer } from "@/utils/supabase/server";
import ActivateBlock from "./activate-block";

export const metadata = {
  title: "Your Local Deals 24/7 Preview",
  description:
    "See your new Local Deals 24/7 page and start your 30-day promotional period.",
};

async function getLeadData(lead_id: string) {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("vendor_leads")
    .select(
      "id, business_name, owner_name, city, state, region_tag, email, phone, status, created_at"
    )
    .eq("id", lead_id)
    .single();

  if (error) {
    console.error("Error loading lead:", error.message);
    return null;
  }

  return data;
}

export default async function VendorLeadPage({
  params,
}: {
  params: { lead_id: string };
}) {
  const lead = await getLeadData(params.lead_id);

  if (!lead) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-xl font-semibold text-gray-900">
          We couldn’t find this business.
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Please ask your Local Deals 24/7 rep to resend your link.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-8">
      {/* HEADER */}
      <section className="text-center space-y-2">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
          Local Deals 24/7
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {lead.business_name || "Your Business"} is now in the system
        </h1>

        <p className="text-sm text-gray-600">
          {lead.city}, {lead.state} • {lead.region_tag}
        </p>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="rounded-2xl border border-orange-500 bg-orange-50 p-4 space-y-3">
        <div className="text-base font-semibold text-gray-900">
          We help small businesses increase their business by 30 to 90%.
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          Some of our merchants tell us their slowest days became their busiest
          — and they didn’t spend thousands of dollars on ads.
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          You’re now in our 30-day promotional period. We’ll start showing you
          to local customers in {lead.region_tag}, and you’ll be able to post
          deals that drive traffic on the days you choose.
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-4">
        <div className="text-sm font-semibold text-gray-900">
          Here’s what happens next:
        </div>

        <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside">
          <li>
            <span className="font-medium text-gray-900">Customize your page.</span>{" "}
            Add your logo, hours, and a short “why choose us.”
          </li>
          <li>
            <span className="font-medium text-gray-900">Choose your first deal.</span>{" "}
            We give you proven deal templates so you can get attention fast.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              Watch traffic increase.
            </span>{" "}
            We’ll show you views, redemptions, and new repeat customers.
          </li>
        </ol>

        <div className="text-[11px] text-gray-500 leading-snug">
          You’ll also get a short summary at the end of your 30 days so you can
          see what changed.
        </div>
      </section>

      {/* CTA + ACTIVATE SECTION */}
      <ActivateBlock leadId={lead.id} />

      {/* TRUST / CONTACT REP */}
      <section className="text-center text-[11px] text-gray-500 leading-relaxed">
        Have questions? Your Local Deals 24/7 rep will reach out and can set up
        your first deal for you.
      </section>
    </div>
  );
}
