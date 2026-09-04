import FormField from "./FormField.jsx";

export default function RestroForm({ restro }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Restaurant name" value={restro.restro_name} />
        <FormField label="Pincode" value={restro.restro_pincode} />
      </div>
      <FormField label="Location" value={restro.restro_location} />
    </div>
  );
}
