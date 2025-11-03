"use client";

export default function SurveyCTA({
  vendorId,
  vendorName,
}: {
  vendorId: string;
  vendorName: string;
}) {
  function startSurvey() {
    // For now, simple redirect; later wire to a modal or internal route
    window.location.href = `/survey/${encodeURIComponent(vendorId)}`;
  }

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Tell us about your visit</h3>
      <p className="text-sm text-gray-700">
        Share quick feedback to help {vendorName} improve and unlock rewards.
      </p>
      <button
        onClick={startSurvey}
        className="mt-3 rounded-lg bg-orange-500 px-4 py-2 text-white"
      >
        Start Survey
      </button>
    </div>
  );
}
