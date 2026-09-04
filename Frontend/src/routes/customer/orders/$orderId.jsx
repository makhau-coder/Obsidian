import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/customer/OrderDetailPage.jsx";

export const Route = createFileRoute("/customer/orders/$orderId")({
  component: Page,
});
