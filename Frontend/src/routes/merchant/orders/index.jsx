import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/merchant/OrdersPage.jsx";

export const Route = createFileRoute("/merchant/orders/")({
  component: Page,
});
