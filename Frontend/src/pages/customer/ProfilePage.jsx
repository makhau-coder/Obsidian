import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/common/PageHeader.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../../pages/ServerErrorPage.jsx";
import { getUserById } from "../../api/customer.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { editUserById } from "../../api/admin.api.js";
import { logout } from "../../api/auth.api.js";

export default function ProfilePage() {
  const { currentUser, clearAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["customerUser", currentUser?.user_id],
    queryFn: () => getUserById(currentUser.user_id),
    enabled: !!currentUser?.user_id,
    retry: false
  });

  const updateMutation = useMutation({
    mutationFn: (updatedUser) => editUserById(currentUser.user_id, updatedUser),
    onSuccess: () => queryClient.invalidateQueries(["customerUser", currentUser.user_id]),
    retry: false
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      navigate("/login");
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerErrorPage />;

  const user = userData?.user;
  if (!user) return <ServerErrorPage message="User not found" />;

  const initials = `${user.user_firstname?.[0] || ""}${user.user_lastname?.[0] || ""}`.toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateMutation.mutate({
      user_firstname: formData.get("user_firstname"),
      user_lastname:  formData.get("user_lastname"),
      user_email:     formData.get("user_email"),
      user_phone:     formData.get("user_phone"),
      user_gender:    formData.get("user_gender"),
    });
  };

  return (
    <div className="page-container py-8">
      <PageHeader title="My profile" subtitle={"Member since " + new Date(user.created_at).toLocaleDateString()} />
      <div className="card max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold">
            {initials}
          </span>
          <div>
            <p className="text-lg font-semibold">{user.user_firstname} {user.user_lastname}</p>
            <p className="text-sm text-muted-foreground">{user.user_role}</p>
          </div>
        </div>
        <form id="profile-form" onSubmit={handleSubmit}>
          <UserForm user={user} />
        </form>
        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button
            className="btn btn-danger"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out…" : "Logout"}
          </button>
          <div className="flex gap-3">
            <button className="btn btn-ghost" type="button" onClick={() => window.location.reload()}>Cancel</button>
            <button type="submit" form="profile-form" className="btn btn-primary"
              disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
