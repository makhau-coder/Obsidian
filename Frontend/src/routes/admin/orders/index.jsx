import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/OrdersPage.jsx";

export const Route = createFileRoute("/admin/orders/")({
  component: Page,
});
