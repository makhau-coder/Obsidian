import { useState } from "react";
import { statuses } from "../../data/mock.js";

export default function OrderForm({ status, onSubmit }) {
  const [selectedStatus, setSelectedStatus] = useState(status);

  return (
    <div className="card max-w-md">
      <h2 className="text-lg font-semibold">Update status</h2>
      <select
        className="input-field mt-3"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button 
        className="btn btn-primary mt-4"
        onClick={() => onSubmit && onSubmit(selectedStatus)}
      >
        Update order
      </button>
    </div>
  );
}
