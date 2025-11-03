type MediaItem = { type: "image" | "video"; url: string };

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  if (!items?.length) {
    return <div className="text-gray-500 text-sm">No media yet.</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((m, i) => (
        <div
          key={i}
          className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-200"
        >
          {m.type === "image" ? (
            m.url ? (
              // If you have next/image available, you can switch to it
              <img src={m.url} alt={`media-${i}`} className="h-full w-full object-cover" />
            ) : null
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-600">
              Video
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
