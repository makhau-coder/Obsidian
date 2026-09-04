import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/merchant/DashboardPage.jsx";

export const Route = createFileRoute("/merchant/dashboard")({
  component: Page,
});
