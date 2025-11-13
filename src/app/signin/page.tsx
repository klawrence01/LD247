import { Suspense } from "react";
import SignInClient from "./signin-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
