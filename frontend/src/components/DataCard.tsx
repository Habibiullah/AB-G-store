export default function DataCard({ title, value, hint }: {title:string, value:string|number, hint?:string}) {
  return (
    <div className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition-all">
      <div className="text-sm text-brand-800/70">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-brand-800">{value}</div>
      {hint && <div className="text-xs mt-1 text-brand-800/60">{hint}</div>}
    </div>
  )
}