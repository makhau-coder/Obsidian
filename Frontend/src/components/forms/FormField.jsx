export default function FormField({ label, name, value, type, options, placeholder, onChange }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {options ? (
        <select className="input-field" name={name} defaultValue={value} onChange={onChange}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : onChange ? (
        // Controlled mode — used by LoginForm and similar
        <input
          className="input-field"
          name={name}
          type={type || "text"}
          value={value}
          placeholder={placeholder || label}
          onChange={onChange}
        />
      ) : (
        // Uncontrolled mode — used by UserForm / RestroForm with defaultValue
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
