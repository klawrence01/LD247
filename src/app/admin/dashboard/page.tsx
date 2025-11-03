// app/admin/dashboard/page.tsx

// NOTE: This version is UI-only placeholders.
// Later we'll swap the hardcoded numbers with real Supabase pulls.

export default async function AdminDashboardPage() {
  // ---- placeholder data (will come from Supabase) ----
  const kpis = {
    newVendorLeadsToday: 5,
    vendorsActive: 42,
    upcomingAppointments: 6,
    estMonthlyRevenue: "$3,948",
  };

  const territoryHeat = [
    {
      city: "Hartford, CT",
      activeVendors: 12,
      newLeads: 3,
      topDeal: "2-for-1 Lunch Combo",
      action: "Feature Deal",
    },
    {
      city: "New Haven, CT",
      activeVendors: 9,
      newLeads: 1,
      topDeal: "Half-Price Cut (Today Only)",
      action: "Feature Deal",
    },
    {
      city: "Springfield, MA",
      activeVendors: 5,
      newLeads: 0,
      topDeal: "Free Smoothie w/ Wrap",
      action: "Feature Deal",
    },
  ];

  const repPerformance = [
    {
      name: "Jordan Miles",
      territory: "Hartford / New Haven",
      leads: 4,
      appts: 2,
      active: 7,
    },
    {
      name: "Kayla R",
      territory: "Springfield",
      leads: 1,
      appts: 1,
      active: 3,
    },
  ];

  const pendingApprovals = [
    {
      bizName: "Hartford Barbers",
      city: "Hartford, CT",
      firstDeal: "Fresh cut + hot towel $15 (today only)",
      status: "waiting",
    },
    {
      bizName: "Tony's Pizza",
      city: "New Haven, CT",
      firstDeal: "Large 1-topping $9.99 (after 2pm)",
      status: "waiting",
    },
  ];

  const fieldIntel = [
    {
      rep: "Kayla R",
      body: "Owner at Hartford Barbers says Groupon is taking 50%. Says he's ready to switch if we feature him Friday.",
      ts: "Today 2:14 PM",
    },
    {
      rep: "Jordan Miles",
      body: "New pizza shop opening on Whitney Ave. Wants us at launch. Wants 'grand opening buy 1 get 1 slices' for first week.",
      ts: "Today 11:02 AM",
    },
  ];

  // -----------------------------------------------------

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen p-6">
      {/* Page header + tabs */}
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Admin Command Center
          </h1>
          <p className="text-sm text-neutral-400">
            Your markets. Your reps. Your vendors. All in one view.
          </p>

          {/* top nav pills */}
          <div className="flex flex-wrap gap-2 mt-4 text-sm">
            {[
              "Overview",
              "Vendor Approvals",
              "Lead Routing",
              "Reps & Territories",
              "City Pages",
              "Pricing",
              "Broadcast",
            ].map((tab, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-lg border text-[13px] font-medium ${
                  i === 0
                    ? "bg-neutral-800 border-neutral-700 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* KPI cards row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* New Vendor Leads Today */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="text-white text-3xl font-semibold">
                {kpis.newVendorLeadsToday}
              </div>
              <span className="text-[10px] font-semibold px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                new
              </span>
            </div>
            <div className="mt-2">
              <div className="text-[13px] font-medium text-neutral-200">
                New Vendor Leads Today
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                Waiting for contact or assignment
              </div>
            </div>
          </div>

          {/* Vendors Active */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="text-white text-3xl font-semibold">
                {kpis.vendorsActive}
              </div>
              <span className="text-[10px] font-semibold px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                live
              </span>
            </div>
            <div className="mt-2">
              <div className="text-[13px] font-medium text-neutral-200">
                Vendors Active
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                Currently live / onboarding
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="text-white text-3xl font-semibold">
                {kpis.upcomingAppointments}
              </div>
              <span className="text-[10px] font-semibold px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                live
              </span>
            </div>
            <div className="mt-2">
              <div className="text-[13px] font-medium text-neutral-200">
                Upcoming Appointments
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                Calls / walk-ins today and tomorrow
              </div>
            </div>
          </div>

          {/* Est. Monthly Revenue */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="text-white text-3xl font-semibold">
                {kpis.estMonthlyRevenue}
              </div>
              <span className="text-[10px] font-semibold px-2 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                this month
              </span>
            </div>
            <div className="mt-2">
              <div className="text-[13px] font-medium text-neutral-200">
                Est. Monthly Revenue
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                Based on active plans
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE GRID: Territory Heat + Rep Performance */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Territory Heat (2/3 width) */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 xl:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Territory Heat
                </h2>
                <p className="text-sm text-neutral-400">
                  Which cities are producing. Who needs love.
                </p>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-orange-400 hover:text-orange-300"
              >
                Manage city pages
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                  <tr>
                    <th className="py-2 pr-4 font-medium">City</th>
                    <th className="py-2 pr-4 font-medium">Active Vendors</th>
                    <th className="py-2 pr-4 font-medium">New Leads</th>
                    <th className="py-2 pr-4 font-medium">Top Deal</th>
                    <th className="py-2 pr-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {territoryHeat.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-neutral-800 last:border-none"
                    >
                      <td className="py-3 pr-4 text-white font-medium">
                        {row.city}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {row.activeVendors}
                      </td>
                      <td className="py-3 pr-4 text-neutral-300">
                        {row.newLeads}
                      </td>
                      <td className="py-3 pr-4 text-neutral-200">
                        {row.topDeal}
                      </td>
                      <td className="py-3 pr-4">
                        <button className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-1 text-neutral-200">
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rep Performance (1/3 width) */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Rep Performance
                </h2>
                <p className="text-sm text-neutral-400">
                  Who’s producing right now.
                </p>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-orange-400 hover:text-orange-300"
              >
                Manage reps
              </a>
            </div>

            <div className="space-y-4">
              {repPerformance.map((rep, i) => (
                <div
                  key={i}
                  className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white font-semibold text-[14px] leading-tight">
                        {rep.name}
                      </div>
                      <div className="text-[12px] text-neutral-400 leading-snug">
                        {rep.territory}
                      </div>
                    </div>

                    <button className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-2 py-1 text-neutral-200">
                      View
                    </button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-center">
                      <div className="text-white font-semibold text-sm leading-none">
                        {rep.leads}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-tight">
                        Leads
                      </div>
                    </div>
                    <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-center">
                      <div className="text-white font-semibold text-sm leading-none">
                        {rep.appts}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-tight">
                        Appts
                      </div>
                    </div>
                    <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-center">
                      <div className="text-white font-semibold text-sm leading-none">
                        {rep.active}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-tight">
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM GRID: Pending Vendor Approvals + Field Intel */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-16">
          {/* Pending Vendor Approvals */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Pending Vendor Approvals
                </h2>
                <p className="text-sm text-neutral-400">
                  New vendors waiting for review.
                </p>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-orange-400 hover:text-orange-300"
              >
                Review all
              </a>
            </div>

            {pendingApprovals.length === 0 ? (
              <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
                Nothing waiting. Your pipeline is clear.
              </div>
            ) : (
              <ul className="space-y-4 text-sm">
                {pendingApprovals.map((item, i) => (
                  <li
                    key={i}
                    className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white font-semibold text-[14px] leading-tight">
                          {item.bizName}
                        </div>
                        <div className="text-[12px] text-neutral-400 leading-snug">
                          {item.city}
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {item.status}
                      </span>
                    </div>

                    <div className="text-[12px] text-neutral-300 leading-snug mt-3">
                      <span className="text-neutral-400">First Deal: </span>
                      {item.firstDeal}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-[12px] font-medium text-neutral-100">
                        Approve
                      </button>
                      <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-[12px] font-medium text-neutral-100">
                        Send Back
                      </button>
                      <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-[12px] font-medium text-neutral-100">
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Field Intel From Reps */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Field Intel From Reps
                </h2>
                <p className="text-sm text-neutral-400">
                  What’s happening at street level.
                </p>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-orange-400 hover:text-orange-300"
              >
                View all
              </a>
            </div>

            {fieldIntel.length === 0 ? (
              <div className="text-[13px] text-neutral-500 bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 text-center">
                No recent notes from reps.
              </div>
            ) : (
              <ul className="space-y-4 text-sm">
                {fieldIntel.map((intel, i) => (
                  <li
                    key={i}
                    className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[13px] font-semibold text-white leading-snug">
                          {intel.rep}
                        </div>
                        <div className="text-[11px] text-neutral-500 leading-snug">
                          {intel.ts}
                        </div>
                      </div>
                      <button className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-2 py-1 text-neutral-200">
                        Message
                      </button>
                    </div>

                    <p className="text-[12px] text-neutral-300 leading-snug mt-3">
                      {intel.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
