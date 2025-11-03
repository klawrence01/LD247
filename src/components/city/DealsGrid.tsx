// path: src/components/city/DealsGrid.tsx
// Pure presentational component — safe to use in client or server components.

type Deal = {
  id: string;
  title: string;
  merchantName: string;
  imageUrl?: string;
  city: string;
  date: string; // YYYY-MM-DD (local)
  short?: string;
};

export default function DealsGrid({ deals }: { deals: Deal[] }) {
  if (!deals || deals.length === 0) {
    return (
      <div className="border rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">No deals match your filters.</h3>
        <p className="opacity-75 mb-4">Try another day or category.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["vendor-pizza.jpg","vendor-chiro.jpg","vendor-cafe.jpg"].map((img, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <img src={`/images/${img}`} alt="" className="w-full h-40 object-cover" />
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">Featured Merchant</div>
                  <div className="text-xs opacity-70">Tap to follow</div>
                </div>
                <button className="px-3 py-1 rounded-xl border">Follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((d) => (
        <article key={d.id} className="border rounded-2xl overflow-hidden">
          <img
            src={d.imageUrl ?? "/images/pizza.jpg"}
            alt=""
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="text-xs opacity-70">
              {d.city} • {d.date}
            </div>
            <h3 className="font-semibold">{d.title}</h3>
            {d.short && <p className="text-sm opacity-80 mt-1">{d.short}</p>}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm opacity-80">{d.merchantName}</span>
              <button className="px-3 py-1 rounded-xl border">Save</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
