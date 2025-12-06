import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AppHeaderProfile } from '../types'

interface HeaderProfileProps {
  profile: AppHeaderProfile
}

export function HeaderProfile({ profile }: HeaderProfileProps) {
  if (profile.render) {
    return (
      <div className="relative ml-3">
        {profile.render({
          avatar: profile.avatar,
          name: profile.name,
          email: profile.email,
        })}
      </div>
    )
  }

  if (profile.menuItems && profile.menuItems.length > 0) {
    return (
      <div className="relative ml-3">
        <Menu as="div" className="relative">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="size-8 rounded-full bg-white/10 outline outline-1 -outline-offset-1 outline-white/10"
              src={
                profile.avatar ||
                'https://ui-avatars.com/api/?name=User&background=random'
              }
              alt={profile.name || 'User profile'}
            />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            {profile.menuItems.map((menuItem, index) => (
              <MenuItem key={menuItem.name || index}>
                {menuItem.href ? (
                  <a
                    href={menuItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    {menuItem.name}
                  </a>
                ) : (
                  <button
                    onClick={menuItem.onClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    {menuItem.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    )
  }

  return (
    <div className="relative ml-3">
      <span className="sr-only">User profile</span>
      <img
        className="size-8 rounded-full bg-white/10 outline outline-1 -outline-offset-1 outline-white/10"
        src={
          profile.avatar ||
          'https://ui-avatars.com/api/?name=User&background=random'
        }
        alt={profile.name || 'User profile'}
      />
    </div>
  )
}
