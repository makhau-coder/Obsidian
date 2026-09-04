import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/customer/OrdersPage.jsx";

export const Route = createFileRoute("/customer/orders/")({
  component: Page,
});
