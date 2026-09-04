import { Outlet } from "@tanstack/react-router";
import Brand from "../components/common/Brand.jsx";

export default function AuthLayout() {
  return (
    <div className="auth-bg flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <Brand />
          <p className="mt-2 text-sm text-muted-foreground">Good food, ordered simply.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
