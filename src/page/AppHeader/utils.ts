import { AppHeaderNavigationItem } from './types'

export function classNames(
  ...classes: (string | boolean | undefined)[]
): string {
  return classes.filter(Boolean).join(' ')
}

export function isNavigationItemActive(
  item: AppHeaderNavigationItem,
  currentPath?: string,
): boolean {
  // If item.current is explicitly set, use it
  if (item.current !== undefined) {
    return item.current
  }

  // If currentPath is provided, use it for automatic detection
  if (currentPath) {
    try {
      const itemUrl = new URL(
        item.href,
        typeof window !== 'undefined'
          ? window.location.href
          : 'http://localhost',
      ).pathname
      const currentPathname = new URL(
        currentPath || '/',
        typeof window !== 'undefined'
          ? window.location.href
          : 'http://localhost',
      ).pathname

      return (
        itemUrl === currentPathname || currentPathname.startsWith(itemUrl + '/')
      )
    } catch {
      // Fallback to simple string comparison
      return (
        currentPath === item.href || currentPath.startsWith(item.href + '/')
      )
    }
  }

  // Try to use window.location if available
  if (typeof window !== 'undefined') {
    try {
      const itemUrl = new URL(item.href, window.location.href).pathname
      return (
        window.location.pathname === itemUrl ||
        window.location.pathname.startsWith(itemUrl + '/')
      )
    } catch {
      return (
        window.location.pathname === item.href ||
        window.location.pathname.startsWith(item.href + '/')
      )
    }
  }

  return false
}
