// src/app/explore/page.tsx
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-md px-6 pt-10 pb-24">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-black">
          Explore
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse by category. Find new local favorites.
        </p>
      </header>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-black">
          Categories
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Food & Drink", href: "/city/new-haven?cat=food" },
            { label: "Nails / Beauty", href: "/city/new-haven?cat=beauty" },
            { label: "Fitness", href: "/city/new-haven?cat=fitness" },
            { label: "Health & Wellness", href: "/city/new-haven?cat=wellness" },
            { label: "Retail / Boutique", href: "/city/new-haven?cat=retail" },
            { label: "Services", href: "/city/new-haven?cat=services" },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="rounded-xl border bg-white p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold text-black">{cat.label}</div>
              <div className="mt-1 text-[11px] text-gray-500">
                See deals →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New / Trending */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-black">
          New & Trending Near You
        </h2>

        <div className="mt-4 space-y-4 text-sm">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">
              New in New Haven
            </div>
            <div className="font-semibold text-black">
              Revive Fitness
            </div>
            <div className="text-gray-700 mt-1">
              “First class $10 (Reg $30)”
            </div>
            <div className="mt-3 text-[11px] text-[#F15A29] font-semibold underline underline-offset-2">
              View Deal →
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">
              Hartford Favorite
            </div>
            <div className="font-semibold text-black">
              Glow Nails Studio
            </div>
            <div className="text-gray-700 mt-1">
              “Free brow wax w/ manicure”
            </div>
            <div className="mt-3 text-[11px] text-[#F15A29] font-semibold underline underline-offset-2">
              View Business →
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
