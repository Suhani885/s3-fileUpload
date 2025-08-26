import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar"
export const Route = createFileRoute("/user")({
  component: userComponent,
});

function userComponent() {
  return (
    // navbar and authentication here

    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-screen ">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
