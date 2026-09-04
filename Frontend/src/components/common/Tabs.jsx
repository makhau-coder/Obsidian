export default function Tabs({ items, active }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item} className={item === active ? "btn btn-primary" : "btn btn-ghost"}>
          {item}
        </button>
      ))}
    </div>
  );
}
