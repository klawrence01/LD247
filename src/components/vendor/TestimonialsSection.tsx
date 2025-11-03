type Testimonial = { id: string; name: string; text: string; rating?: number };

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  if (!items?.length) {
    return <div className="text-gray-500 text-sm">No testimonials yet.</div>;
  }
  return (
    <ul className="space-y-4 max-h-72 overflow-auto pr-2">
      {items.map((t) => (
        <li key={t.id} className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{t.name}</div>
            {t.rating ? (
              <div className="text-orange-500 text-sm">
                {"★".repeat(Math.round(t.rating))}
                <span className="text-gray-300">
                  {"★".repeat(5 - Math.round(t.rating))}
                </span>
              </div>
            ) : null}
          </div>
          <p className="text-gray-700 text-sm mt-1">{t.text}</p>
        </li>
      ))}
    </ul>
  );
}
