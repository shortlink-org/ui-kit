import React, { type ReactNode } from 'react'

export interface AppHeaderBrand {
  /** Brand name/text */
  name: string
  /** Brand logo/icon (ReactNode) */
  logo?: ReactNode
  /** Link to home page */
  href?: string
  /** Custom render function for brand link */
  render?: (props: {
    href: string
    children: ReactNode
    className?: string
  }) => ReactNode
}

export interface AppHeaderMenuItem {
  /** Menu item name */
  name: string
  /** Menu item description */
  description?: string
  /** Link URL */
  href: string
  /** Icon component */
  icon?: ReactNode
}

export interface AppHeaderNavigationItem {
  /** Navigation item name */
  name: string
  /** Link URL */
  href: string
  /** Whether this item is currently active */
  current?: boolean
}

export interface AppHeaderNotification {
  /** Notification count (shows badge) */
  count?: number
  /** Notification items */
  items?: Array<{
    id: string
    title: string
    message: string
    time: string
    avatar?: string
    onClick?: () => void
  }>
  /** "See all" link */
  seeAllHref?: string
  /** Custom render function for notification dropdown */
  render?: (props: {
    count?: number
    items?: AppHeaderNotification['items']
  }) => ReactNode
}

export interface AppHeaderProfile {
  /** User avatar URL */
  avatar?: string
  /** User name */
  name?: string
  /** User email */
  email?: string
  /** Profile menu items */
  menuItems?: Array<{
    name: string
    href?: string
    icon?: string | ReactNode
    onClick?: () => void
  }>
  /** Custom render function for profile dropdown */
  render?: (props: {
    avatar?: string
    name?: string
    email?: string
  }) => ReactNode
}

export interface LinkComponentProps {
  href: string
  children: ReactNode
  className?: string
}

export type LinkComponent = React.ComponentType<LinkComponentProps>
