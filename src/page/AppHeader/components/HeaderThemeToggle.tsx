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
  return (
    <div className={clsx('relative mr-1 hidden w-[72px] shrink-0 sm:block', className)}>
      <div className="flex h-10 w-full items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
        {themeToggleComponent || (
          <div className="relative h-10 w-full shrink-0">
            <div className="absolute left-0 top-0 origin-top-left scale-[0.8]">
              <ToggleDarkMode
                ariaLabel="Toggle dark mode"
                defaultChecked={false}
                onChange={(checked) => {
                  // This will be handled by next-themes or your theme provider
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
        )}
      </div>
    </div>
  )
}
