import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MenuItemCard from "../../components/cards/MenuItemCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Modal from "../../components/common/Modal.jsx";
import MenuItemForm from "../../components/forms/MenuItemForm.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMenuItemsByRestro, deleteMenuItem } from "../../api/restro.api.js";

export default function MenuPage() {
  const { currentUser } = useAuth();
  const restroId = currentUser?.restro_id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["merchantMenu", restroId],
    queryFn: () => getMenuItemsByRestro(restroId),
    enabled: !!restroId,
    retry: false
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId) => deleteMenuItem(itemId),
    onSuccess: () => queryClient.invalidateQueries(["merchantMenu", restroId]),
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerErrorPage />;

  const items = data?.menuItems || [];

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
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMutation.mutate(item.item_id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
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
