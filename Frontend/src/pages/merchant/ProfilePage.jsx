import { Link } from "@tanstack/react-router";
import PageHeader from "../../components/common/PageHeader.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import { users } from "../../data/mock.js";

export default function ProfilePage() {
  const user = users[1];
  return (
    <div className="page-container py-8">
      <PageHeader title="My profile" subtitle="Owner account" />
      <div className="card max-w-2xl">
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
