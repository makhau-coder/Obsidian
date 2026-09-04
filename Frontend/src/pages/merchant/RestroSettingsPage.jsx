import PageHeader from "../../components/common/PageHeader.jsx";
import RestroForm from "../../components/forms/RestroForm.jsx";
import { restros } from "../../data/mock.js";

export default function RestroSettingsPage() {
  const restro = restros[0];
  return (
    <div className="page-container py-8">
      <PageHeader title="Restaurant settings" subtitle="How customers see you." />
      <div className="card max-w-2xl">
        <RestroForm restro={restro} />
        <div className="mt-5 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <p>Restaurant ID: {restro.restro_id}</p>
          <p>Created: {restro.created_at}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost">Cancel</button>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  );
}
