export default function BillingPage() {
  // --- dummy data (safe to edit later) ---
  const currentPlan = {
    name: "Intro Plan",
    price: "$49/mo",
    desc: "10 deal slots · Introductory pricing",
    renewsOn: "Sep 15, 2025",
    city: "Atlanta",
  };

  const paymentMethod = {
    brand: "Visa",
    last4: "4242",
    exp: "03 / 27",
    holder: "Jane Merchant",
  };

  const invoices = [
    { id: "INV-1012", date: "Aug 15, 2025", amount: "$49.00", status: "Paid", link: "#" },
    { id: "INV-1008", date: "Jul 15, 2025", amount: "$49.00", status: "Paid", link: "#" },
    { id: "INV-1004", date: "Jun 15, 2025", amount: "$49.00", status: "Paid", link: "#" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Billing</h1>
      <p className="text-gray-600 mt-1">Manage your plan, payment method, and invoices.</p>

      {/* Top cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Current Plan */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Current Plan</h2>
          <div className="mt-3">
            <p className="text-xl font-bold">{currentPlan.price}</p>
            <p className="font-medium">{currentPlan.name}</p>
            <p className="text-gray-600">{currentPlan.desc}</p>
            <div className="mt-3 text-sm text-gray-600">
              <p>City Pricing: <span className="font-medium">{currentPlan.city}</span></p>
              <p>Renews on: <span className="font-medium">{currentPlan.renewsOn}</span></p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">
                Manage Plan
              </button>
              <button className="px-3 py-2 rounded bg-gray-200 text-sm">
                Cancel / Pause
              </button>
            </div>
          </div>
        </div>

        {/* Upgrades */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Upgrades</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Extra Deal Slots (pack of 10)</span>
              <button className="px-3 py-1 rounded bg-gray-200 text-sm">Add</button>
            </li>
            <li className="flex items-center justify-between">
              <span>Boost Visibility (7-day)</span>
              <button className="px-3 py-1 rounded bg-gray-200 text-sm">Add</button>
            </li>
            <li className="flex items-center justify-between">
              <span>City Page Ad Placement</span>
              <button className="px-3 py-1 rounded bg-gray-200 text-sm">Add</button>
            </li>
          </ul>
          <div className="mt-4">
            <button className="w-full px-3 py-2 rounded bg-black text-white text-sm">
              Review Upgrades
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="mt-3 text-sm">
            <p className="font-medium">{paymentMethod.brand} •••• {paymentMethod.last4}</p>
            <p className="text-gray-600">Exp: {paymentMethod.exp}</p>
            <p className="text-gray-600">Cardholder: {paymentMethod.holder}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-3 py-2 rounded bg-gray-200 text-sm">Update Card</button>
            <button className="px-3 py-2 rounded bg-gray-200 text-sm">Remove</button>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Invoices</h2>
          <button className="px-3 py-2 rounded bg-gray-200 text-sm">Download All</button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead className="text-left">
              <tr className="border-b">
                <th className="py-2 pr-6 font-medium">Invoice</th>
                <th className="py-2 pr-6 font-medium">Date</th>
                <th className="py-2 pr-6 font-medium">Amount</th>
                <th className="py-2 pr-6 font-medium">Status</th>
                <th className="py-2 font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b last:border-0">
                  <td className="py-3 pr-6">{inv.id}</td>
                  <td className="py-3 pr-6">{inv.date}</td>
                  <td className="py-3 pr-6">{inv.amount}</td>
                  <td className="py-3 pr-6">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <a href={inv.link} className="text-orange-600 underline">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: This is a demo view. Real receipts will be available once billing is connected.
        </p>
      </div>
    </div>
  );
}
