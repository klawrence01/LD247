'use client';

export default function BillingPage() {
  const mockVendors = [
    {
      id: 1,
      name: "Tony's Pizza",
      plan: "$49/month",
      status: "Active",
      created_at: "2024-06-15",
    },
    {
      id: 2,
      name: "Linda's Hair Salon",
      plan: "Free Trial",
      status: "Trial",
      created_at: "2024-07-01",
    },
    {
      id: 3,
      name: "Ace Gym",
      plan: "$79/month",
      status: "Past Due",
      created_at: "2024-05-20",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Billing Overview</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left">Vendor</th>
            <th className="p-2 text-left">Plan</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {mockVendors.map((vendor) => (
            <tr key={vendor.id} className="border-t">
              <td className="p-2">{vendor.name}</td>
              <td className="p-2">{vendor.plan}</td>
              <td className="p-2">{vendor.status}</td>
              <td className="p-2">{new Date(vendor.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
