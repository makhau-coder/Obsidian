import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/merchant/RestroSettingsPage.jsx";

export const Route = createFileRoute("/merchant/restaurant")({
  component: Page,
});
