"use client";

type Testimonial = {
  id: string;
  name: string;
  text: string;
  rating?: number;
};

export default function TestimonialsSection({
  items = [],
  leaveLink,
  limit = 3,
}: {
  items?: Testimonial[];
  leaveLink?: string;
  limit?: number;
}) {
  const toShow = items.slice(0, limit);

  return (
    <div className="space-y-3">
      {toShow.length === 0 ? (
        <p className="text-sm text-slate-400">
          No testimonials yet. Be the first to leave one.
        </p>
      ) : (
        toShow.map((t) => (
          <div
            key={t.id}
            className="bg-[#fff5f0] rounded-2xl px-4 py-3 flex gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#f0472c] text-white flex items-center justify-center text-sm">
              {t.name?.[0] ?? "C"}
            </div>
            <div>
              <p className="text-sm font-medium text-[#0f172a]">{t.name}</p>
              <p className="text-sm text-slate-600">{t.text}</p>
            </div>
          </div>
        ))
      )}

      {leaveLink ? (
        <a
          href={leaveLink}
          className="inline-flex items-center gap-1 text-sm text-[#f0472c] hover:underline"
        >
          + Leave a testimonial
        </a>
      ) : null}
    </div>
  );
}
