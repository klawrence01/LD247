# LD247 Build Rules (Next.js + Supabase + Vercel)

**Purpose:** keep builds from breaking and stop accidental rewrites of working pages.

---

## 0. Workflow (must follow)
1. **Think / discuss first** – what route, what data, what page name.
2. **Scaffold second** – create a simple page/component that renders with placeholders.
3. **Build right away** – `npm run build` to make sure Next/Vercel accept the shape.
4. **Then connect Supabase / actions / real data.**
5. **Back up before major edits** – copy the current file into `src/_backup/` before changing it.

---

## 1. Routes & Page Shapes

- Dynamic route file names must match the props:
  - `/app/city/[city]/page.tsx` → `({ params: { city: string } })`
  - `/app/city/[city]/[slug]/page.tsx` → `({ params: { city: string; slug: string } })`
  - `/app/vendor/[slug]/coupon/[couponId]/page.tsx` → `({ params: { slug: string; couponId: string } })`
- If unsure, make it loose:

  ```tsx
  export default function Page(...args: any[]) {
    const props = args[0] ?? {};
    const city = props?.params?.city ?? "unknown";
    return <div>{city}</div>;
  }
