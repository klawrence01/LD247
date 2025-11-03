// app/cities/page.tsx

const cityList = [
  "Atlanta",
  "New York City",
  "Philadelphia",
  "Boston",
  "New Haven",
  "Springfield",
  "Hartford",
  "Stamford",
  "Waterbury",
];

export const metadata = {
  title: "Browse All Cities",
  description: "See where Local Deals 24/7 is active.",
};

export default function CitiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Explore Cities</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cityList.map((city) => (
          <li key={city}>
            <a
              href={`/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
              className="block bg-orange-50 hover:bg-orange-100 border-l-4 border-orange-500 rounded-xl p-4 transition"
            >
              {city}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
