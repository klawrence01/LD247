// Client-side deals store using localStorage (no backend).
export type DealStatus = 'Draft' | 'Scheduled' | 'Active' | 'Expired';

export type Deal = {
  id: string;
  title: string;
  description: string;
  price?: string; // e.g., "$6.99" or "20% Off"
  image?: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string;   // ISO yyyy-mm-dd
  status: DealStatus;
  redemptionLimit?: number | null; // optional
};

const KEY = 'ld247:deals:v1';

const seed: Deal[] = [
  {
    id: 'd1',
    title: '2 Slices + Drink — $6.99',
    description: 'Lunch special, dine-in or takeout.',
    price: '$6.99',
    image: '',
    startDate: isoNDaysFrom(0),
    endDate: isoNDaysFrom(6),
    status: 'Active',
    redemptionLimit: 100,
  },
  {
    id: 'd2',
    title: 'Family Pie Night — 20% Off',
    description: 'Any 2 large pies after 5pm.',
    price: '20% Off',
    image: '',
    startDate: isoNDaysFrom(7),
    endDate: isoNDaysFrom(7),
    status: 'Scheduled',
    redemptionLimit: null,
  },
  {
    id: 'd3',
    title: 'Free Garlic Knots',
    description: 'With any large pizza purchase.',
    price: 'Free',
    image: '',
    startDate: isoNDaysFrom(10),
    endDate: isoNDaysFrom(14),
    status: 'Draft',
    redemptionLimit: 50,
  },
];

export function isoNDaysFrom(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function loadDeals(): Deal[] {
  if (typeof window === 'undefined') return seed;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return [...seed];
  }
  try {
    const arr = JSON.parse(raw) as Deal[];
    return Array.isArray(arr) ? arr : [...seed];
  } catch {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return [...seed];
  }
}

export function saveDeals(list: Deal[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertDeal(input: Deal) {
  const list = loadDeals();
  const i = list.findIndex((d) => d.id === input.id);
  if (i >= 0) list[i] = input;
  else list.unshift(input);
  saveDeals(list);
}

export function deleteDeal(id: string) {
  const list = loadDeals().filter((d) => d.id !== id);
  saveDeals(list);
}

export function getDeal(id: string) {
  return loadDeals().find((d) => d.id === id);
}

export function newId() {
  return 'd' + Math.random().toString(36).slice(2, 8);
}

export function recomputeStatus(d: Deal, today = new Date()): DealStatus {
  const s = new Date(d.startDate + 'T00:00:00');
  const e = new Date(d.endDate + 'T23:59:59');
  if (d.status === 'Draft') return 'Draft';
  if (today < s) return 'Scheduled';
  if (today > e) return 'Expired';
  return 'Active';
}
