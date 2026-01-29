import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AppHeaderProfile, AppHeaderProfileMenuItem } from '../types'
import { FamilyDialog } from '../../../ui/FamilyDialog/FamilyDialog'

interface HeaderProfileProps {
  profile: AppHeaderProfile
}

function ProfileMenuItem({ menuItem }: { menuItem: AppHeaderProfileMenuItem }) {
  // If the item has a confirmation dialog, wrap it in FamilyDialog
  if (menuItem.confirmDialog && menuItem.onClick) {
    return (
      <FamilyDialog
        trigger={menuItem.name}
        title={menuItem.confirmDialog.title}
        description={menuItem.confirmDialog.description}
        confirmText={menuItem.confirmDialog.confirmText || menuItem.name}
        cancelText={menuItem.confirmDialog.cancelText || 'Cancel'}
        variant={menuItem.confirmDialog.variant || 'danger'}
        onConfirm={menuItem.onClick}
        triggerClassName="!bg-transparent !text-gray-700 dark:!text-gray-300 !p-0 !rounded-none !font-normal w-full text-left px-4 py-2 text-sm hover:!bg-gray-100 dark:hover:!bg-gray-700"
      />
    )
  }

  // Regular menu item with link
  if (menuItem.href) {
    return (
      <a
        href={menuItem.href}
        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
      >
        {menuItem.name}
      </a>
    )
  }

  // Regular menu item with onClick
  return (
    <button
      onClick={menuItem.onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
    >
      {menuItem.name}
    </button>
  )
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
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg outline outline-black/5 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            {profile.menuItems.map((menuItem, index) => (
              <MenuItem key={menuItem.name || index}>
                <ProfileMenuItem menuItem={menuItem} />
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
