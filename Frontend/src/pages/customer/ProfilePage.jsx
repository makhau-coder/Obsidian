import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/common/PageHeader.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { currentUser as mockUser } from "../../data/mock.js";
import { getUserById } from "../../api/customer.api.js";

export default function ProfilePage() {
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["customerUser", mockUser.user_id],
    queryFn: () => getUserById(mockUser.user_id),
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerErrorPage />;

  const user = userData?.user;

  if (!user) return <ServerErrorPage message="User not found" />;

  const initials = `${user.user_firstname?.[0] || ""}${user.user_lastname?.[0] || ""}`.toUpperCase();

  return (
    <div className="page-container py-8">
      <PageHeader title="My profile" subtitle={"Member since " + new Date(user.created_at).toLocaleDateString()} />
      <div className="card max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold">
            {initials}
          </span>
          <div>
            <p className="text-lg font-semibold">
              {user.user_firstname} {user.user_lastname}
            </p>
            <p className="text-sm text-muted-foreground">{user.user_role}</p>
          </div>
        </div>
        <UserForm user={user} />
        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Link to="/login" className="btn btn-danger">Logout</Link>
          <div className="flex gap-3">
            <button className="btn btn-ghost">Cancel</button>
            <button className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
