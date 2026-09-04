import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/auth/LoginPage.jsx";

export const Route = createFileRoute("/_auth/login")({
  component: Page,
});
