import { Link } from "@tanstack/react-router";
import PageHeader from "../../components/common/PageHeader.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import { currentUser } from "../../data/mock.js";

export default function ProfilePage() {
  return (
    <div className="page-container py-8">
      <PageHeader title="My profile" subtitle={"Member since " + currentUser.created_at} />
      <div className="card max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold">
            AC
          </span>
          <div>
            <p className="text-lg font-semibold">
              {currentUser.user_firstname} {currentUser.user_lastname}
            </p>
            <p className="text-sm text-muted-foreground">{currentUser.user_role}</p>
          </div>
        </div>
        <UserForm user={currentUser} />
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
