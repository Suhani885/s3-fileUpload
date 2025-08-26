import { createFileRoute } from "@tanstack/react-router";

const dashboard = () => {
  return <div>dashboard</div>;
};

export const Route = createFileRoute("/dashboard")({
  component: dashboard,
  notFoundComponent: () => <div>Not found</div>,
});
