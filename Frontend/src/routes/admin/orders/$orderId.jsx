import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/OrderDetailPage.jsx";

export const Route = createFileRoute("/admin/orders/$orderId")({
  component: Page,
});
