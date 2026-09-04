import RestroCard from "../../components/cards/RestroCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import { restros } from "../../data/mock.js";

export default function HomePage() {
  return (
    <div className="page-container py-8">
      <PageHeader title="Hungry, Abhay?" subtitle="Kitchens delivering to 400050 right now." />
      <SearchBar
        placeholder="Search restaurants or dishes"
        filters={[{ label: "pincode", options: ["All pincodes", "400050", "560038", "122002"] }]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {restros.map((r) => (
          <RestroCard key={r.restro_id} restro={r} />
        ))}
      </div>
    </div>
  );
}
