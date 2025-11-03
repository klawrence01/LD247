import { submitRepLead } from "@/app/actions/salesActions";

export const metadata = {
  title: "Local Deals 24/7 | Talk to Your Local Rep",
  description:
    "Get more foot traffic without giving away half your money. Book a free setup call today.",
};

export default function RepLandingPage({
  params,
  searchParams,
}: {
  params: { repSlug: string };
  searchParams: { ok?: string };
}) {
  const rep = {
    slug: params.repSlug,
    name: "Jordan Miles",
    territory: "Hartford & New Haven",
    phone: "(860) 555-1222",
    pitch:
      "I help local businesses get more paying customers in the door — without splitting profits with Groupon.",
    headshotUrl: "/images/rep-headshot-placeholder.jpg",
    videoThumbUrl: "/images/video-thumb-placeholder.jpg",
    videoLabel: "How Local Deals 24/7 Works (0:32)",
  };

  const testimonials = [
    {
      quote:
        "We ran a Tuesday pizza special and sold out by 5pm. Zero revenue split. I’ll do this every week.",
      business: "Tony's Pizza",
      city: "New Haven, CT",
    },
    {
      quote:
        "I like that I can cap how many I’ll honor. I’m not giving away 200 haircuts in a weekend.",
      business: "Hartford Barbers",
      city: "Hartford, CT",
    },
  ];

  const valuePoints = [
    "You get your own page customers can follow.",
    "You control your daily deals, not us.",
    "You keep 100% of the money — we don't take a cut.",
    "You can limit inventory so you never overpromise.",
    "You can post ‘Sold Out – Tap to Get Alerted When It’s Back.’",
    "You can schedule different deals for different days.",
    "You can message / notify customers directly (simple newsletter).",
    "You show up in the local city search and daily calendar.",
    "You get analytics: views, redemptions, requests to bring the deal back.",
    "Our system is gamified so customers WANT to return to you.",
    "This costs less than generic ads and actually brings people in the door.",
    "We give you a QR code so customers can follow you instantly in person.",
  ];

  const showThanks = searchParams?.ok === "1";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* TOP SECTION / REP INTRO */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500">
                photo
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-white leading-tight">
                {rep.name}
              </h1>
              <p className="text-sm text-neutral-300">
                Serving {rep.territory}
              </p>
              <p className="text-[13px] text-neutral-400 leading-snug max-w-md">
                {rep.pitch}
              </p>

              <div className="flex flex-wrap gap-2 pt-3 text-sm">
                <a
                  href="#lead-form"
                  className="bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 hover:text-orange-300 rounded-lg px-3 py-2 font-medium text-[13px]"
                >
                  Book My Free Setup Call
                </a>
                <a
                  href={`tel:${rep.phone.replace(/[^0-9]/g, "")}`}
                  className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 font-medium text-[13px] text-neutral-200"
                >
                  Text / Call Me
                </a>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-center md:text-right text-[12px] leading-snug">
            <div className="font-semibold text-white text-sm">
              Local Deals 24/7
            </div>
            <div className="text-neutral-400">
              We help small businesses win,
              <br />
              not bleed out.
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-video rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center">
              <div className="text-neutral-500 text-xs text-center leading-snug">
                [ Video Placeholder ]
                <br />
                {rep.videoLabel}
              </div>
              <div className="absolute bottom-3 right-3 bg-neutral-900/80 border border-neutral-700 rounded-lg px-2 py-1 text-[11px] text-neutral-200 font-medium">
                ▶ Play
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">
                Watch this first (0:32)
              </p>
              <p className="text-[13px] text-neutral-300 leading-relaxed">
                I’ll show you how we put you in front of paying customers
                without forcing you to give away half the money like Groupon
                does.
              </p>
            </div>

            <ul className="text-[13px] text-neutral-300 leading-relaxed space-y-2 pt-4">
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
                <span>We build your page inside Local Deals 24/7.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
                <span>Your deal shows up in the city search and daily calendar.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
                <span>Customers follow you, save the coupon, and walk in your door.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
                <span>You keep 100% of the sale.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                What Local Owners Are Saying
              </h2>
              <p className="text-sm text-neutral-400">
                Real businesses. Real money. Real traffic.
              </p>
            </div>
            <div className="text-[11px] bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-1 text-neutral-400 font-medium">
              You keep 100% of every sale
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 flex flex-col justify-between"
              >
                <p className="text-[13px] text-neutral-200 leading-relaxed font-medium">
                  “{t.quote}”
                </p>
                <div className="text-[12px] text-neutral-400 leading-snug pt-3">
                  <div className="text-white font-semibold">{t.business}</div>
                  <div className="text-neutral-400">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                What You Get With Local Deals 24/7
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                This is not coupons-for-traffic. This is customer retention.
                This is repeat business.
              </p>
            </div>

            <div className="text-[11px] bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg px-2 py-1 font-medium">
              No revenue split
            </div>
          </div>

          <ul className="text-[13px] text-neutral-300 leading-relaxed space-y-3">
            {[
              "You get your own page customers can follow.",
              "You control your daily deals, not us.",
              "You keep 100% of the money — we don't take a cut.",
              "You can limit inventory so you never overpromise.",
              "You can post ‘Sold Out – Tap to Get Alerted When It’s Back.’",
              "You can schedule different deals for different days.",
              "You can message / notify customers directly (simple newsletter).",
              "You show up in the local city search and daily calendar.",
              "You get analytics: views, redemptions, requests to bring the deal back.",
              "Our system is gamified so customers WANT to return to you.",
              "This costs less than generic ads and actually brings people in the door.",
              "We give you a QR code so customers can follow you instantly in person.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-orange-400 font-bold text-xs mt-[3px]">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* LEAD FORM / THANK YOU */}
        <section
          id="lead-form"
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Ready To Get Listed?
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                No cost today. We’ll walk you through your setup and your first
                deal.
              </p>
            </div>

            <div className="text-[11px] bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-1 text-neutral-400 font-medium text-right leading-snug">
              Talk directly with {rep.name}
              <br />
              {rep.phone}
            </div>
          </div>

          {showThanks ? (
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-center">
              <div className="text-white font-semibold text-sm">
                ✅ Got it — thank you.
              </div>
              <div className="text-[13px] text-neutral-400 leading-relaxed mt-2">
                We’ll reach out to set up your page and help you pick your first
                deal.
              </div>
            </div>
          ) : (
            <form
              action={submitRepLead}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
            >
              <input type="hidden" name="rep_slug" value={rep.slug} />

              <div className="flex flex-col">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Business Name
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="Tony's Pizza"
                  name="business_name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Best Phone Number
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="(203) 555-1122"
                  name="contact_phone"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Best Time To Talk
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="Today after 2pm, or tomorrow morning"
                  name="best_time"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 hover:text-orange-300 rounded-lg px-4 py-2 font-semibold text-[13px]"
                >
                  Send My Info
                </button>

                <p className="text-[11px] text-neutral-500 leading-snug sm:text-right">
                  By tapping Send My Info you agree that Local Deals 24/7 (and{" "}
                  {rep.name}) can contact you about setup. No obligation.
                </p>
              </div>
            </form>
          )}
        </section>

        <footer className="text-[11px] text-neutral-600 text-center pt-4 pb-10">
          Local Deals 24/7 — Vendor Enrollment
        </footer>
      </div>
    </div>
  );
}
