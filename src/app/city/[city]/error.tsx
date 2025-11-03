'use client';

export default function CityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold">Something went wrong</h1>
      <p className="text-gray-600">
        {error.message || 'We could not load city deals.'}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
