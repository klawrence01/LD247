// utils/deals.ts
export type Deal = {
  id: string;
  title: string;
  vendor: { id: string; name: string; logo_url?: string; website?: string };
  city: string;
  image_url?: string;
  category?: string;
  price?: number;
  original_price?: number;
  type?: "percent" | "bogo" | "xForY" | "newClient" | "freebie";
  xForYText?: string; // e.g., "2 FOR $3"
  address?: string;
  hours?: string;
  rating?: number; // 0–5
  start_date?: string; // ISO
  end_date?: string;   // ISO
  limit_per_person?: number;
  min_purchase?: number;
  phone?: string;
};

export function percentOffLabel(price?: number, original?: number) {
  if (price == null || original == null || original <= 0 || price >= original) return null;
  const pct = Math.round(100 * (1 - price / original));
  return `${pct}% OFF`;
}

export function primaryBadge(d: Deal) {
  if (d.type === "xForY" && d.xForYText) return d.xForYText;
  if (d.type === "bogo") return "BUY 1 GET 1";
  if (d.type === "newClient") return "NEW CLIENT 25% OFF";
  if (d.type === "freebie") return "FREE";
  const pct = percentOffLabel(d.price, d.original_price);
  return pct ?? undefined;
}

export function formatDayLabel(dt: Date) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "2-digit" };
  return dt.toLocaleDateString(undefined, opts); // e.g., "Oct 20"
}

export function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export function isDealOnDate(deal: Deal, on: Date) {
  const s = deal.start_date ? new Date(deal.start_date) : undefined;
  const e = deal.end_date ? new Date(deal.end_date) : undefined;
  const dayStart = new Date(on); dayStart.setHours(0,0,0,0);
  const dayEnd = new Date(on); dayEnd.setHours(23,59,59,999);
  if (!s && !e) return true;
  if (s && dayEnd < s) return false;
  if (e && dayStart > e) return false;
  return true;
}

// Minimal mock so the UI renders without env
export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "30% OFF Large Pies",
    vendor: { id: "v1", name: "Tony’s Pizza", logo_url: "", website: "" },
    city: "aruba",
    image_url: "",
    type: "percent",
    price: 14,
    original_price: 20,
    address: "123 Main",
    hours: "8 AM – 8 PM",
    rating: 4,
    start_date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "2 FOR $3 Pizza Slice",
    vendor: { id: "v2", name: "Elm St Pizza" },
    city: "aruba",
    type: "xForY",
    xForYText: "2 FOR $3",
    address: "456 Elm St",
    hours: "11 AM – 10 PM",
    rating: 4,
    start_date: addDays(new Date(), 0).toISOString(),
  },
  {
    id: "3",
    title: "BUY 1 GET 1 Coffee",
    vendor: { id: "v3", name: "Oak Café" },
    city: "aruba",
    type: "bogo",
    address: "768 Oak St",
    hours: "9 AM – 6 PM",
    rating: 4,
    start_date: addDays(new Date(), 1).toISOString(),
  },
  {
    id: "4",
    title: "NEW CLIENT 25% OFF",
    vendor: { id: "v4", name: "Pine Salon" },
    city: "aruba",
    type: "newClient",
    address: "15 Pine Ave",
    hours: "10 AM – 7 PM",
    rating: 4,
    start_date: addDays(new Date(), 2).toISOString(),
  },
];
