import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/merchant/ProfilePage.jsx";

export const Route = createFileRoute("/merchant/profile")({
  component: Page,
});
