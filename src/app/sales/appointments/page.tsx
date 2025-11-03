// src/app/dashboard/sales/appointments/page.tsx
"use client";

import Link from "next/link";

const mockAppointments = [
  {
    id: 101,
    business: "Tony’s Pizza",
    rep: "Ken L.",
    date: "2025-11-04",
    time: "10:00 AM",
    method: "Zoom",
    status: "Confirmed",
  },
  {
    id: 102,
    business: "Bella Nail Spa",
    rep: "Ken L.",
    date: "2025-11-04",
    time: "2:30 PM",
    method: "In Person",
    status: "Pending",
  },
];

export default function SalesAppointmentsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-gray-500">
            Calls, demos, and in-person visits you have scheduled.
          </p>
        </div>
        <Link
          href="/dashboard/sales"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Sales Dashboard
        </Link>
      </div>

      <div className="grid gap-4">
        {mockAppointments.map((appt) => (
          <div
            key={appt.id}
            className="border border-gray-200 bg-white rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="font-semibold text-gray-900">
                {appt.business}
              </h2>
              <p className="text-sm text-gray-500">
                With {appt.rep} • {appt.method}
              </p>
            </div>
            <div className="text-sm text-gray-700">
              <p>
                {appt.date} at {appt.time}
              </p>
              <p
                className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  appt.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {appt.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-900">
                View Details
              </button>
              <button className="text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100">
                Reschedule
              </button>
            </div>
          </div>
        ))}

        {mockAppointments.length === 0 && (
          <p className="text-gray-400 text-sm">
            No appointments yet. Add one from your CRM / lead record.
          </p>
        )}
      </div>
    </div>
  );
}
