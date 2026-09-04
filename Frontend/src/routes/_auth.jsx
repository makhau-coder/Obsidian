import { createFileRoute } from "@tanstack/react-router";
import Layout from "../layouts/AuthLayout.jsx";

export const Route = createFileRoute("/_auth")({ component: Layout });
