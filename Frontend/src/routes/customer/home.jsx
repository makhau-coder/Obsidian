import { createFileRoute } from "@tanstack/react-router";
import Page from "../../pages/customer/HomePage.jsx";

export const Route = createFileRoute("/customer/home")({
  component: Page,
});
