// src/app/VendorDashboard/deals/new/page.tsx
"use client";

import React from "react";
import DealForm from "../../coupons/_components/DealForm";

export default function NewDealPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6 text-orange-400">
          Create a New Deal
        </h1>
        <p className="text-slate-300 mb-8">
          Fill out the form below to create a new deal for your business. Once
          submitted, your deal will be reviewed and displayed on your vendor
          page. Make sure all details are correct before saving.
        </p>

        <div className="rounded-xl bg-slate-900/50 p-6 shadow-lg border border-slate-800">
          <DealForm />
        </div>
      </section>
    </main>
  );
}
