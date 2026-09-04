import { statuses } from "../../data/mock.js";

export default function OrderForm({ status }) {
  return (
    <div className="card max-w-md">
      <h2 className="text-lg font-semibold">Update status</h2>
      <select className="input-field mt-3" defaultValue={status}>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button className="btn btn-primary mt-4">Update order</button>
    </div>
  );
}
