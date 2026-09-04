import { createFileRoute } from "@tanstack/react-router";
import Page from "../../../pages/admin/RestrosPage.jsx";

export const Route = createFileRoute("/admin/restros/")({
  component: Page,
});
