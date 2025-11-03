"use client";

const COMMISSIONS = [
  {
    month: "November 2025",
    vendors: 3,
    total: 187.5,
    status: "Pending",
  },
  {
    month: "October 2025",
    vendors: 5,
    total: 325.0,
    status: "Paid",
  },
  {
    month: "September 2025",
    vendors: 4,
    total: 250.0,
    status: "Paid",
  },
];

export default function SalesCommissionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-900">
      <h1 className="text-2xl font-bold mb-2">My Commissions</h1>
      <p className="text-sm text-gray-500 mb-6">
        Track what you’ve earned from the vendors you onboarded. This is a
        simple view — we can tie it to billing later.
      </p>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Vendors</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {COMMISSIONS.map((row) => (
              <tr key={row.month} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {row.month}
                </td>
                <td className="px-4 py-3">{row.vendors}</td>
                <td className="px-4 py-3 font-semibold">
                  ${row.total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        *Commission amounts here are sample values. Replace with your actual
        payout calculation from the database.
      </p>
    </main>
  );
}
