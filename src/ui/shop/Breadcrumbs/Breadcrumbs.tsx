import * as React from 'react'
import { clsx } from 'clsx'

export interface Breadcrumb {
  id: number | string
  name: string
  href: string
  icon?: React.ReactNode
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  breadcrumbs: Breadcrumb[]
  /** Show home icon at the start */
  showHome?: boolean
  /** Home href */
  homeHref?: string
  /** Custom className */
  className?: string
}

export function Breadcrumbs({
  breadcrumbs,
  showHome = true,
  homeHref = '#',
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={clsx('bg-gray-200 dark:bg-gray-800', className)}>
      <div className="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
        {showHome && (
          <>
            <a
              href={homeHref}
              className="text-gray-600 dark:text-gray-200 transition-all duration-200 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-110 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            {breadcrumbs.length > 0 && (
              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </>
        )}

        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.id}>
            <a
              href={breadcrumb.href}
              className={clsx(
                'flex items-center text-gray-600 -px-2 dark:text-gray-200 transition-all duration-200',
                'hover:text-gray-900 dark:hover:text-gray-100 hover:underline',
                'hover:translate-x-0.5 active:translate-x-0',
                index === breadcrumbs.length - 1 && 'text-blue-600 dark:text-blue-400'
              )}
            >
              {breadcrumb.icon && <span className="w-6 h-6 mx-2">{breadcrumb.icon}</span>}
              <span className="mx-2">{breadcrumb.name}</span>
            </a>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumbs

