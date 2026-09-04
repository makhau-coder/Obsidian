import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/merchant/MenuPage.jsx";

export const Route = createFileRoute("/merchant/menu")({
  component: Page,
});
