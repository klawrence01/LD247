export function slugToCity(slug: string): string {
  // "hartford-ct" -> ["hartford","ct"] -> "Hartford, CT"
  const parts = slug.split("-");
  if (parts.length < 2) {
    // fallback, just capitalize first word if weird
    return capitalizeWords(slug);
  }

  const state = parts.pop(); // "ct"
  const city = parts.join(" "); // "hartford"

  return `${capitalizeWords(city)}, ${state?.toUpperCase()}`;
}

function capitalizeWords(s: string): string {
  return s
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}
