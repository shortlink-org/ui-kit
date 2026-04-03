import React from 'react'
import clsx from 'clsx'
import { ToggleDarkMode } from '../../../ui/ToggleDarkMode/ToggleDarkMode'

interface HeaderThemeToggleProps {
  themeToggleComponent?: React.ReactNode
  className?: string
}

export function HeaderThemeToggle({
  themeToggleComponent,
  className,
}: HeaderThemeToggleProps) {
  if (themeToggleComponent) {
    return (
      <div
        className={clsx(
          'relative mr-1 hidden shrink-0 overflow-visible sm:flex sm:items-center',
          className,
        )}
      >
        {themeToggleComponent}
      </div>
    )
  }

  /* Track is 90×50px in CSS; old 72px + overflow:hidden clipped custom slots and shadows */
  return (
    <div className={clsx('relative mr-1 hidden shrink-0 sm:block', className)}>
      <div className="flex w-[90px] min-h-[50px] items-center justify-center overflow-visible rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-0.5 py-0.5">
        <div className="origin-center scale-[0.8]">
          <ToggleDarkMode
            ariaLabel="Toggle dark mode"
            defaultChecked={false}
            onChange={(checked) => {
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('theme-toggle', {
                  detail: { checked },
                })
                window.dispatchEvent(event)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
