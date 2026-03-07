import * as React from 'react'
import clsx from 'clsx'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface CollapsibleMenuProps {
  mode: 'full' | 'mini'
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
}

const CollapsibleMenu = ({
  mode,
  icon: Icon,
  title,
  children,
  collapsed,
  onCollapseChange,
}: CollapsibleMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(
    collapsed === undefined ? mode !== 'mini' : !collapsed,
  )

  React.useEffect(() => {
    if (collapsed !== undefined) {
      setIsOpen(!collapsed)
    }
  }, [collapsed])

  const itemCount = React.Children.toArray(children).length

  const handleToggle = () => {
    setIsOpen((previous) => {
      const nextOpen = !previous
      onCollapseChange?.(!nextOpen)
      return nextOpen
    })
  }

  return (
    <li className="w-full list-none">
      <div
        className={clsx(
          'rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/75 p-1.5 backdrop-blur-sm transition-colors duration-200',
          isOpen &&
            'border-sky-200/70 bg-[color-mix(in_srgb,var(--color-surface)_90%,rgb(14_165_233)_10%)] dark:border-sky-400/20',
          mode === 'mini' &&
            clsx(
              'overflow-visible rounded-[1.15rem] border-transparent bg-transparent px-0 py-0 backdrop-blur-none',
              isOpen &&
                'border-transparent bg-transparent px-0 py-0 shadow-none',
            ),
          mode === 'full' && 'overflow-hidden',
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={mode === 'mini' ? title : undefined}
          className={clsx(
            'focus-ring group relative flex w-full cursor-pointer items-center rounded-[0.95rem] text-left transition-all duration-200',
            mode === 'mini'
              ? clsx(
                  'justify-center px-0 py-1.5',
                  isOpen
                    ? 'border border-sky-200/70 bg-white text-sky-700 shadow-[0_14px_30px_-24px_rgba(14,165,233,0.28)] ring-1 ring-sky-100/80 dark:border-sky-400/25 dark:bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] dark:text-sky-300 dark:ring-sky-400/10'
                    : 'border border-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)]/80 hover:bg-white/80 hover:text-[var(--color-foreground)]',
                )
              : 'gap-3 px-3 py-3 hover:bg-[var(--color-surface)]/80',
          )}
        >
          <span
            className={clsx(
              'inline-flex items-center justify-center rounded-[0.9rem] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200',
              mode === 'mini' ? 'size-10' : 'size-10',
              isOpen &&
                mode === 'full' &&
                'bg-sky-500/10 text-sky-700 dark:text-sky-300',
              mode === 'mini' && 'bg-transparent',
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>

          {mode === 'mini' ? (
            <>
              {isOpen ? (
                <span
                  className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-sky-500"
                  aria-hidden="true"
                />
              ) : null}
              <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2">
                <span className="relative block translate-x-1 whitespace-nowrap rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] text-slate-900 opacity-0 shadow-[0_16px_36px_-22px_rgba(15,23,42,0.28)] ring-1 ring-slate-950/5 transition-[opacity,transform] duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:ring-white/10">
                  <span
                    className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l border-slate-200/90 bg-white dark:border-slate-700 dark:bg-slate-900"
                    aria-hidden="true"
                  />
                  {title}
                </span>
              </span>
            </>
          ) : null}

          {mode === 'full' ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
                  {title}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                  {itemCount} items
                </p>
              </div>

              <ChevronDownIcon
                className={clsx(
                  'size-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200',
                  isOpen && 'rotate-180 text-[var(--color-foreground)]',
                )}
                aria-hidden="true"
              />
            </>
          ) : null}
        </button>

        <div
          className="grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            opacity: isOpen ? 1 : 0.48,
            marginTop: isOpen && mode === 'full' ? '0.4rem' : '0',
          }}
        >
          <div className="overflow-hidden">
            <ul
              className={clsx(
                'space-y-2',
                mode === 'mini'
                  ? 'space-y-1.5 px-0 pb-0 pt-1.5'
                  : 'border-t border-[var(--color-border)]/80 px-1 pb-1 pt-3',
              )}
              role="group"
            >
              {children}
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CollapsibleMenu
