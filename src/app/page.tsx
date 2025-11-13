"use client";

import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Promo ribbon */}
      <div className="w-full bg-orange-600 text-white text-center text-sm py-2 px-3">
        <span className="font-semibold">New vendors:</span> 14-day free trial
        <span className="mx-2">•</span>
        <span className="font-semibold">Bonus:</span> Get <b>30 visitors</b> in your first 30 days and your <b>next month is free</b>.
        {/* DEPLOY TEST TAG */}
        <span className="ml-2 text-xs">(Deploy test 11-13-01)</span>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Real Deals. Real Local Businesses.
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Support local vendors while saving big on your favorite services.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/city/atlanta"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Explore Deals
          </Link>

          <Link
            href="/vendor/signup"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            I'm a Vendor
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">1. Browse Local Deals</h3>
            <p className="text-gray-600">
              Explore discounts from restaurants, barbers, salons, auto shops, and more.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">2. Save Your Favorites</h3>
            <p className="text-gray-600">
              Tap to save any deal and show it at the business—no prepay required.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">3. Support Your Community</h3>
            <p className="text-gray-600">
              Every deal helps strengthen local businesses and keeps money in your city.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} LocalDeals247. All rights reserved.</p>
      </footer>
    </main>
  );
}
