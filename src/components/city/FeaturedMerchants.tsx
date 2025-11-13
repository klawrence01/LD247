// src/components/city/FeaturedMerchants.tsx
type Merchant = {
  id: string;
  name: string;
  tagline?: string;
};

export default function FeaturedMerchants({
  merchants = [],
}: {
  merchants?: Merchant[];
}) {
  if (!merchants.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Featured Merchants</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {merchants.map((m) => (
          <div key={m.id} className="rounded-lg border p-4 bg-white">
            <h3 className="font-semibold">{m.name}</h3>
            {m.tagline ? (
              <p className="text-sm text-muted-foreground">{m.tagline}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
