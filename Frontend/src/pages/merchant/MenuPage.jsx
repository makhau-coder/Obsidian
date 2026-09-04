import MenuItemCard from "../../components/cards/MenuItemCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Modal from "../../components/common/Modal.jsx";
import MenuItemForm from "../../components/forms/MenuItemForm.jsx";
import { menuItems } from "../../data/mock.js";

export default function MenuPage() {
  const items = menuItems.filter((i) => i.restro_id === "res_01");
  return (
    <div className="page-container py-8">
      <PageHeader
        title="Menu"
        subtitle={items.length + " dishes on the board"}
        action={<button className="btn btn-primary">+ Add menu item</button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MenuItemCard
            key={item.item_id}
            item={item}
            actions={
              <>
                <button className="btn btn-ghost">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </>
            }
          />
        ))}
      </div>
      <div className="mt-8">
        <Modal title="Add menu item" confirmLabel="Save item">
          <MenuItemForm />
        </Modal>
      </div>
    </div>
  );
}
