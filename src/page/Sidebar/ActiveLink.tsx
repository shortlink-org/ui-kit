'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, type ReactElement, Children, cloneElement } from 'react'

export type ActiveLinkProps = LinkProps & {
  children: ReactElement
  activeClassName?: string
  activePath?: string
}

/**
 * Next.js UrlObject type for href prop
 * Supports: { pathname: string, query?: Record<string, string | string[]>, hash?: string }
 */
type NextJsUrlObject = {
  pathname: string
  query?: Record<string, string | string[]>
  hash?: string
}

/**
 * Normalizes Next.js href/as to a pathname string
 * Handles both string URLs and UrlObject format from Next.js
 * 
 * @param href - Can be a string path or Next.js UrlObject
 * @returns Normalized pathname string for comparison
 * 
 * @example
 * normalizeHref('/about') // => '/about'
 * normalizeHref({ pathname: '/about', query: { id: '1' } }) // => '/about'
 * normalizeHref({ pathname: '/posts/[id]', query: { id: '123' } }) // => '/posts/[id]'
 */
function normalizeHref(href: LinkProps['href'] | LinkProps['as']): string {
  if (!href) return ''
  
  // If it's already a string, return as is
  if (typeof href === 'string') {
    return href
  }
  
  // If it's a Next.js UrlObject, extract pathname
  if (typeof href === 'object' && href !== null) {
    // Check if it's a Next.js UrlObject with pathname
    if ('pathname' in href && typeof (href as NextJsUrlObject).pathname === 'string') {
      return (href as NextJsUrlObject).pathname
    }
    
    // Handle edge case: empty object or invalid structure
    return ''
  }
  
  return ''
}

/**
 * ActiveLink component that adds active className to child element when current path matches href
 * 
 * Supports Next.js Link href formats:
 * - String: href="/about"
 * - UrlObject: href={{ pathname: '/about', query: { id: '1' } }}
 * 
 * @example
 * <ActiveLink href="/about" activeClassName="active">
 *   <a>About</a>
 * </ActiveLink>
 * 
 * @example
 * <ActiveLink href={{ pathname: '/posts/[id]', query: { id: '123' } }} activeClassName="active">
 *   <a>Post</a>
 * </ActiveLink>
 */
function ActiveLink({ children, activeClassName, activePath, ...props }: ActiveLinkProps) {
  // Use activePath if provided (for Storybook/unit tests), otherwise use Next.js router
  // Note: usePathname hook must be called unconditionally, but we can handle the case
  // where Next.js is not available by checking if it throws or returns null
  let currentPath: string | null = null
  try {
    // usePathname() may throw or return null/undefined outside Next.js context
    const pathname = usePathname()
    currentPath = pathname || null
  } catch {
    // usePathname might not be available outside Next.js context
    currentPath = null
  }
  
  // If activePath is explicitly provided (even if null/empty), use it; otherwise use Next.js router
  const effectivePath = activePath !== undefined ? activePath : currentPath

  const child = Children.only(children) as ReactElement
  const childClassName = (child.props as { className?: string }).className || ''
  const [className, setClassName] = useState(childClassName)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Normalize href to pathname string for comparison
    // Note: In Next.js 16 (App Router), 'as' prop is deprecated, but we support it for backward compatibility
    const hrefValue = normalizeHref(props.as || props.href)
    
    if (!hrefValue || effectivePath === null) {
      setIsActive(false)
      return
    }

    try {
      // Normalize the link pathname
      const linkPathname = new URL(hrefValue, typeof window !== 'undefined' ? window.location.href : 'http://localhost').pathname

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(
        effectivePath || '/',
        typeof window !== 'undefined' ? window.location.href : 'http://localhost',
      ).pathname

      const active = linkPathname === activePathname
      setIsActive(active)
      
      const newClassName = active
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName

      if (newClassName !== className) {
        setClassName(newClassName)
      }
    } catch {
      // Fallback to simple string comparison if URL parsing fails
      const active = hrefValue === effectivePath
      setIsActive(active)
      
      const newClassName = active
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName

      if (newClassName !== className) {
        setClassName(newClassName)
      }
    }
  }, [
    effectivePath,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    className,
  ])

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: className || null,
        'aria-current': isActive ? 'page' : undefined,
      } as { className?: string | null; 'aria-current'?: 'page' | undefined })}
    </Link>
  )
}

export default ActiveLink
