"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. sign in
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // 2. get the user we just signed in as
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Could not load user session.");
      setLoading(false);
      return;
    }

    const userId = user.id;

    // 3. figure out what they are: admin, rep, or vendor
    // check admin
    const { data: adminMatch } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .limit(1);

    if (adminMatch && adminMatch.length > 0) {
      router.push("/admin/dashboard");
      return;
    }

    // check sales rep
    const { data: repMatch } = await supabase
      .from("sales_reps")
      .select("id,status")
      .eq("user_id", userId)
      .limit(1);

    if (repMatch && repMatch.length > 0) {
      // (optional) only allow active reps
      if (repMatch[0].status === "active") {
        router.push("/rep/dashboard");
      } else {
        setError("Your rep account is not active yet. Please contact admin.");
        setLoading(false);
      }
      return;
    }

    // check vendor / business owner
    const { data: bizOwnerMatch } = await supabase
      .from("businesses")
      .select("id,name")
      .eq("owner_user_id", userId)
      .limit(1);

    if (bizOwnerMatch && bizOwnerMatch.length > 0) {
      // You can point them wherever you want vendors to land first
      router.push("/vendor/messages");
      return;
    }

    // fallback: no mapped role
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col pt-6">
      {/* top nav bar look-alike gap filler so style matches app */}
      <div className="bg-neutral-950 flex flex-col items-center justify-center flex-1 px-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <h1 className="text-xl font-bold mb-4 text-center text-white">
            Sign In
          </h1>

          <p className="text-sm text-neutral-400 text-center mb-6">
            Log in to access your dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-neutral-400 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder-neutral-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder-neutral-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center bg-red-950/40 border border-red-800 rounded-lg p-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 rounded-lg transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-xs text-neutral-600 text-center mt-6">
            © {new Date().getFullYear()} Local Deals 24/7
          </div>
        </div>
      </div>
    </div>
  );
}
