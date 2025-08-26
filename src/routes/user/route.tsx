import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "~/utils/Context/Auth";

export const Route = createFileRoute("/user")({
  component: userComponent,
});

function userComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
