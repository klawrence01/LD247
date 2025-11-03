// src/app/dashboard/merchant/page.tsx
export const dynamic = "force-dynamic";

export default function MerchantDashboardPage() {
  return (
    <div className="rounded-xl bg-white border p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Basic Info</h1>

      {/* BUSINESS NAME */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
        <input
          type="text"
          defaultValue="Business Name"
          className="w-full rounded-lg border px-3 py-2 shadow-sm"
          readOnly
        />
      </div>

      {/* RATING ROW */}
      <div className="mb-5 flex items-center gap-2">
        <div className="text-orange-500 text-lg">★★★★★</div>
        <div className="text-gray-700">4.5 <span className="text-gray-500">(210 reviews)</span></div>
      </div>

      {/* ADDRESS + UPLOAD + PHONE */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-[150px,1fr] gap-4">
        {/* Thumbnail image placeholder (business image) */}
        <div className="rounded-lg border overflow-hidden aspect-[4/3] bg-gray-100"></div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <a href="#" className="text-sm text-blue-600 underline">Upload Business Image</a>
          </div>
          <input
            type="text"
            defaultValue="123 Main St; Anytown, USA"
            className="w-full rounded-lg border px-3 py-2 shadow-sm"
            readOnly
          />
          <input
            type="text"
            defaultValue="(123) 456-7890"
            className="w-full rounded-lg border px-3 py-2 shadow-sm"
            readOnly
          />
        </div>
      </div>

      {/* BUSINESS DETAILS */}
      <h2 className="text-xl font-semibold mb-2">Business Details</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <textarea
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className="w-full rounded-lg border px-3 py-2 shadow-sm h-28"
          readOnly
        />
      </div>

      {/* HOURS OF OPERATION */}
      <h2 className="text-xl font-semibold mb-2">Hours of Operation</h2>
      <div className="rounded-xl border overflow-hidden">
        {[
          ["Monday", "8:00 AM — 6:00 PM"],
          ["Tuesday", "8:00 AM — 6:00 PM"],
          ["Wednesday", "8:00 AM — 6:00 PM"],
          ["Thursday", "8:00 AM — 6:00 PM"],
          ["Friday", "8:00 AM — 6:00 PM"],
          ["Saturday", "8:00 AM — 6:00 PM"],
          ["Sunday", "Closed"],
        ].map(([day, hours], i) => (
          <div
            key={day}
            className={
              "grid grid-cols-2 gap-2 px-3 py-2 items-center " +
              (i !== 6 ? "border-b" : "")
            }
          >
            <div className="font-medium">{day}</div>
            <div className="text-right text-gray-800">{hours}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" className="rounded" defaultChecked /> Show “Now Open” badge when applicable
        </label>
        <a
          href="/dashboard/merchant/business/hours"
          className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900"
        >
          <span>Hours editor</span> <span>▶</span>
        </a>
      </div>
    </div>
  );
}
