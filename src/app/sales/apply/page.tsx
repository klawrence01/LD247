import { submitRepApplication } from "@/app/actions/salesActions";

export const metadata = {
  title: "Join the LD247 Sales Team | Local Deals 24/7",
  description:
    "Help local businesses win and get paid for it. High commission, flexible hours, real impact.",
};

export default function SalesApplyPage({
  searchParams,
}: {
  searchParams: { ok?: string };
}) {
  const showThanks = searchParams?.ok === "1";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* HERO */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">
                Help Local Businesses Win.
                <br />
                Get Paid For It.
              </h1>
              <p className="text-sm text-neutral-300 leading-relaxed mt-3 max-w-xl">
                We’re building a street-level team of account executives. You’ll
                work with barbers, restaurants, gyms, salons, and shops in your
                area. You help them get real foot traffic. You get paid.
              </p>
            </div>

            <div className="bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg px-3 py-2 text-[11px] font-semibold leading-snug">
              50% Commission
              <br />
              First 100 Sales
            </div>
          </div>

          <ul className="text-[13px] text-neutral-300 leading-relaxed space-y-2 mt-6">
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>No tech degree required.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>Training provided.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>Flexible hours — you build your own book.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                You earn on every business you activate. We’re not talking “$10
                spiffs.” We’re talking recurring value.
              </span>
            </li>
          </ul>
        </section>

        {/* WHAT YOU'LL DO */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                What You’ll Be Doing
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                Your job is simple: show local businesses how to stop bleeding
                and start keeping their own money.
              </p>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-[11px] text-neutral-400 font-medium text-center leading-snug">
              Street Level
              <br />
              Not Corporate
            </div>
          </div>

          <ul className="text-[13px] text-neutral-300 leading-relaxed space-y-3">
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>Talk to local shops and restaurants in your area.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                Show them their Local Deals 24/7 page and how customers will
                follow them.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                Help them choose their first offer (example: “$10 off oil
                change today only”).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                Get them into the system so customers can start walking in the
                door.
              </span>
            </li>
          </ul>
        </section>

        {/* WHAT YOU GET */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                What You Get
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                We’re not dumping you in the deep end. We’re giving you tools to
                win fast.
              </p>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-[11px] text-neutral-400 font-medium text-center leading-snug">
              You Close,
              <br />
              You Eat
            </div>
          </div>

          <ul className="text-[13px] text-neutral-300 leading-relaxed space-y-3">
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                High commission (not hourly). You’re paid for producing real
                business.
              </span>
            </li>

            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                A clean dashboard to track your leads, appointments,
                businesses, and commission.
              </span>
            </li>

            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                Marketing material done for you — landing page, QR codes, sales
                script.
              </span>
            </li>

            <li className="flex gap-2">
              <span className="text-orange-400 font-bold text-xs mt-[3px]">•</span>
              <span>
                A product that honestly helps small businesses instead of
                bleeding them.
              </span>
            </li>
          </ul>
        </section>

        {/* APPLICATION FORM / THANK YOU */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Apply to Join the Team
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                Tell us how to reach you. A real person will follow up.
              </p>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-[11px] text-neutral-400 font-medium text-right leading-snug">
              Flexible Schedule
              <br />
              Start ASAP
            </div>
          </div>

          {showThanks ? (
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-center">
              <div className="text-white font-semibold text-sm">
                ✅ Got your application.
              </div>
              <div className="text-[13px] text-neutral-400 leading-relaxed mt-2">
                We’ll reach out if you’re a match for an open territory. Keep
                your phone on.
              </div>
            </div>
          ) : (
            <form
              action={submitRepApplication}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
            >
              {/* Full Name */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Full Name
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="Your name"
                  name="full_name"
                  required
                />
              </div>

              {/* City / Territory */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  City / Area You Can Cover
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="Hartford / New Haven / Springfield"
                  name="territory"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Phone
                </label>
                <input
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="(860) 555-1222"
                  name="phone"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                  placeholder="you@example.com"
                  name="email"
                  required
                />
              </div>

              {/* Have you sold before? */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Have you sold marketing / advertising / merchant services
                  before?
                </label>
                <select
                  name="experience_level"
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>A little</option>
                </select>
              </div>

              {/* Comfortable in person? */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  Are you comfortable talking to business owners in person?
                </label>
                <select
                  name="comfort_in_person"
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              {/* Start timing */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-neutral-300 text-[12px] font-medium mb-1">
                  When can you start?
                </label>
                <select
                  name="start_timing"
                  className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/40 text-[13px]"
                >
                  <option>Immediately</option>
                  <option>Next 2 weeks</option>
                  <option>Next 30 days</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 hover:text-orange-300 rounded-lg px-4 py-2 font-semibold text-[13px]"
                >
                  Submit My Application
                </button>

                <p className="text-[11px] text-neutral-500 leading-snug sm:text-right">
                  By submitting you agree that Local Deals 24/7 may contact you
                  about this role.
                </p>
              </div>
            </form>
          )}
        </section>

        <footer className="text-[11px] text-neutral-600 text-center pt-4 pb-10">
          Local Deals 24/7 — Sales Recruitment
        </footer>
      </div>
    </div>
  );
}
