import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/LandingPage.jsx";

export const Route = createFileRoute("/")({
  component: Page,
});
