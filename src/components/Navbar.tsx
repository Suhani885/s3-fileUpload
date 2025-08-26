import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure as="nav" className="relative bg-[#1e293b] shadow-lg">
      {({ open: mobileOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {mobileOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href="/" className="flex shrink-0 items-center">
                  <img
                    alt="Login Management"
                    src="https://plus.unsplash.com/premium_photo-1677252438425-e4125f74fbbe?w=900&auto=format&fit=crop&q=60"
                    className="h-9 w-auto rounded-full shadow-md"
                  />
                </a>
                <div className="hidden sm:ml-6 sm:block">
                  <a
                    href="/user"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-[#334155] hover:text-white transition"
                  >
                    Dashboard
                  </a>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-200 hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-xl ring-1 ring-black/10 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/user/manageDevice"
                          className={`block px-4 py-2 text-sm ${
                            active ? "bg-gray-100 text-blue-600" : "text-gray-700"
                          }`}
                        >
                          Manage devices
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setOpen(true)}
                          className={`w-full text-left block px-4 py-2 text-sm ${
                            active ? "bg-gray-100 text-red-600" : "text-red-500"
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <DisclosureButton
                as="a"
                href="/user"
                className="block rounded-md bg-[#334155] px-3 py-2 text-base font-medium text-white hover:bg-[#1e293b] transition"
              >
                Dashboard
              </DisclosureButton>
            </div>
          </DisclosurePanel>

          <Dialog open={open} onClose={setOpen} className="relative z-20">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-500"
                    />
                  </div>
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    Confirm Sign Out
                  </DialogTitle>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Are you sure you want to log out? You’ll need to sign in again
                  to access your dashboard.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </>
      )}
    </Disclosure>
  );
}
