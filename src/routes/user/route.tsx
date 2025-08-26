import { createFileRoute, Outlet } from "@tanstack/react-router";
import Nav from "~/components/Navbar";

export const Route = createFileRoute("/user")({
  component: userComponent,
});

function userComponent() {
  return (
    // navbar and authentication here

    <div className="min-h-screen min-w-screen flex flex-col">
      <Nav />
      <div className="flex-1 bg-[#CBEEF3] p-4">
        <Outlet />
      </div>
    </div>
  );
}
