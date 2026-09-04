import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import NotFoundPage from "../pages/NotFoundPage.jsx";

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // log error to your own service if needed
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a href="/" className="btn btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
