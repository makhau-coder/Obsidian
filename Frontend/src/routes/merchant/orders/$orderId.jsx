import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/merchant/OrderDetailPage.jsx";

export const Route = createFileRoute("/merchant/orders/$orderId")({
  component: Page,
});
