import { createFileRoute } from "@tanstack/react-router";
import Layout from "../../layouts/CustomerLayout.jsx";

export const Route = createFileRoute("/customer")({ component: Layout });
