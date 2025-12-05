import React from 'react'
import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import {
  AppHeaderBrand,
  AppHeaderMenuItem,
  AppHeaderNavigationItem,
  AppHeaderNotification,
  AppHeaderProfile,
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
}

export interface AppHeaderProps {
  /** Custom className */
  className?: string
  /** Brand configuration */
  brand?: AppHeaderBrand
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
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  className = '',
  brand = defaultBrand,
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
}) => {
  const hasNavigation = navigation.length > 0

  return (
    <nav className={clsx('relative', className)}>
      <Disclosure>
        {({ open }) => (
          <>
            <div
              className={clsx(
                'bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800',
                'dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-900',
                'text-white shadow-lg border-b border-indigo-500/20 dark:border-purple-500/30',
                'backdrop-blur-sm z-50'
              )}
            >
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="relative flex h-14 sm:h-16 items-center justify-between">
                  {/* Left: Mobile menu button + Menu button + Brand */}
                  <div className="flex items-center gap-2 sm:gap-4">
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
                    <HeaderBrand brand={brand} LinkComponent={LinkComponent} hasNavigation={hasNavigation} />
                  </div>

                  {/* Center: Navigation links */}
                  <NavigationLinks items={navigation} currentPath={currentPath} LinkComponent={LinkComponent} />

                  {/* Right: Controls */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {showThemeToggle && <HeaderThemeToggle themeToggleComponent={themeToggleComponent} />}

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
                      />
                    )}

                    {showNotifications && notifications && (
                      <HeaderNotifications notifications={notifications} />
                    )}

                    {showProfile && profile && <HeaderProfile profile={profile} />}

                    {showLogin && !showProfile && (
                      <HeaderLoginButton label={loginButton?.label} onClick={loginButton?.onClick} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <MobileMenuPanel items={navigation} currentPath={currentPath} />
          </>
        )}
      </Disclosure>
    </nav>
  )
}

export default AppHeader
