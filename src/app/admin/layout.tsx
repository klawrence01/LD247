// src/app/admin/layout.tsx
import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "LocalDeals247 Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 min-h-screen bg-neutral-900/80 px-6 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
