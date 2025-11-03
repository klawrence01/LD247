export default function RatingsSummary({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  const full = Math.round(rating);
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">Customer Rating</div>
      <div className="flex items-center gap-2">
        <div className="text-orange-500 text-lg">
          {"★".repeat(full)}
          <span className="text-gray-300">{"★".repeat(5 - full)}</span>
        </div>
        <div className="text-gray-700 font-semibold">{rating.toFixed(1)}</div>
        <div className="text-gray-500 text-sm">({count.toLocaleString()} reviews)</div>
      </div>
    </div>
  );
}
