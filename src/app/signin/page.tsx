"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  const sp = useSearchParams();
  const trial = sp.get("trial") === "1";
  const plan = sp.get("plan") ?? "starter";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(
      trial
        ? `Demo: creating ${plan} trial account for ${email}`
        : `Demo: signing in ${email}`
    );
    // TODO: replace with real auth; route to vendor dashboard
    window.location.href = "/vendor/dashboard";
  }

  return (
    <div className="min-h-[80vh] grid place-items-center px-6 py-14">
      <div className="w-full max-w-md rounded-2xl border shadow-sm bg-white p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {trial ? "Start your free trial" : "Sign in"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {trial
              ? "14-day free trial. No credit card required."
              : "Welcome back to Local Deals 24/7"}
          </p>
        </div>

        {trial && (
          <div className="mt-4 text-xs text-center text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
            Bonus: reach <b>30 visitors</b> in your first 30 days and get your
            <b> next month free</b>. Tracked in your vendor analytics.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-1 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:opacity-95"
          >
            {trial ? "Create trial account" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
          By continuing, you agree to our{" "}
          <Link href="/legal/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </div>

        <div className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
