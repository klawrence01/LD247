import Link from "next/link";

const vendorIdDemo = "vendor-tonys";
const cityDemo = "aruba";

export default function PreviewLinksPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold mb-4">Preview Pages</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link href={`/city/${cityDemo}`} className="text-blue-600 underline">
            City — {cityDemo}
          </Link>
        </li>
        <li>
          <Link href={`/vendor/${vendorIdDemo}`} className="text-blue-600 underline">
            Vendor — {vendorIdDemo}
          </Link>
        </li>
        <li>
          <Link href="/deals/demo-coupon" className="text-blue-600 underline">
            Deal — demo-coupon
          </Link>
        </li>
      </ul>
    </div>
  );
}
