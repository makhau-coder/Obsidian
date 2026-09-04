import StatusBadge from "../common/StatusBadge.jsx";
import { money } from "../../data/mock.js";

export default function MenuItemCard({ item, actions }) {
  return (
    <div className="card flex flex-col justify-between gap-3">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{item.item_name}</h3>
          <StatusBadge status={item.is_available ? "AVAILABLE" : "UNAVAILABLE"} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{item.item_description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{money(item.item_price)}</span>
        <div className="flex gap-2">{actions}</div>
      </div>
    </div>
  );
}
