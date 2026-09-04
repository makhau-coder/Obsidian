import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/auth/RegisterPage.jsx";

export const Route = createFileRoute("/_auth/register")({
  component: Page,
});
