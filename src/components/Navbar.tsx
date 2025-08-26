import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Nav() {
  return (
    <Disclosure as="nav" className="relative bg-[#344e41] shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#1d3557] focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Login Management"
                src="https://plus.unsplash.com/premium_photo-1677252438425-e4125f74fbbe?w=900&auto=format&fit=crop&q=60"
                className="h-9 w-auto rounded-full shadow-sm"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/user"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#1d3557] transition"
                >
                  Dashboard
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-white hover:bg-[#1d3557] focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                  alt="User"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full border border-white shadow-sm"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/10 focus:outline-none animate-fade-in"
              >
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="/user/manageDevice"
                      className={`block px-4 py-2 text-sm ${
                        active ? 'bg-white text-[#1d3557]' : 'text-gray-700'
                      }`}
                    >
                      Manage devices
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        active ? 'bg-white text-[#1d3557]' : 'text-gray-700'
                      }`}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            as="a"
            href="/user"
            className="block rounded-md bg-[#1d3557] px-3 py-2 text-base font-medium text-white hover:bg-[#344e41] transition"
          >
            Dashboard
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
