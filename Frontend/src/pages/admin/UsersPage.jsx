import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { getAllUsers } from "../../api/admin.api.js";
import { useQuery } from "@tanstack/react-query";

export default function UsersPage() {

  const{data, isLoading, isError, error} = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: false
  })
  if(isLoading) {
    return <Loader/>;
  }
  if(isError) {
    console.log(error);
    return <ServerErrorPage/>
  }

  let users;
  if(data.users) {
    users=[...data.users];
  }
  else {
    users = [];
  }

  return (
    <div className="page-container py-8">
      <PageHeader title="Users" subtitle="Everyone with an Obsidian account." />
      <SearchBar
        placeholder="Search by name or email"
        filters={[{ label: "role", options: ["ALL", "CUSTOMER", "MERCHANT", "ADMIN"] }]}
      />
      <div className="card">
        <table className="table-basic">
          <thead>
            <tr>
              <th>User ID</th><th>Name</th><th>Email</th><th>Role</th>
              <th>Phone</th><th>Joined</th><th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.user_firstname} {u.user_lastname}</td>
                <td>{u.user_email}</td>
                <td><StatusBadge status={u.user_role} /></td>
                <td>{u.user_phone}</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="text-right">
                  <Link to={`/admin/users/${u.user_id}`} className="btn btn-ghost">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={users.length} />
      </div>
    </div>
  );
}
