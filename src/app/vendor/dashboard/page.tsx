// C:\Users\Owner\ld247\src\app\vendor\dashboard\page.tsx
// Purpose: This safely reuses the full dashboard you already built under /dashboard
// so you can access it via /vendor/dashboard too.

import dynamic from "next/dynamic";

// We dynamically import your main dashboard page to avoid hydration issues
const DashboardPage = dynamic(() => import("@/app/dashboard/page"), {
  ssr: true,
});

export default function VendorDashboard() {
  return <DashboardPage />;
}
