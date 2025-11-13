// src/components/city/CategoryFilter.tsx
const categories = ["All", "Food", "Beauty", "Auto", "Health", "Fun"];

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded-full text-sm border ${
            value === cat ? "bg-orange-500 text-white" : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
