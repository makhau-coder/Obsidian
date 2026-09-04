import { createFileRoute } from "@tanstack/react-router";
import Layout from "../../layouts/MerchantLayout.jsx";

export const Route = createFileRoute("/merchant")({ component: Layout });
