export function toISODateLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`; // no timezone conversion
}
export function startOfDayLocal(d: Date) {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
}
