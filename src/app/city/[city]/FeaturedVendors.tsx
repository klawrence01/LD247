import Image from "next/image";

type Vendor = { id:string; name:string; image:string; rating:number; blurb:string; };
const vendors: Vendor[] = [
  { id:"tonys-pizza", name:"Tony’s Pizza", image:"/images/vendor-pizza.jpg", rating:4.7, blurb:"NY-style slices since ’92." },
  { id:"chiro-care", name:"ChiroCare ATL", image:"/images/vendor-chiro.jpg", rating:4.9, blurb:"Same-day relief. Walk-ins ok." },
  { id:"cafe-sunrise", name:"Cafe Sunrise", image:"/images/vendor-cafe.jpg", rating:4.6, blurb:"Local beans. Cozy vibes." },
];

export default function FeaturedVendors() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Featured Vendors</h2>
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map(v => (
          <a key={v.id} href={`/vendor/${v.id}`} className="rounded-2xl shadow p-4 bg-white hover:shadow-md transition">
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <Image src={v.image} alt={v.name} fill className="object-cover" />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{v.name}</span>
                <span className="text-sm">⭐ {v.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{v.blurb}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
