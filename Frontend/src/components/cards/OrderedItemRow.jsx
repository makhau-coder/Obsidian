import { money } from "../../data/mock.js";

export default function OrderedItemRow({ row }) {
  return (
    <tr>
      <td>{row.item_name}</td>
      <td>{row.item_quantity}</td>
      <td>{money(Math.round(row.item_amount / row.item_quantity))}</td>
      <td className="text-right">{money(row.item_amount)}</td>
    </tr>
  );
}
