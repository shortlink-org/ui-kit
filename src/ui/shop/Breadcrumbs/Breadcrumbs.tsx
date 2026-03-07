import * as React from 'react'
import { motion } from 'motion/react'
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

const itemMotion = {
  initial: { opacity: 0, y: 4 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      delay: index * 0.04,
      ease: 'easeOut',
    },
  }),
}

function ChevronSeparator() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center text-slate-300 dark:text-slate-600"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  )
}

export function Breadcrumbs({
  breadcrumbs,
  showHome = true,
  homeHref = '#',
  className,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        'rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.18)] sm:px-5',
        className,
      )}
    >
      <div className="overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2 whitespace-nowrap">
          {showHome ? (
            <>
              <motion.li
                custom={0}
                initial="initial"
                animate="animate"
                variants={itemMotion}
              >
                <a
                  href={homeHref}
                  className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label="Home"
                >
                  <HomeIcon />
                </a>
              </motion.li>
              {breadcrumbs.length > 0 ? (
                <motion.li
                  custom={1}
                  initial="initial"
                  animate="animate"
                  variants={itemMotion}
                >
                  <ChevronSeparator />
                </motion.li>
              ) : null}
            </>
          ) : null}

          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            const motionIndex = index + (showHome ? 2 : 0)

            return (
              <React.Fragment key={breadcrumb.id}>
                <motion.li
                  custom={motionIndex}
                  initial="initial"
                  animate="animate"
                  variants={itemMotion}
                >
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-2 text-sm font-semibold text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {breadcrumb.icon ? (
                        <span className="inline-flex size-4 shrink-0 items-center justify-center text-slate-700 dark:text-slate-300">
                          {breadcrumb.icon}
                        </span>
                      ) : null}
                      <span>{breadcrumb.name}</span>
                    </span>
                  ) : (
                    <a
                      href={breadcrumb.href}
                      className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {breadcrumb.icon ? (
                        <span className="inline-flex size-4 shrink-0 items-center justify-center text-current">
                          {breadcrumb.icon}
                        </span>
                      ) : null}
                      <span>{breadcrumb.name}</span>
                    </a>
                  )}
                </motion.li>

                {!isLast ? (
                  <motion.li
                    custom={motionIndex + 0.5}
                    initial="initial"
                    animate="animate"
                    variants={itemMotion}
                  >
                    <ChevronSeparator />
                  </motion.li>
                ) : null}
              </React.Fragment>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs
