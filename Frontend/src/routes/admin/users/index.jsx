import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/UsersPage.jsx";

export const Route = createFileRoute("/admin/users/")({
  component: Page,
});
