import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/customer/CartPage.jsx";

export const Route = createFileRoute("/customer/cart")({
  component: Page,
});
