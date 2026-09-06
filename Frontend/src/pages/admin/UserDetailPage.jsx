import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BackLink from "../../components/common/BackLink.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { getUserById, getOrdersByUserId, editUserById } from "../../api/admin.api.js";

export default function UserDetailPage() {
  const { userId } = useParams();

  const { data: userData, isLoading: userLoading, isError: userError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    retry: false
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => getOrdersByUserId(userId),
    retry: false
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedUser) => editUserById(userId, updatedUser || user),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
    },
    retry: false
  });

  if (userLoading || ordersLoading) return <Loader />;
  if (userError) return <ServerErrorPage />;
  
  const user = userData?.user;
  const theirOrders = ordersData?.orders || [];
  
  if (!user) return <ServerErrorPage message="User not found" />;
  
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
       user_firstname: formData.get("user_firstname"),
       user_lastname: formData.get("user_lastname"),
       user_email: formData.get("user_email"),
       user_phone: formData.get("user_phone"),
       user_gender: formData.get("user_gender"),
       user_role: formData.get("user_role") || user?.user_role
    };
    updateMutation.mutate(updatedUser);
  };

  return (
    <div className="page-container py-8">
      <BackLink to="/admin/users">Users</BackLink>
      <PageHeader title={user.user_firstname + " " + user.user_lastname} subtitle={user.userId} />
      <div className="card max-w-3xl">
        <form id="edit-user-form" onSubmit={handleUserUpdate}>
          <UserForm user={user} showRole />
        </form>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" >Cancel</button>
          <button type="submit" form="edit-user-form" className="btn btn-primary">Save changes</button>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Orders placed</h2>
      <div className="flex flex-col gap-3">
        {theirOrders.map((o) => (
          <OrderCard key={o.order_id} order={o} to="/admin/orders/$orderId" />
        ))}
      </div>

      <div className="mt-8">
        <ConfirmDialog
          title="Delete this user?"
          message="This removes the account and all of its orders. This cannot be undone."
        />
      </div>
    </div>
  );
}