// app/behind-the-hustle/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Behind the Hustle • Local Deals 24/7",
  description:
    "Real stories. Real people. Discover the small business heroes powering our communities through Local Deals 24/7.",
};

export default function BehindTheHustlePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* HERO SECTION */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
          Behind the Hustle
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Stories of real small businesses — the everyday heroes building
          stronger communities, one deal at a time.
        </p>
      </header>

      {/* FEATURED STORY */}
      <section className="rounded-2xl overflow-hidden border mb-12 shadow-sm">
        <div className="relative h-64 sm:h-80">
          <Image
            src="/images/coffee.jpg"
            alt="Local coffee shop feature"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2">
            Brewing Connection: How One Café Became the Heart of Its City
          </h2>
          <p className="text-gray-700 mb-4">
            Meet the owners of Daily Grind Café, who turned a corner coffee
            shop into a local landmark. Their recipe for success? Community
            first, deals second — and a whole lot of heart.
          </p>
          <Link
            href="#"
            className="inline-block rounded-lg bg-black text-white px-5 py-2 text-sm font-semibold hover:bg-orange-500 transition"
          >
            Read Full Story
          </Link>
        </div>
      </section>

      {/* RECENT STORIES */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Recent Stories</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "The Barber Who Built a Brand",
              img: "/images/haircut.jpg",
              summary:
                "From fades to fame — how one shop turned skill into legacy.",
            },
            {
              title: "Family Pizza, Local Legacy",
              img: "/images/pizza.jpg",
              summary:
                "A neighborhood staple for 30 years, still delivering joy daily.",
            },
            {
              title: "Fitness for All: The Gym That Gives Back",
              img: "/images/gym.jpg",
              summary:
                "When profits go to scholarships, every workout makes a difference.",
            },
          ].map((story, i) => (
            <article
              key={i}
              className="rounded-2xl border overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  src={story.img}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold mb-1">{story.title}</h4>
                <p className="text-gray-700 text-sm mb-3">{story.summary}</p>
                <Link
                  href="#"
                  className="text-orange-600 font-medium text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MEET THE HEROES */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Meet the Heroes</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Tony’s Pizza",
              city: "Hartford, CT",
              quote: "Local Deals 24/7 helped us double foot traffic in 30 days!",
              img: "/images/vendor-pizza.jpg",
            },
            {
              name: "Glow Nails Studio",
              city: "New Haven, CT",
              quote: "Our first feature deal sold out in hours.",
              img: "/images/vendor-nails.jpg",
            },
            {
              name: "Revive Fitness",
              city: "Boston, MA",
              quote: "We found loyal clients who now train with us year-round.",
              img: "/images/vendor-gym.jpg",
            },
          ].map((biz, i) => (
            <div
              key={i}
              className="rounded-2xl border p-5 text-center hover:shadow-sm transition"
            >
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden mb-3">
                <Image
                  src={biz.img}
                  alt={biz.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold">{biz.name}</h4>
              <p className="text-sm text-gray-600">{biz.city}</p>
              <p className="mt-2 text-gray-700 text-sm italic">“{biz.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="rounded-2xl bg-orange-500 text-white text-center py-12 px-6">
        <h3 className="text-2xl font-bold mb-3">
          Get the Latest Local Business Stories
        </h3>
        <p className="text-sm mb-6 max-w-xl mx-auto">
          Join our community of everyday heroes. Subscribe to Behind the Hustle
          and discover inspiring stories, insider deals, and new ways to
          support local.
        </p>
        <Link
          href="#"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Subscribe Now
        </Link>
      </section>
    </div>
  );
}
