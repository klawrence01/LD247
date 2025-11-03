// src/components/StarRating.tsx
export default function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, i) => (
        <span key={i} aria-hidden className={filled ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}
