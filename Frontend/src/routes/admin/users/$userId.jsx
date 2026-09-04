import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/UserDetailPage.jsx";

export const Route = createFileRoute("/admin/users/$userId")({
  component: Page,
});
