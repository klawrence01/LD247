"use client";

import { useEffect, useState } from "react";

type PageProps = {
  params: {
    id: string; // survey response / reward session id
  };
};

// NOTE:
// Eventually we'll fetch from Supabase using params.id:
// - business name + logo
// - reward text
// - expiration window
// - code to show cashier
//
// Right now we're using placeholder data so you can SEE the flow live.

export default function SurveyThanksPage({ params }: PageProps) {
  // Placeholder business info
  const businessName = "Tony's Pizza";
  const businessLogoText = "TP"; // temporary box initials
  const city = "Hartford, CT";

  // Placeholder reward info
  const rewardText = "10% OFF your next order TODAY";
  const finePrint =
    "Show this screen at the counter before you pay. One per customer. Good for today only.";
  const thanksMessage = "Thank you for supporting a local business.";
  const code = "TP-3914"; // short code cashier can record

  // Expiration countdown (in minutes). We're simulating "expires soon".
  const [minutesLeft, setMinutesLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesLeft((m) => {
        if (m <= 1) return 1; // don't go to 0 visually; we'll handle that later
        return m - 1;
      });
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          {/* Business header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Logo placeholder */}
            <div className="h-12 w-12 rounded-xl bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
              {businessLogoText}
            </div>

            <div className="flex-1">
              <div className="text-base font-semibold text-gray-900 leading-tight">
                {businessName}
              </div>
              <div className="text-[12px] text-gray-500 leading-tight">
                {city}
              </div>

              <div className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#ff7a00] px-2 py-1 text-[11px] font-semibold text-white shadow">
                <span>Reward Unlocked</span>
              </div>
            </div>
          </div>

          {/* Reward block */}
          <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 mb-4">
            <div className="text-[13px] font-bold text-gray-900 leading-snug mb-1 text-center">
              {rewardText}
            </div>

            <div className="text-[12px] text-gray-700 leading-snug text-center">
              {finePrint}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center text-center">
              <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
                Show this code to the cashier:
              </div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-wider">
                {code}
              </div>

              <div className="mt-3 text-[11px] text-gray-500 leading-tight">
                Expires in{" "}
                <span className="font-semibold text-gray-800">
                  {minutesLeft} min
                </span>
              </div>
            </div>
          </div>

          {/* Thank you / Follow confirmation */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-4">
            <div className="text-[13px] font-semibold text-gray-900 leading-snug mb-1 text-center">
              {thanksMessage}
            </div>
            <div className="text-[12px] text-gray-600 leading-snug text-center">
              You’re now following {businessName} on Local Deals 24/7.
              Whenever they post a new deal, you’ll see it.
            </div>
          </div>

          {/* "Stay in the loop" section */}
          <div className="text-[12px] text-gray-600 leading-relaxed text-center">
            <p className="mb-2 font-semibold text-gray-800">
              Watch for new specials:
            </p>
            <p>
              {businessName} can now send you “today only” offers, early
              discounts, and limited slots. Check back anytime to grab them
              first.
            </p>
          </div>
        </div>

        {/* Footer / brand mark */}
        <div className="text-center mt-6 text-[11px] text-gray-500 leading-snug">
          <div className="font-semibold text-gray-800">
            Local Deals 24/7
          </div>
          <div>Support local. Save money. Come back again.</div>
        </div>
      </div>
    </div>
  );
}
