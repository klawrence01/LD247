// src/lib/mock.ts
export type Deal = {
  id: string;
  title: string;
  description: string;
  priceText?: string;
  percentOff?: number;
  image: string; // /images/*.jpg
  date: string;  // YYYY-MM-DD
};

export type Vendor = {
  slug: string;
  name: string;
  rating: number; // 0-5
  reviewsCount: number;
  address: string;
  phone: string;
  categories: string[];
  description: string;
  heroImage: string;
  logo: string;
  city: string;
  deals: Deal[];
  testimonials: { name: string; quote: string; date: string }[];
  socials?: { facebook?: string; instagram?: string; website?: string };
};

export const cities = ["atlanta", "new-york", "hartford", "boston"];

export const vendors: Vendor[] = [
  {
    slug: "tonys-pizza",
    name: "Tony’s Pizza",
    rating: 4.6,
    reviewsCount: 218,
    address: "123 Main St, Atlanta, GA",
    phone: "(404) 555-0199",
    categories: ["Food", "Pizza", "Lunch"],
    description:
      "Neighborhood favorite since 1998. Hand-tossed pies, fresh toppings, fast service.",
    heroImage: "/images/pizza.jpg",
    logo: "/images/vendor-pizza.jpg",
    city: "atlanta",
    socials: { website: "https://example.com" },
    deals: [
      {
        id: "d1",
        title: "2 Slices + Drink",
        description: "Quick lunch combo. Any 2 classic slices + fountain drink.",
        priceText: "$7.99",
        image: "/images/pizza.jpg",
        date: new Date().toISOString().slice(0, 10),
      },
      {
        id: "d2",
        title: "Large Pie — 20% Off",
        description: "All large pizzas. Dine-in or pickup.",
        percentOff: 20,
        image: "/images/pizza.jpg",
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // tomorrow
      },
    ],
    testimonials: [
      { name: "Jasmine R.", quote: "Crispy crust. Sauce hits!", date: "2025-07-01" },
      { name: "Mike D.", quote: "Best lunch deal on the block.", date: "2025-07-12" },
    ],
  },
  {
    slug: "daily-grind-cafe",
    name: "Daily Grind Café",
    rating: 4.8,
    reviewsCount: 341,
    address: "55 River Rd, Hartford, CT",
    phone: "(860) 555-0142",
    categories: ["Coffee", "Breakfast", "Bakery"],
    description:
      "Small-batch roasts, fresh pastries, and friendly faces every morning.",
    heroImage: "/images/coffee.jpg",
    logo: "/images/vendor-cafe.jpg",
    city: "hartford",
    socials: { instagram: "https://example.com" },
    deals: [
      {
        id: "d3",
        title: "BOGO Latte",
        description: "Buy one latte, get the 2nd 50% off.",
        image: "/images/coffee.jpg",
        date: new Date().toISOString().slice(0, 10),
      },
    ],
    testimonials: [
      { name: "Renee", quote: "My daily spot. Staff is lovely.", date: "2025-07-22" },
    ],
  },
];

export function getVendorsByCity(city: string) {
  return vendors.filter(v => v.city.toLowerCase() === city.toLowerCase());
}
export function getVendor(slug: string) {
  return vendors.find(v => v.slug === slug);
}
