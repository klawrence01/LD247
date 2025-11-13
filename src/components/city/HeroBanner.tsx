// src/components/city/HeroBanner.tsx
export default function HeroBanner({ city }: { city: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-white mb-6">
      <h1 className="text-2xl font-bold">Local Deals in {city}</h1>
      <p className="text-sm opacity-90">
        Save today, support local, come back tomorrow.
      </p>
    </div>
  );
}
