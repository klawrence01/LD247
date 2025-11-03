type Deal = { id:string; vendor:string; title:string; dayOffset:number; city:string; };
const today = new Date();
function plusDays(n:number){ const d=new Date(today); d.setDate(d.getDate()+n); return d; }
function fmt(d:Date){ return d.toLocaleDateString(undefined,{weekday:"short", month:"short", day:"numeric"}); }

const deals: Deal[] = [
  { id:"deal1", vendor:"Tony’s Pizza", title:"Buy 1 Get 1 Slice", dayOffset:0, city:"atlanta" },
  { id:"deal2", vendor:"ChiroCare ATL", title:"$29 Intro Adjustment", dayOffset:1, city:"atlanta" },
  { id:"deal3", vendor:"Cafe Sunrise", title:"Free Muffin w/ Coffee", dayOffset:2, city:"atlanta" },
  { id:"deal4", vendor:"Auto Spa", title:"$10 Off Full Wash", dayOffset:3, city:"atlanta" },
  { id:"deal5", vendor:"Bloom Florist", title:"15% Off Bouquets", dayOffset:4, city:"atlanta" },
  { id:"deal6", vendor:"Flex Gym", title:"Free Day Pass", dayOffset:5, city:"atlanta" },
  { id:"deal7", vendor:"Movie House", title:"$5 Matinee", dayOffset:6, city:"atlanta" },
];

export default function DealsGrid(){
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">This Week’s Deals</h2>
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map(d=>{
          const date = plusDays(d.dayOffset);
          return (
            <div key={d.id} className="rounded-2xl border p-4 bg-white">
              <div className="text-xs text-gray-500">{fmt(date)} • {d.city.toUpperCase()}</div>
              <div className="mt-1 font-semibold">{d.vendor}</div>
              <div className="text-sm text-gray-700">{d.title}</div>
              <a href={`/deal/${d.id}`} className="inline-block mt-3 text-sm underline">View deal</a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
