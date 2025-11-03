import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type PageProps = {
  params: {
    city: string;
    slug: string;
  };
};

export default async function PublicVendorPage({ params }: PageProps) {
  const { city, slug } = params;

  // we assume you stored something like `/new-haven/tonys-pizza` in public_url
  const publicPath = `/${city}/${slug}`;

  const { data, error } = await supabase
    .from("vendors")
    .select(
      "id, name, city, state, website, logo_url, plan, status, public_url"
    )
    .eq("public_url", publicPath)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Business not found</h1>
          <p className="text-gray-500 mb-6">
            This business may not be published yet.
          </p>
          <Link
            href="/"
            className="text-orange-600 font-semibold hover:underline"
          >
            Back to Local Deals 24/7
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            <span className="font-extrabold text-orange-600">LD247</span>
          </Link>
          <p className="text-xs text-gray-400">
            Everyday Deals. Everyday Heroes.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* business header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 flex gap-6 items-center">
          {data.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logo_url}
              alt={data.name}
              className="w-20 h-20 rounded-xl object-cover bg-gray-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              {data.name?.charAt(0) ?? "B"}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            <p className="text-sm text-gray-500">
              {data.city}
              {data.state ? `, ${data.state}` : ""}
            </p>
            {data.status === "active" ? (
              <p className="text-xs inline-flex mt-2 px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                Active on Local Deals 24/7
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900">
              Follow this business
            </button>
            {data.website ? (
              <a
                href={data.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 text-right"
              >
                Visit website →
              </a>
            ) : null}
          </div>
        </div>

        {/* deals / description */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-3">
              Current Deal / Featured Offer
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              This business hasn’t added a detailed offer yet. Check back soon
              or follow them to get updates as they post new deals.
            </p>
            <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
              <p className="text-sm text-orange-900 mb-1 font-semibold">
                Want your deal here?
              </p>
              <p className="text-xs text-orange-900 mb-2">
                Merchants can post daily, weekend, and holiday offers right from
                their dashboard.
              </p>
              <Link
                href="/dashboard/merchant"
                className="text-xs text-orange-900 underline font-semibold"
              >
                Go to merchant dashboard →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-3">About this page</h2>
            <p className="text-sm text-gray-600 mb-3">
              Local Deals 24/7 highlights local businesses so shoppers can
              discover, save, and support nearby. Follow businesses you like to
              get notified when they post a new deal.
            </p>
            <p className="text-xs text-gray-400">
              City: <span className="uppercase">{city}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
