// src/app/messages/page.tsx
import BottomNav from "@/components/BottomNav";

export default function MessagesPage() {
  return (
    <main className="mx-auto max-w-md px-6 pt-10 pb-24">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-black">
          Messages
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Alerts from businesses you follow and new drops in your city.
        </p>
      </header>

      <section className="mt-8 space-y-4 text-sm">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">2h ago</div>
          <div className="font-semibold text-black">
            Tony’s Pizza
          </div>
          <div className="text-gray-700 mt-1">
            “$3 slice combo is live again today only. Show your coupon
            at checkout.”
          </div>
          <div className="mt-3 text-[11px] text-[#F15A29] font-semibold underline underline-offset-2">
            View Deal →
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Yesterday</div>
          <div className="font-semibold text-black">
            Glow Nails Studio
          </div>
          <div className="text-gray-700 mt-1">
            “New weekend special: Free brow wax w/ mani. Limited spots.”
          </div>
          <div className="mt-3 text-[11px] text-[#F15A29] font-semibold underline underline-offset-2">
            View Business →
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
