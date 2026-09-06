export default function FormField({ label, name, value, type, options, placeholder }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {options ? (
        <select className="input-field" name={name} defaultValue={value}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          className="input-field"
          name={name}
          type={type || "text"}
          defaultValue={value}
          placeholder={placeholder || label}
        />
      )}
    </div>
  );
}
