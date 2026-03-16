import * as React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronRightIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AppHeaderProfile, AppHeaderProfileMenuItem } from '../types'
import { FamilyDialog } from '../../../ui/FamilyDialog/FamilyDialog'
import { ProfileIdentity } from '../../../ui/ProfileIdentity/ProfileIdentity'

interface HeaderProfileProps {
  profile: AppHeaderProfile
  className?: string
  buttonClassName?: string
}

function ProfileMenuItem({ menuItem }: { menuItem: AppHeaderProfileMenuItem }) {
  const isDangerAction = menuItem.confirmDialog?.variant === 'danger'
  const toneClassName =
    isDangerAction
      ? 'text-rose-600 dark:text-rose-300'
      : 'text-[var(--color-foreground)]'

  const iconNode =
    menuItem.icon && typeof menuItem.icon !== 'string' ? (
      typeof menuItem.icon === 'function' ? (
        React.createElement(
          menuItem.icon as unknown as React.ComponentType<{
            className?: string
            'aria-hidden'?: boolean
          }>,
          {
            'aria-hidden': true,
            className: 'size-4',
          },
        )
      ) : (
        menuItem.icon
      )
    ) : menuItem.icon ? (
      <span>{menuItem.icon}</span>
    ) : menuItem.name.toLowerCase().includes('billing') ? (
      <CreditCardIcon className="size-4" />
    ) : menuItem.name.toLowerCase().includes('setting') ? (
      <Cog6ToothIcon className="size-4" />
    ) : menuItem.name.toLowerCase().includes('sign out') ? (
      <ArrowRightStartOnRectangleIcon className="size-4" />
    ) : null

  const rowContent = (
    <>
      <span
        className={clsx(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-[0.8rem] border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)]',
          isDangerAction
            ? 'border-rose-200/70 bg-rose-50 text-rose-600 dark:text-rose-300'
            : 'transition-colors duration-200 group-hover:border-slate-300 group-hover:bg-white group-hover:text-[var(--color-foreground)]',
        )}
      >
        {iconNode}
      </span>
      <span className="min-w-0 flex-1 truncate">{menuItem.name}</span>
      <ChevronRightIcon
        className={clsx(
          'size-4 shrink-0 text-[var(--color-muted-foreground)]/80 transition-transform duration-200',
          !isDangerAction && 'group-hover:translate-x-0.5',
        )}
      />
    </>
  )

  // If the item has a confirmation dialog, wrap it in FamilyDialog
  if (menuItem.confirmDialog && menuItem.onClick) {
    return (
      <FamilyDialog
        trigger={
          <span className="flex items-center gap-3">
            {rowContent}
          </span>
        }
        title={menuItem.confirmDialog.title}
        description={menuItem.confirmDialog.description}
        confirmText={menuItem.confirmDialog.confirmText || menuItem.name}
        cancelText={menuItem.confirmDialog.cancelText || 'Cancel'}
        variant={menuItem.confirmDialog.variant || 'danger'}
        onConfirm={menuItem.onClick}
        triggerClassName={clsx(
          '!group !flex !w-full !items-center !gap-3 !rounded-[0.9rem] !border !border-transparent !bg-transparent !px-2.5 !py-2.5 !text-left !text-sm !font-medium !shadow-none',
          isDangerAction
            ? 'hover:!border-rose-200/80 hover:!bg-rose-50/70'
            : 'hover:!border-[var(--color-border)] hover:!bg-[var(--color-muted)]/80',
          toneClassName,
        )}
      />
    )
  }

  // Regular menu item with link
  if (menuItem.href) {
    return (
      <a
        href={menuItem.href}
        className={clsx(
          'group flex items-center gap-3 rounded-[0.9rem] border border-transparent px-2.5 py-2.5 text-sm font-medium transition-colors duration-200 data-focus:bg-[var(--color-muted)]/80 data-focus:outline-hidden',
          'hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]/80',
          toneClassName,
        )}
      >
        {rowContent}
      </a>
    )
  }

  // Regular menu item with onClick
  return (
    <button
      onClick={menuItem.onClick}
      className={clsx(
        'group flex w-full items-center gap-3 rounded-[0.9rem] border border-transparent px-2.5 py-2.5 text-left text-sm font-medium transition-colors duration-200 data-focus:bg-[var(--color-muted)]/80 data-focus:outline-hidden',
        'hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]/80',
        toneClassName,
      )}
    >
      {rowContent}
    </button>
  )
}

export function HeaderProfile({
  profile,
  className,
  buttonClassName,
}: HeaderProfileProps) {
  if (profile.render) {
    return (
      <div className={clsx('relative ml-3', className)}>
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
      <div className={clsx('relative z-20 ml-3', className)}>
        <Menu as="div" className="relative z-20">
          <MenuButton
            className={clsx(
              'focus-ring relative flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1 pl-1 pr-2 transition-[background-color,border-color,box-shadow] duration-200 hover:border-slate-300 hover:bg-[var(--color-muted)]/80 hover:shadow-[0_16px_40px_-32px_rgba(15,23,42,0.22)]',
              buttonClassName,
            )}
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <ProfileIdentity
              avatarSrc={profile.avatar}
              name={profile.name}
              email={profile.email}
              size="sm"
              className="min-w-0"
              detailsClassName="hidden min-w-0 text-left lg:block"
            />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-1.5rem))] origin-top-right rounded-[1.1rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_98%,white)] p-1.5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.36)] outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
          >
            <div className="overflow-hidden rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-background)]/85">
              <div className="border-b border-[var(--color-border)] px-3 py-3">
                <ProfileIdentity
                  avatarSrc={profile.avatar}
                  name={profile.name}
                  email={profile.email}
                  label="Workspace account"
                  size="md"
                  className="min-w-0"
                  detailsClassName="min-w-0"
                  nameClassName="text-base leading-6"
                  emailClassName="text-sm leading-5"
                  labelClassName="whitespace-nowrap tracking-[0.16em]"
                />
              </div>

              <div className="space-y-1 p-1.5">
                {profile.menuItems.map((menuItem, index) => (
                  <MenuItem key={menuItem.name || index}>
                    <ProfileMenuItem menuItem={menuItem} />
                  </MenuItem>
                ))}
              </div>
            </div>
          </MenuItems>
        </Menu>
      </div>
    )
  }

  return (
    <div className={clsx('relative z-20 ml-3', className)}>
      <span className="sr-only">User profile</span>
      <ProfileIdentity
        avatarSrc={profile.avatar}
        name={profile.name}
        email={profile.email}
        size="sm"
        showDetails={false}
        avatarClassName="border border-[var(--color-border)]"
      />
    </div>
  )
}
