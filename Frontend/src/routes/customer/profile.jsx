import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/customer/ProfilePage.jsx";

export const Route = createFileRoute("/customer/profile")({
  component: Page,
});
