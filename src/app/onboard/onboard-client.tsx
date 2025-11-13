"use client";

import { useSearchParams } from "next/navigation";

export default function OnboardClient() {
  const params = useSearchParams();
  const step = params.get("step") ?? "";
  const ref = params.get("ref") ?? "";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Onboard</h1>

      {!!step && (
        <p className="text-sm opacity-70">
          Step: <code>{step}</code>
        </p>
      )}
      {!!ref && (
        <p className="text-sm opacity-70">
          Referral: <code>{ref}</code>
        </p>
      )}

      {/* TODO: move your actual onboarding UI here */}
    </div>
  );
}
