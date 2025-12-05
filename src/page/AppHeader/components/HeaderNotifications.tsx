import React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { AppHeaderNotification } from '../types'

interface HeaderNotificationsProps {
  notifications: AppHeaderNotification
}

export function HeaderNotifications({ notifications }: HeaderNotificationsProps) {
  if (notifications.render) {
    return (
      <div className="relative">
        {notifications.render({ count: notifications.count, items: notifications.items })}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="relative rounded-full p-1 text-white/70 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white/50"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="size-6" />
        {notifications.count !== undefined && notifications.count > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-indigo-600" />
        )}
      </button>
    </div>
  )
}

