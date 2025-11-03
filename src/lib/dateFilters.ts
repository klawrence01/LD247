// path: src/lib/dateFilters.ts
export type WhenKey = "today" | "tomorrow" | "weekend";

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
export function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function nextSaturday(d: Date) {
  const x = new Date(d);
  const day = x.getDay();
  const delta = (6 - day + 7) % 7;
  x.setDate(x.getDate() + delta);
  return x;
}
function nextSunday(d: Date) {
  const x = new Date(d);
  const day = x.getDay();
  const delta = (7 - day) % 7;
  x.setDate(x.getDate() + delta);
  return x;
}

export function getRangeForWhen(when: WhenKey | undefined, now = new Date()) {
  const key = (when ?? "today") as WhenKey;

  if (key === "today") {
    return { start: startOfDay(now), end: endOfDay(now) };
  }
  if (key === "tomorrow") {
    const t = new Date(now);
    t.setDate(t.getDate() + 1);
    return { start: startOfDay(t), end: endOfDay(t) };
  }
  const sat = nextSaturday(now);
  const sun = endOfDay(nextSunday(sat));
  return { start: startOfDay(sat), end: sun };
}

export function formatISO(d: Date) {
  return d.toISOString();
}

// NEW: next 7 days (today + 6)
export function getNext7Days(now = new Date()) {
  const start = startOfDay(now);
  const end = endOfDay(new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  return { start, end, days };
}
