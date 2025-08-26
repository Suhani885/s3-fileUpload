import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LoginComponent,
});

function LoginComponent() {
  return <div className="w-screen h-screen">Hello "/login"!</div>;
}
