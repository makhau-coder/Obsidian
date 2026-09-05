import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { restros, userName } from "../../data/mock.js";

export default function RestrosPage() {
  return (
    <div className="page-container py-8">
      <PageHeader title="Restaurants" subtitle="Every kitchen listed on the platform." />
      <SearchBar
        placeholder="Search restaurants"
        filters={[{ label: "pincode", options: ["All pincodes", "400050", "560038", "700016"] }]}
      />
      <div className="card">
        <table className="table-basic">
          <thead>
            <tr>
              <th>Restro ID</th><th>Name</th><th>Owner</th><th>Location</th>
              <th>Pincode</th><th>Created</th><th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restros.map((r) => (
              <tr key={r.restro_id}>
                <td>{r.restro_id}</td>
                <td>{r.restro_name}</td>
                <td>{userName(r.restro_owner_id)}</td>
                <td>{r.restro_location}</td>
                <td>{r.restro_pincode}</td>
                <td>{r.created_at}</td>
                <td className="text-right">
                  <Link to={`/admin/restros/${r.restro_id}`} className="btn btn-ghost">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={restros.length} />
      </div>
    </div>
  );
}
