"use client";

import { useSearchParams } from "next/navigation";

export default function SignInClient() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/";

  // TODO: move your existing sign-in UI/logic here (form, OAuth buttons, etc.)
  // Keep this as a client component so useSearchParams() is allowed.
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="text-sm opacity-70">
        After sign-in you’ll be redirected to: <code>{redirectTo}</code>
      </p>
      {/* your actual sign-in form/buttons go here */}
    </div>
  );
}
