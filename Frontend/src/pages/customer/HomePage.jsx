import { useQuery } from "@tanstack/react-query";
import RestroCard from "../../components/cards/RestroCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { getAllRestros } from "../../api/customer.api.js";
import { currentUser } from "../../data/mock.js";

export default function HomePage() {
  const { data: restrosData, isLoading, isError } = useQuery({
    queryKey: ["customerRestros"],
    queryFn: getAllRestros,
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerErrorPage />;

  const restros = restrosData?.restros || [];

  return (
    <div className="page-container py-8">
      <PageHeader title={`Hungry, ${currentUser.user_firstname}?`} subtitle="Kitchens delivering to you right now." />
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
