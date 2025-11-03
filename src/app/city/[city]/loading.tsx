// src/app/city/[city]/loading.tsx

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Title skeleton */}
      <div className="h-9 w-56 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-8" />

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 animate-pulse"
          >
            <div className="aspect-[16/9] rounded-lg bg-gray-200 dark:bg-gray-800 mb-4" />
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800 mb-2" />
            <div className="h-4 w-1/3 rounded bg-gray-100 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
