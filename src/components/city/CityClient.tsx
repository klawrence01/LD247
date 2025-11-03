"use client";

import { useState } from "react";
import { Deal } from "@/utils/deals";
import Image from "next/image";
import Link from "next/link";

interface CityClientProps {
  city: string;
  cityName?: string;
  todayISO: string;
  deals: Deal[];
}

export default function CityClient({
  city,
  cityName,
  todayISO,
  deals,
}: CityClientProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(todayISO));

  const displayCity = cityName ?? city?.toUpperCase() ?? "Unknown City";

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(todayISO);
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <main className="max-w-5xl w-full mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight uppercase">
          {displayCity}
        </h1>
        <p className="text-base text-slate-700">
          Everyday Deals. Everyday Heroes.
        </p>
        <p className="text-sm text-slate-400">
          Showing deals for:{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
        <select className="border rounded-lg px-3 py-2 w-48" value={displayCity}>
          <option>{displayCity}</option>
        </select>
        <input
          type="text"
          placeholder="Search for pizza, barbershop etc"
          className="border rounded-lg px-3 py-2 w-full md:w-1/2"
        />
      </div>

      {/* MINI CALENDAR */}
      <div className="flex justify-center gap-2 mb-8">
        {days.map((d) => {
          const isSelected =
            d.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={d.toDateString()}
              onClick={() => handleDateClick(d)}
              className={`rounded-md border px-3 py-2 text-center text-sm font-medium ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <div>{d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}</div>
              <div>{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
            </button>
          );
        })}
      </div>

      {/* DEAL LIST */}
      {deals.length > 0 ? (
        <div className="space-y-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-sm border border-gray-200 p-4 gap-4"
            >
              {/* IMAGE */}
              {deal.image_url && (
                <div className="relative w-full md:w-40 h-32 rounded-md overflow-hidden">
                  <Image
                    src={deal.image_url}
                    alt={deal.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* TEXT */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold">{deal.title}</h3>

                {/* 🔸 Bold Offer Line */}
                {deal.description && (
                  <p className="font-bold text-orange-600 mt-1">
                    {deal.description.replace(/\*\*/g, "")}
                  </p>
                )}

                {/* Rating */}
                <div className="flex justify-center md:justify-start items-center mt-1">
                  {"⭐".repeat(Math.round(deal.rating ?? 4))}
                </div>

                {/* Address / Hours */}
                <p className="text-sm text-slate-600 mt-1">
                  {deal.address ?? ""}{" "}
                  {deal.start_date
                    ? ` | ${new Date(deal.start_date).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })} - ${new Date(
                        deal.end_date ?? deal.start_date
                      ).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}`
                    : ""}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2 items-center">
                <Link
                  href={deal.vendor?.website ?? "#"}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition"
                >
                  View Deal
                </Link>
                <button className="text-sm text-gray-600 hover:text-orange-600">
                  Share this deal
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 italic mt-10">
          No deals yet. Check other days.
        </p>
      )}

      {/* 🧡 BEHIND THE HUSTLE FOOTER */}
      <div className="bg-black text-white mt-16 rounded-2xl p-6 md:p-8 shadow-md">
        <h3 className="text-orange-500 font-bold text-lg mb-3">
          Behind the Hustle
        </h3>
        <p className="text-sm leading-relaxed">
          <strong>Local Deals 24/7</strong> exists for small business owners —
          the barbers, the pizza shops, the nail techs, the chiropractors, the
          people who keep your city alive. We help them get attention without
          paying crazy ad money.
        </p>
        <p className="text-sm mt-4">
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Meet the Local Heroes
          </Link>{" "}
          keeping this city alive.
        </p>
      </div>
    </main>
  );
}
