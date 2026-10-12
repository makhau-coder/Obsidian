import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/common/PageHeader.jsx";
import RestroForm from "../../components/forms/RestroForm.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getRestroById, editRestro } from "../../api/restro.api.js";

export default function RestroSettingsPage() {
  const { currentUser } = useAuth();
  const restroId = currentUser?.restro_id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: restroData, isLoading, isError } = useQuery({
    queryKey: ["merchantRestro", restroId],
    queryFn: () => getRestroById(restroId),
    enabled: !!restroId,
    retry: false
  });

  const saveMutation = useMutation({
    mutationFn: (data) => editRestro(restroId, data),
    onSuccess: () => queryClient.invalidateQueries(["merchantRestro", restroId]),
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError)   return <ServerErrorPage />;

  const restro = restroData?.restro;
  if (!restro) return <ServerErrorPage message="Restaurant not found" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    saveMutation.mutate({
      restro_name:     formData.get("restro_name"),
      restro_location: formData.get("restro_location"),
      restro_pincode:  formData.get("restro_pincode"),
    });
  };

  return (
    <div className="page-container py-8">
      <PageHeader title="Restaurant settings" subtitle="How customers see you." />
      <div className="card max-w-2xl">
        <form id="restro-settings-form" onSubmit={handleSubmit}>
          <RestroForm restro={restro} />
        </form>
        <div className="mt-5 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <p>Restaurant ID: {restro.restro_id}</p>
          <p>Created: {restro.created_at}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" type="button" onClick={() => navigate(-1)}>Cancel</button>
          <button
            type="submit"
            form="restro-settings-form"
            className="btn btn-primary"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
