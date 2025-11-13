import { Suspense } from "react";
import OnboardClient from "./onboard-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Onboard" };

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <OnboardClient />
    </Suspense>
  );
}
