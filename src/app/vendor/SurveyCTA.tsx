"use client";

export default function SurveyCTA({
  vendorId,
  vendorName,
  href,
}: {
  vendorId: string;
  vendorName?: string;
  href?: string;
}) {
  const surveyUrl = href || `/survey/${vendorId}`;

  return (
    <div className="rounded-2xl bg-[#fff5f0] border border-[#fbe1d7] p-4 space-y-2">
      <h3 className="text-sm font-semibold text-[#0f172a]">
        Take our quick survey
      </h3>
      <p className="text-sm text-slate-600">
        Tell {vendorName || "this business"} how they did — your feedback goes
        straight to the owner.
      </p>
      <a
        href={surveyUrl}
        className="inline-flex items-center gap-2 rounded-full bg-[#f0472c] text-white px-4 py-1.5 text-sm"
      >
        📝 Start survey
      </a>
      <p className="text-[0.65rem] text-slate-400">
        Survey results are private to the merchant.
      </p>
    </div>
  );
}
