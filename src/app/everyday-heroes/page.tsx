export const metadata = {
  title: "Everyday Heroes | Local Deals 24/7",
  description:
    "Meet the local business owners keeping this city alive.",
};

export default function EverydayHeroesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-3xl font-extrabold text-black mb-4">
        Everyday Heroes
      </h1>

      <p className="text-base text-gray-700 leading-relaxed mb-6">
        These are the barbers, shop owners, nail techs, gym owners, late-night
        food spots, and weekend hustlers who keep this city running.
        We call them Everyday Heroes for a reason — they’re not chains,
        they’re people.
      </p>

      <p className="text-sm text-gray-600 leading-relaxed">
        We’re still adding profiles in your area. If you’re a local business and
        you want to be featured here, talk to your Local Deals 24/7 rep.
      </p>
    </main>
  );
}
