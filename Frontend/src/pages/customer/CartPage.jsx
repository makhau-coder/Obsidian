import { Link } from "react-router-dom";
import BackLink from "../../components/common/BackLink.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { cartItems, money } from "../../data/mock.js";

export default function CartPage() {
  const total = cartItems.reduce((sum, i) => sum + i.item_price * i.quantity, 0);

  return (
    <div className="page-container py-8">
      <BackLink to="/customer/home">Back to restaurants</BackLink>
      <PageHeader title="Your cart" subtitle="From Spice Bowl, Bandra West" />
      <div className="card">
        <table className="table-basic">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th className="text-right">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_name}</td>
                <td>
                  <div className="inline-flex items-center gap-3 rounded-md border px-2 py-1">
                    <button>−</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                </td>
                <td>{money(item.item_price)}</td>
                <td className="text-right">{money(item.item_price * item.quantity)}</td>
                <td className="text-right">
                  <button className="text-sm" style={{ color: "var(--danger)" }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total payable</span>
          <span className="text-2xl font-semibold">{money(total)}</span>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Link to="/customer/home" className="btn btn-ghost">Add more items</Link>
          <button className="btn btn-primary">Place order</button>
        </div>
      </div>
    </div>
  );
}
