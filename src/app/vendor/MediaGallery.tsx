"use client";

export default function MediaGallery({ images = [] }: { images?: string[] }) {
  if (!images.length) {
    return (
      <p className="text-xs text-slate-400">
        No images yet. Vendor can upload from dashboard.
      </p>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="w-32 h-24 rounded-2xl overflow-hidden bg-slate-200 flex-shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
