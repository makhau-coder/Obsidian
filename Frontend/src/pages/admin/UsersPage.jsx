import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/admin.api.js";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getAllUsers();
      if (result.success) {
        setUsers(result.users);
        console.log("Immediate users array:", result.users);
      } else {
        console.error("Backend returned success: false");
      }
    })();
  }, []);

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
