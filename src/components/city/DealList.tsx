// src/components/city/DealList.tsx
type Deal = {
  id: string;
  title: string;
  description?: string;
};

export default function DealList({ deals = [] }: { deals?: Deal[] }) {
  if (!deals.length) {
    return <p className="text-sm text-muted-foreground">No deals yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {deals.map((deal) => (
        <div key={deal.id} className="rounded-lg border p-4 bg-white">
          <h3 className="font-semibold mb-1">{deal.title}</h3>
          {deal.description ? (
            <p className="text-sm text-muted-foreground">{deal.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
