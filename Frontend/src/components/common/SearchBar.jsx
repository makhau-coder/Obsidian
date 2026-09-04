export default function SearchBar({ placeholder, filters }) {
  return (
    <div className="card mb-6 flex flex-wrap items-center gap-3">
      <input className="input-field min-w-[220px] flex-1" placeholder={placeholder || "Search..."} />
      {(filters || []).map((f) => (
        <select key={f.label} className="input-field w-auto" defaultValue={f.options[0]}>
          {f.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ))}
      <button className="btn btn-primary">Search</button>
    </div>
  );
}
