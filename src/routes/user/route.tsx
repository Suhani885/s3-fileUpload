import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/user')({
  component: userComponent,
})

function userComponent() {

  return (

    // navbar and authentication here


    <div className="min-h-screen min-w-screen flex flex-col">
      <h1 className='w-full bg-slate-700 h-14'>Navbar</h1>
      <div className='flex-1 bg-[#CBEEF3] p-4'>
        <Outlet />
      </div>

    </div>
  )

}
