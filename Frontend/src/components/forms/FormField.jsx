export default function FormField({ label, value, type, options, placeholder }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {options ? (
        <select className="input-field" defaultValue={value}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          className="input-field"
          type={type || "text"}
          defaultValue={value}
          placeholder={placeholder || label}
        />
      )}
    </div>
  );
}
