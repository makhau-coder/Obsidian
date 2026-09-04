import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/RestroDetailPage.jsx";

export const Route = createFileRoute("/admin/restros/$restroId")({
  component: Page,
});
