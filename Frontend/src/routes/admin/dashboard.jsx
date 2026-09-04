import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/admin/DashboardPage.jsx";

export const Route = createFileRoute("/admin/dashboard")({
  component: Page,
});
