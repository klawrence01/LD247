"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsPage() {
  // --- SAMPLE DATA ---
  const topStats = {
    views: 2304,
    downloads: 348,
    followers: 128,
    engagement: 15, // %
    trendViews: "+8%",
    trendDownloads: "+5%",
    trendFollowers: "+12%",
    trendEngagement: "+3%",
  };

  const dealPerformance = [
    { name: "Spa Package", views: 820, downloads: 160 },
    { name: "Coffee Special", views: 460, downloads: 90 },
    { name: "Free Consultation", views: 310, downloads: 42 },
  ];

  const trafficSources = [
    { name: "Coupon List", value: 80 },
    { name: "City Page", value: 15 },
    { name: "Referrals", value: 5 },
  ];

  const COLORS = ["#f97316", "#16a34a", "#3b82f6"];

  // Calculate engagement rate for each deal for chart use
  const dealBars = dealPerformance.map((deal) => ({
    name: deal.name,
    Engagement: Math.round((deal.downloads / deal.views) * 100),
  }));

  return (
    <main className="p-6 text-gray-900">
      {/* HEADER */}
      <h1 className="text-2xl font-extrabold mb-1">Analytics Dashboard</h1>
      <p className="text-sm text-gray-600 mb-8">
        See how many locals viewed, saved, and followed your business this week.
      </p>

      {/* TOP STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {/* Views */}
        <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase">
            Views
          </div>
          <div className="text-3xl font-bold mt-1">
            {topStats.views.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">
            {topStats.trendViews} this week
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase">
            Downloads
          </div>
          <div className="text-3xl font-bold mt-1">
            {topStats.downloads.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">
            {topStats.trendDownloads} this week
          </div>
        </div>

        {/* Followers */}
        <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase">
            Followers
          </div>
          <div className="text-3xl font-bold mt-1">{topStats.followers}</div>
          <div className="text-sm text-green-600">
            {topStats.trendFollowers} this week
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase">
            Engagement
          </div>
          <div className="text-3xl font-bold mt-1">
            {topStats.engagement}%
          </div>
          <div className="text-sm text-green-600">
            {topStats.trendEngagement} this week
          </div>
        </div>
      </section>

      {/* DEAL PERFORMANCE BAR CHART */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-5 mb-10">
        <h2 className="text-lg font-bold mb-3">Deal Performance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dealBars} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tick={{ fontSize: 13 }}
              tickLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="Engagement"
              fill="#f97316"
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          Highest engagement this week:{" "}
          <span className="font-semibold">Spa Package</span>.
        </p>
      </section>

      {/* TRAFFIC SOURCES PIE CHART */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-5 mb-10">
        <h2 className="text-lg font-bold mb-3">Where Traffic Came From</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={trafficSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {trafficSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Most visitors found you via the{" "}
          <span className="font-semibold">Coupon List</span>.
        </p>
      </section>

      {/* INSIGHTS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-black mb-2">What’s Working</h3>
          <ul className="text-sm list-disc pl-4 text-gray-700 space-y-1">
            <li>Short deal titles attract more downloads.</li>
            <li>Food & beverage offers perform best citywide.</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-black mb-2">Needs Attention</h3>
          <ul className="text-sm list-disc pl-4 text-gray-700 space-y-1">
            <li>Long descriptions reduce engagement.</li>
            <li>Old deals lower your visibility score.</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-black mb-2">Next Steps</h3>
          <ul className="text-sm list-disc pl-4 text-gray-700 space-y-1">
            <li>Post a new weekend offer.</li>
            <li>Ask your followers for quick feedback.</li>
          </ul>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <footer className="text-center text-[13px] text-gray-500 leading-snug border-t border-gray-200 pt-4">
        LD247 measures interest — not in-store sales. When locals save your
        offer, that’s measurable proof your marketing worked.
      </footer>
    </main>
  );
}
