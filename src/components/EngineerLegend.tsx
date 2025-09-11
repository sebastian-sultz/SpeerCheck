
export default function EngineerLegend({ items }: { items: { id: string; name: string; color: string }[] }) {
  return (
    <div className="flex gap-3 items-center">
      {items.map(it => (
        <div key={it.id} className="flex items-center gap-2 text-xs">
          <span style={{ background: it.color }} className="w-3 h-3 rounded-full inline-block border" />
          <span>{it.name}</span>
        </div>
      ))}
    </div>
  );
}
