import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { managerLoginRetrieve } from "~/services/api";
import { AuthProvider, useAuth } from "~/utils/Context/Auth";
export const Route = createFileRoute("/user")({
  component: userComponent,
});

function userComponent() {
  const user = useAuth();

  const navigate = useNavigate();
  const auth = async () => {
    const user = await managerLoginRetrieve();
    if (user.status != 200) {
      navigate({ to: "/" });
    }
  };

  useEffect(() => {
    auth();
  }, []);
  // if (user?.isAuthenticated) {
  //   console.log(user.isAuthenticated);
  // }

  // if (!user?.user) return <Navigate to="/" />;

  return (
    // navbar and authentication here
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex w-screen bg-black">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
