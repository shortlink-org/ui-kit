import React from 'react'
import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import {
  AppHeaderBrand,
  AppHeaderMenuItem,
  AppHeaderNavigationItem,
  AppHeaderNotification,
  AppHeaderProfile,
  AppHeaderSlotClassNames,
  AppHeaderStatusBadge,
  LinkComponent,
} from './types'
import { defaultBrand } from './constants'
import {
  HeaderBrand,
  MobileMenuButton,
  SidebarMenuButton,
  NavigationLinks,
  HeaderThemeToggle,
  HeaderSecondMenu,
  HeaderSearch,
  HeaderNotifications,
  HeaderProfile,
  HeaderLoginButton,
  MobileMenuPanel,
} from './components'

export type {
  AppHeaderBrand,
  AppHeaderMenuItem,
  AppHeaderNavigationItem,
  AppHeaderNotification,
  AppHeaderProfile,
  AppHeaderSlotClassNames,
  AppHeaderStatusBadge,
}

export interface AppHeaderProps {
  /** Custom className */
  className?: string
  /** Brand configuration */
  brand?: AppHeaderBrand
  /** Optional workspace label shown above brand name */
  workspaceLabel?: string
  /** Optional status pill shown near the brand */
  statusBadge?: AppHeaderStatusBadge
  /** Show menu button (for sidebar toggle) */
  showMenuButton?: boolean
  /** Menu button click handler */
  onMenuClick?: () => void
  /** Menu button disabled state */
  menuButtonDisabled?: boolean
  /** Navigation items to display in the center and mobile menu */
  navigation?: AppHeaderNavigationItem[]
  /** Current path for automatic active link detection (will override item.current) */
  currentPath?: string
  /** Show theme toggle */
  showThemeToggle?: boolean
  /** Show second menu (solutions menu) */
  showSecondMenu?: boolean
  /** Second menu items */
  secondMenuItems?: AppHeaderMenuItem[]
  /** Second menu button label */
  secondMenuLabel?: string
  /** Show search form */
  showSearch?: boolean
  /** Search form props */
  searchProps?: {
    placeholder?: string
    onSearch?: (query: string) => void
    defaultQuery?: string
  }
  /** Show notifications */
  showNotifications?: boolean
  /** Notification configuration */
  notifications?: AppHeaderNotification
  /** Show profile */
  showProfile?: boolean
  /** Profile configuration */
  profile?: AppHeaderProfile
  /** Show login button (when not authenticated) */
  showLogin?: boolean
  /** Login button configuration */
  loginButton?: {
    href?: string
    label?: string
    onClick?: () => void
  }
  /** Custom Link component (e.g., Next.js Link) */
  LinkComponent?: LinkComponent
  /** Custom theme toggle component (overrides default ToggleDarkMode) */
  themeToggleComponent?: React.ReactNode
  /** Make header sticky */
  sticky?: boolean
  /** Use the full available width instead of a centered max-width container */
  fullWidth?: boolean
  /** Slot-level className hooks for layout customization */
  slotClassNames?: AppHeaderSlotClassNames
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  className = '',
  brand = defaultBrand,
  workspaceLabel,
  statusBadge,
  showMenuButton = true,
  onMenuClick,
  menuButtonDisabled = false,
  navigation = [],
  currentPath,
  showThemeToggle = true,
  showSecondMenu = false,
  secondMenuItems = [],
  secondMenuLabel = 'Solutions',
  showSearch = true,
  searchProps,
  showNotifications = false,
  notifications,
  showProfile = false,
  profile,
  showLogin = false,
  loginButton,
  LinkComponent,
  themeToggleComponent,
  sticky = false,
  fullWidth = false,
  slotClassNames,
}) => {
  const hasNavigation = navigation.length > 0

  return (
    <nav className={clsx('relative z-40', sticky && 'sticky top-0', className)}>
      <Disclosure>
        {() => (
          <>
            <div className="relative overflow-visible border-b border-[var(--color-border)]/80 bg-[color-mix(in_srgb,var(--color-background)_82%,white_18%)] shadow-[0_16px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-[color-mix(in_srgb,var(--color-background)_88%,black_12%)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                aria-hidden="true"
              >
                <div className="absolute left-[-10%] top-[-120%] h-52 w-52 rounded-full bg-sky-400/16 blur-3xl" />
                <div className="absolute right-[8%] top-[-80%] h-44 w-44 rounded-full bg-amber-300/12 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-400/25 to-transparent dark:via-white/10" />
              </div>

              <div
                className={clsx(
                  fullWidth
                    ? 'w-full px-3 sm:px-4 lg:px-6'
                    : 'mx-auto max-w-7xl px-3 sm:px-4 lg:px-8',
                  slotClassNames?.container,
                )}
              >
                <div
                  className={clsx(
                    'relative flex min-h-[4.5rem] items-center justify-between gap-3 py-3 xl:grid xl:grid-cols-[minmax(0,max-content)_minmax(0,1fr)_max-content] xl:items-center xl:gap-6',
                    slotClassNames?.header,
                  )}
                >
                  {/* Left: Mobile menu button + Menu button + Brand */}
                  <div
                    className={clsx(
                      'flex min-w-0 items-center gap-2 sm:gap-3 xl:pr-2 xl:justify-self-start',
                      slotClassNames?.brandRail,
                    )}
                  >
                    {/* Mobile menu button */}
                    {hasNavigation && <MobileMenuButton />}

                    {/* Sidebar menu button */}
                    {showMenuButton && (
                      <SidebarMenuButton
                        onClick={onMenuClick}
                        disabled={menuButtonDisabled}
                        hasNavigation={hasNavigation}
                      />
                    )}

                    {/* Brand */}
                    <HeaderBrand
                      brand={brand}
                      LinkComponent={LinkComponent}
                      hasNavigation={hasNavigation}
                      workspaceLabel={workspaceLabel}
                      statusBadge={statusBadge}
                    />
                  </div>

                  {/* Center: Navigation links */}
                  <NavigationLinks
                    items={navigation}
                    currentPath={currentPath}
                    LinkComponent={LinkComponent}
                    className={slotClassNames?.navigation}
                  />

                  {/* Right: Controls */}
                  <div
                    className={clsx(
                      'absolute inset-y-0 right-0 z-20 flex min-w-max items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 xl:ml-0 xl:justify-self-end',
                      slotClassNames?.controlsRail,
                    )}
                  >
                    {showThemeToggle && (
                      <HeaderThemeToggle
                        themeToggleComponent={themeToggleComponent}
                        className={slotClassNames?.themeToggle}
                      />
                    )}

                    {showSecondMenu && (
                      <HeaderSecondMenu
                        items={secondMenuItems}
                        label={secondMenuLabel}
                        LinkComponent={LinkComponent}
                      />
                    )}

                    {showSearch && (
                      <HeaderSearch
                        placeholder={searchProps?.placeholder}
                        onSearch={searchProps?.onSearch}
                        defaultQuery={searchProps?.defaultQuery}
                        className={slotClassNames?.search}
                        formClassName={slotClassNames?.searchForm}
                      />
                    )}

                    {showNotifications && notifications && (
                      <HeaderNotifications
                        notifications={notifications}
                        className={slotClassNames?.notifications}
                        buttonClassName={slotClassNames?.notificationsButton}
                      />
                    )}

                    {showProfile && profile && (
                      <HeaderProfile
                        profile={profile}
                        className={slotClassNames?.profile}
                        buttonClassName={slotClassNames?.profileButton}
                      />
                    )}

                    {showLogin && !showProfile && (
                      <HeaderLoginButton
                        href={loginButton?.href}
                        label={loginButton?.label}
                        onClick={loginButton?.onClick}
                        className={slotClassNames?.loginButton}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <MobileMenuPanel
              items={navigation}
              currentPath={currentPath}
              LinkComponent={LinkComponent}
            />
          </>
        )}
      </Disclosure>
    </nav>
  )
}

export default AppHeader
