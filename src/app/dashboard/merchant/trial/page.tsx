"use client";

import { useState } from "react";

export default function TrialPage() {
  // local form state just so fields are controlled
  const [bizName, setBizName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [hours, setHours] = useState("");
  const [promoHook, setPromoHook] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [notes, setNotes] = useState("");

  const [callWindow, setCallWindow] = useState("Tomorrow Morning");
  const [callNotes, setCallNotes] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Your Trial & Next Steps
      </h1>
      <p className="text-sm text-gray-700 mb-8 max-w-2xl leading-relaxed">
        You’re in your 30-Day Free Trial. We’re already building you into the
        system and promoting you in your city. This page shows you what happens
        when the trial ends, what we still need from you, and how to lock in
        ongoing traffic.
      </p>

      {/* SECTION A: STATUS */}
      <section className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Where You Are Right Now
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed mb-2">
          You’re currently on the <strong>Managed Plan ($99/mo)</strong> at no
          cost during your free trial.
        </p>
        <p className="text-sm text-gray-800 leading-relaxed mb-2">
          Your trial ends on{" "}
          <span className="font-semibold">[Trial End Date]</span>. When the
          trial ends:
        </p>
        <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed">
          <li>
            If you stay on: we keep promoting you, scheduling deals, and driving
            traffic.
          </li>
          <li>
            If you leave: we’ll pause your promos and remove you from high
            visibility spots.
          </li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          Nothing breaks. We’ll talk before anything changes.
        </p>
      </section>

      {/* SECTION B: PLAYBOOK */}
      <section className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Your Playbook
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          This covers how we get you customers, what to say to them in-store,
          and how to make sure people follow you so you can reach them again.
        </p>

        <button
          className="bg-black text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-gray-800 mb-4"
          onClick={() => alert("TODO: link PDF download / storage")}
        >
          Download Your Setup Guide (PDF)
        </button>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-700 leading-relaxed">
          <p className="mb-2">
            1. <strong>Your deals build traffic.</strong> We put offers in
            front of locals when they’re deciding where to go — not 3 days
            later.
          </p>
          <p className="mb-2">
            2. <strong>Your QR code builds followers.</strong> Everyone who
            scans is now “yours.” You can reach them again without paying
            anybody in the middle.
          </p>
          <p>
            3. <strong>Your staff sets the tone.</strong> All they have to say
            is: “Before you go, scan this so you get our specials — we post the
            good stuff here first.”
          </p>
        </div>
      </section>

      {/* SECTION C: SEND INFO TO YOUR REP */}
      <section className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Send Us What We Need
        </h2>
        <p className="text-sm text-gray-800 mb-4 leading-relaxed">
          Fill this out once. This goes straight to your Local Deals 24/7 rep so
          we can finish building your page, schedule posts, and make sure
          customers know why to pick you over the place next door.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Business Name
            </label>
            <input
              className="border rounded-md px-2 py-2 w-full text-sm"
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
              placeholder="e.g. Bella Nail Spa"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Owner Phone
            </label>
            <input
              className="border rounded-md px-2 py-2 w-full text-sm"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Owner Email
            </label>
            <input
              className="border rounded-md px-2 py-2 w-full text-sm"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="owner@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Hours / Availability
            </label>
            <input
              className="border rounded-md px-2 py-2 w-full text-sm"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Mon–Fri 9-6, Sat 10-4, Sun closed"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            What should people come in for first?
          </label>
          <input
            className="border rounded-md px-2 py-2 w-full text-sm"
            value={promoHook}
            onChange={(e) => setPromoHook(e.target.value)}
            placeholder="e.g. $10 off first gel set, $5 taco Tuesday, $40 massage intro rate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Social / Links (Instagram, FB, Booking URL)
          </label>
          <input
            className="border rounded-md px-2 py-2 w-full text-sm"
            value={socialLinks}
            onChange={(e) => setSocialLinks(e.target.value)}
            placeholder="@bellanailspa | book.bellanails.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Notes for your rep (anything special we should know?)
          </label>
          <textarea
            className="border rounded-md px-2 py-2 w-full text-sm min-h-[70px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Slowest days, biggest money days, stuff you do better than anyone else..."
          />
        </div>

        {/* file upload placeholder */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Logo or Storefront Photo
          </label>
          <input
            type="file"
            className="block w-full text-sm text-gray-700"
            onChange={() => alert("TODO: wire file upload to Supabase storage")}
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Clear shot, not blurry. This is what locals will see.
          </p>
        </div>

        <button
          onClick={() => alert("TODO: send this payload to Supabase + notify rep")}
          className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700"
        >
          Send to My Rep
        </button>

        <p className="text-[11px] text-gray-500 mt-2 leading-snug">
          We’ll use this to prep your page and schedule deals the way YOU want
          them presented.
        </p>
      </section>

      {/* SECTION D: QR CODE & SCRIPT */}
      <section className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Your QR Code (This Builds Your Followers)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR placeholder */}
          <div className="border border-dashed border-gray-400 rounded-md flex items-center justify-center min-h-[160px] bg-gray-50 text-gray-500 text-sm">
            QR CODE PREVIEW
            <br />
            (We’ll drop your real code here)
          </div>

          {/* Script */}
          <div className="text-sm text-gray-800 leading-relaxed">
            <p className="mb-3">
              Here’s what your staff should say at checkout — every time:
            </p>
            <div className="bg-gray-100 border border-gray-200 rounded-md p-3 text-gray-900 text-[14px] leading-relaxed font-medium">
              “Before you go, scan this so you get our specials and last-minute
              openings. We post the good stuff here first.”
            </div>
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Every scan = a follower you can talk to again for free. That’s how
              you build repeat traffic instead of one-and-done customers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION E: TALK TO YOUR REP */}
      <section className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          Need Help or Want to Lock In?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule a Call */}
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Request a Quick Call
            </h3>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              Pick a window that works. Your rep will confirm.
            </p>

            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Best Time
            </label>
            <select
              className="border rounded-md px-2 py-2 w-full text-sm mb-3"
              value={callWindow}
              onChange={(e) => setCallWindow(e.target.value)}
            >
              <option>Today (ASAP)</option>
              <option>Tonight (After Hours)</option>
              <option>Tomorrow Morning</option>
              <option>Tomorrow Afternoon</option>
            </select>

            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Notes (What do you want to cover?)
            </label>
            <textarea
              className="border rounded-md px-2 py-2 w-full text-sm min-h-[70px] mb-3"
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Example: I want to talk about weekends and how to push gift cards."
            />

            <button
              onClick={() =>
                alert("TODO: save call request for rep in Supabase")
              }
              className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700 w-full"
            >
              Request My Call
            </button>
          </div>

          {/* Send a Message */}
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Send a Message Right Now
            </h3>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              Need something small handled? Ask here and we’ll get back.
            </p>

            <textarea
              className="border rounded-md px-2 py-2 w-full text-sm min-h-[110px] mb-3"
              placeholder="Example: Can you feature my Saturday special this weekend?"
              onChange={() => {}}
            />

            <button
              onClick={() =>
                alert(
                  "TODO: send message to rep (store in messaging center table)"
                )
              }
              className="bg-black text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-gray-800 w-full"
            >
              Send Message to My Rep
            </button>

            <p className="text-[11px] text-gray-500 mt-2 leading-snug">
              This will also show up in your Messaging Center once we wire that
              up.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
