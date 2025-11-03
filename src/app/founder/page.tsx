import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Meet the Founder | Local Deals 24/7",
  description:
    "From Kenneth Lawrence, founder of Local Deals 24/7 — what we stand for and how we help real local businesses win.",
};

export default function FounderPage() {
  return (
    <main className="px-4 py-10 flex justify-center bg-white text-gray-900">
      <section className="w-full max-w-5xl bg-white border border-gray-300 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 lg:p-10">
        {/* ====== TOP BLOCK: PHOTO + INTRO TEXT ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10">
          {/* LEFT CELL: PHOTO */}
          <div className="flex justify-center lg:justify-start">
            <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm w-[220px] h-auto">
              <Image
                src="/images/founder-placeholder.jpg"
                alt="Kenneth Lawrence - Founder of Local Deals 24/7"
                width={400}
                height={480}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* RIGHT CELL: INTRO TEXT */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-black leading-snug mb-4">
              Hi, I’m{" "}
              <span className="text-black font-extrabold">
                Kenneth Lawrence
              </span>
              ,<br />
              the founder of Local Deals 24/7.
            </h1>

            <p className="text-[15px] text-gray-800 leading-relaxed mb-4">
              I built Local Deals 24/7 for independent business owners — the
              barbers, pizza shops, nail techs, massage therapists, gyms,
              nightlife spots, auto shops — everyone who actually keeps a city
              alive.
            </p>

            <p className="text-[15px] text-gray-800 leading-relaxed">
              I’m not a marketing agency and I’m not a coupon farm. I’m here to
              help you bring people in the door on the days and times{" "}
              <strong>you</strong> choose, with offers <strong>you</strong>{" "}
              control — in a way that protects your money and builds repeat
              customers.
            </p>
          </div>
        </div>

        {/* subtle divider */}
        <div className="border-t border-gray-200 mb-10" />

        {/* ====== BOTTOM BLOCK: TWO-COLUMN CONTENT ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            {/* Let's Talk Straight */}
            <section>
              <h2 className="text-base font-bold text-black mb-2">
                Let’s Talk Straight
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed">
                A lot of “deal” platforms burned small business owners. They
                forced you to slash your prices, then took a huge cut on top of
                that. You lost money just to get people in the door — and most
                of those people never came back.
                <br />
                <br />
                That’s not what we’re doing. Local Deals 24/7 gives you control.
                If you want to boost a slow lunch, we help you do that. If
                you’re a nightclub and you want to make Friday and Saturday even
                bigger, we help you do that too. We move when{" "}
                <strong>you</strong> want people.
              </p>
            </section>

            {/* The Movement */}
            <section>
              <h2 className="text-base font-bold text-black mb-2">
                The Movement
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed">
                We’re building this city by city — New Haven, Meriden, Hamden,
                West Haven, Wallingford, and more.
                <br />
                <br />
                The mission is simple: keep local dollars with local owners
                instead of handing them to giant platforms that don’t care if
                you survive.
              </p>
            </section>

            {/* Real Testimonial */}
            <section>
              <h2 className="text-base font-bold text-black mb-2">
                Real Testimonial
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed italic">
                “They actually listened. They didn’t just try to make us give
                everything away for cheap. We got in front of new customers, and
                we didn’t lose our shirt doing it.”
              </p>
              <p className="text-[12px] text-gray-600 leading-relaxed mt-2">
                — Local Business Owner
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-8">
            {/* What Makes Us Different */}
            <section>
              <h2 className="text-base font-bold text-black mb-2">
                What Makes Us Different
              </h2>
              <ul className="text-sm text-gray-800 leading-relaxed space-y-2">
                <li>
                  <strong>You keep your sale.</strong> We don’t take half your
                  revenue.
                </li>
                <li>
                  <strong>You choose when to drive traffic.</strong> Slow
                  weekday? Cool. Packed weekend you want even stronger? Also
                  cool. It’s about when <em>you</em> want volume.
                </li>
                <li>
                  <strong>Your brand, not ours.</strong> People follow{" "}
                  <em>your business</em> directly and get alerts when you post a
                  new offer.
                </li>
                <li>
                  <strong>No “race to the bottom.”</strong> You set the offer,
                  you control how many people can redeem, and you can mark it
                  “sold out” whenever you want.
                </li>
              </ul>
            </section>

            {/* The Proof Is in the Process */}
            <section>
              <h2 className="text-base font-bold text-black mb-2">
                The Proof Is in the Process
              </h2>
              <ol className="list-decimal pl-5 text-sm text-gray-800 leading-relaxed space-y-2">
                <li>
                  We sit with you in person and ask:
                  “When do you actually want more customers?”
                </li>
                <li>
                  We build your page and deal calendar together.
                  You approve it.
                </li>
                <li>
                  We help locals follow your business — so when you post,{" "}
                  <strong>they see you first</strong>.
                </li>
              </ol>
              <p className="text-sm text-gray-800 leading-relaxed mt-2">
                You can pause it, tweak it, or relaunch whenever you want.
                You stay in control.
              </p>
            </section>

            {/* CTA box */}
            <section className="bg-black text-white rounded-lg p-4 shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
              <p className="text-sm leading-relaxed mb-4">
                Local Deals 24/7 was built so{" "}
                <strong>small businesses win</strong> — not big ad networks.
                Ask us to prove it in person.
              </p>

              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-center text-sm font-semibold bg-yellow-400 text-black rounded-md px-3 py-2 hover:bg-yellow-300"
                >
                  Meet Your Local Rep
                </Link>
                <Link
                  href="/behind-the-hustle"
                  className="block text-center text-sm font-semibold bg-yellow-400 text-black rounded-md px-3 py-2 hover:bg-yellow-300"
                >
                  Read Behind the Hustle
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
