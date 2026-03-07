import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  BellIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AppHeaderNotification } from '../types'

interface HeaderNotificationsProps {
  notifications: AppHeaderNotification
}

function NotificationRow({
  item,
}: {
  item: NonNullable<AppHeaderNotification['items']>[number]
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-[1rem] border border-transparent px-3 py-3 transition-colors duration-200 hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]">
      <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-muted)]">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.title}
            className="size-full object-cover"
          />
        ) : (
          <BellIcon className="size-5 text-[var(--color-muted-foreground)]" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            {item.title}
          </p>
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
            {item.time}
          </span>
        </div>

        <p className="mt-1 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {item.message}
        </p>
      </div>
    </div>
  )

  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className="block w-full text-left">
        {content}
      </button>
    )
  }

  return content
}

export function HeaderNotifications({
  notifications,
}: HeaderNotificationsProps) {
  if (notifications.render) {
    return (
      <div className="relative">
        {notifications.render({
          count: notifications.count,
          items: notifications.items,
        })}
      </div>
    )
  }

  const items = notifications.items ?? []
  const hasItems = items.length > 0

  return (
    <div className="relative z-20">
      <Menu as="div" className="relative z-20">
        <MenuButton
          type="button"
          className="focus-ring relative inline-flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-5" />
          {notifications.count !== undefined && notifications.count > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white shadow-sm">
              {notifications.count > 9 ? '9+' : notifications.count}
            </span>
          ) : null}
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-50 mt-3 w-[22rem] origin-top-right rounded-[1.35rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] p-2 shadow-[0_28px_70px_-36px_rgba(15,23,42,0.5)] outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
        >
          <div className="overflow-hidden rounded-[1.05rem] border border-[var(--color-border)] bg-[var(--color-background)]/75">
            <div className="border-b border-[var(--color-border)] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                    Inbox
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">
                    Notifications
                  </p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                  {notifications.count ?? items.length}
                </span>
              </div>
            </div>

            {hasItems ? (
              <div className="max-h-[22rem] space-y-1 overflow-y-auto p-2">
                {items.map((item) => (
                  <MenuItem key={item.id}>
                    <NotificationRow item={item} />
                  </MenuItem>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                  <BellIcon className="size-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--color-foreground)]">
                  No new notifications
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                  Activity updates, alerts and team signals will appear here.
                </p>
              </div>
            )}

            {notifications.seeAllHref ? (
              <div className="border-t border-[var(--color-border)] p-2">
                <a
                  href={notifications.seeAllHref}
                  className={clsx(
                    'flex items-center justify-between rounded-[0.95rem] px-3 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]',
                  )}
                >
                  <span>View all notifications</span>
                  <ChevronRightIcon className="size-4 text-[var(--color-muted-foreground)]" />
                </a>
              </div>
            ) : null}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}
