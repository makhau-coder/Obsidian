import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/customer/RestroPage.jsx";

export const Route = createFileRoute("/customer/restro/$restroId")({
  component: Page,
});
