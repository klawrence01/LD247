import Image from "next/image"

export default function AccountExecutiveCard() {
  return (
    <div className="rounded-2xl shadow-md mt-4 border bg-white p-4">
      <h2 className="text-lg font-semibold mb-2">Your Account Executive</h2>
      <div className="flex items-center gap-3">
        <Image
          src="/images/rep-placeholder.jpg"
          alt="Account Executive"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">Jane Doe</p>
          <p className="text-sm text-gray-600">(555) 987-6543</p>
          <p className="text-sm text-gray-600">jane.doe@ld247.com</p>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1 text-sm rounded bg-gray-200">Message</button>
            <button className="px-3 py-1 text-sm rounded bg-orange-500 text-white">Schedule Call</button>
          </div>
        </div>
      </div>
    </div>
  )
}
