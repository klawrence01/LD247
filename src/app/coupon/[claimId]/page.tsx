// src/app/coupon/[claimId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const claimId =
    props?.params?.claimId ??
    props?.params?.ClaimId ??
    (typeof props?.params === "string" ? props.params : "unknown-claim");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Coupon / Claim
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Claim ID: <span className="font-mono">{claimId}</span>
      </p>
      <p className="text-sm text-gray-500">
        This is a placeholder for validating or showing a claimed coupon.
      </p>
    </main>
  );
}
