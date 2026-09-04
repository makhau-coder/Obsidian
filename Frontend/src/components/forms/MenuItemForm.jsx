import FormField from "./FormField.jsx";

export default function MenuItemForm() {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Item name" value="" />
      <div>
        <label className="field-label">Description</label>
        <textarea className="input-field" rows={3} placeholder="Description" />
      </div>
      <FormField label="Price" value="" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked /> Available
      </label>
    </div>
  );
}
