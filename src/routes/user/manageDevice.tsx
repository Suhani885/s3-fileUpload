import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/manageDevice')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/manageDevice"!</div>
}
