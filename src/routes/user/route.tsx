import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { useAuth } from "~/utils/Context/Auth";
export const Route = createFileRoute("/user")({
  component: userComponent,
});

function userComponent() {
  const user = useAuth();

  if (!user?.isAuthenticated) return <Navigate to="/" />;

  return (
    // navbar and authentication here

    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-screen bg-black">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
