// src/data/mockDeals.ts
export type Deal = {
  id: string;
  city: string;               // e.g., "atlanta", "new-york", etc.
  merchant: string;
  image: string;              // /images/...
  title: string;              // short deal line
  description: string;        // longer text
  date: string;               // YYYY-MM-DD (local)
  rating?: number;            // 0-5
  category?: "Food" | "Health" | "Coffee" | "Shopping" | "Activities" | "Entertainment";
};

export const CITIES = [
  { slug: "atlanta", name: "Atlanta" },
  { slug: "new-york", name: "New York City" },
  { slug: "philadelphia", name: "Philadelphia" },
  { slug: "boston", name: "Boston" },
  { slug: "new-haven", name: "New Haven" },
  { slug: "hartford", name: "Hartford" },
  { slug: "stamford", name: "Stamford" },
  { slug: "waterbury", name: "Waterbury" },
];

const today = new Date();
const fmt = (d: Date) => d.toISOString().slice(0,10);
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return fmt(d);
};

export const MOCK_DEALS: Deal[] = [
  {
    id: "atl-pizza-1",
    city: "atlanta",
    merchant: "Tony's Pizza",
    image: "/images/pizza.jpg",
    title: "2 slices + drink $6.99",
    description: "Lunch special all day. Show the code at counter.",
    date: addDays(0),
    rating: 4.6,
    category: "Food",
  },
  {
    id: "atl-coffee-1",
    city: "atlanta",
    merchant: "Third Wave Cafe",
    image: "/images/coffee.jpg",
    title: "BOGO latte after 2pm",
    description: "Buy one, get one latte (equal or lesser value).",
    date: addDays(1),
    rating: 4.8,
    category: "Coffee",
  },
  {
    id: "atl-chiro-1",
    city: "atlanta",
    merchant: "Align Chiropractic",
    image: "/images/chiro.jpg",
    title: "New patient exam $29",
    description: "Includes consultation & x-rays where necessary.",
    date: addDays(2),
    rating: 4.9,
    category: "Health",
  },
  // Add a few for NYC to test city switcher quickly
  {
    id: "ny-pizza-2",
    city: "new-york",
    merchant: "Mario’s Slice",
    image: "/images/pizza.jpg",
    title: "Large pie $12 (after 7pm)",
    description: "Dine-in or pickup. Limited daily quantity.",
    date: addDays(0),
    rating: 4.5,
    category: "Food",
  },
];
