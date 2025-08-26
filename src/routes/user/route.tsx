import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/user')({
  component: userComponent,
})

function userComponent() {

  return (

    // navbar and authentication here


    <div className="">
      <Outlet />
    </div>
  )

}
