import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/common/PageHeader.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUserById } from "../../api/customer.api.js";
import { editUserById } from "../../api/admin.api.js";
import { logout } from "../../api/auth.api.js";

export default function ProfilePage() {
  const { currentUser, clearAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["merchantUser", currentUser?.user_id],
    queryFn: () => getUserById(currentUser.user_id),
    enabled: !!currentUser?.user_id,
    retry: false
  });

  const updateMutation = useMutation({
    mutationFn: (updatedUser) => editUserById(currentUser.user_id, updatedUser),
    onSuccess: () => queryClient.invalidateQueries(["merchantUser", currentUser.user_id]),
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
  if (isError)   return <ServerErrorPage />;

  const user = userData?.user;
  if (!user) return <ServerErrorPage message="User not found" />;

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
      <PageHeader title="My profile" subtitle="Owner account" />
      <div className="card max-w-2xl">
        <form id="merchant-profile-form" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              form="merchant-profile-form"
              className="btn btn-primary"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
