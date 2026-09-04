import { createFileRoute } from "@tanstack/react-router";
import Layout from "../../layouts/AdminLayout.jsx";

export const Route = createFileRoute("/admin")({ component: Layout });
