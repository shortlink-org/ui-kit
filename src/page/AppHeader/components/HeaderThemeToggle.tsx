import React from 'react'
import { ToggleDarkMode } from '../../../ui/ToggleDarkMode/ToggleDarkMode'

interface HeaderThemeToggleProps {
  themeToggleComponent?: React.ReactNode
}

export function HeaderThemeToggle({ themeToggleComponent }: HeaderThemeToggleProps) {
  return (
    <div className="hidden sm:block relative mr-2">
      {themeToggleComponent || (
        <ToggleDarkMode
          ariaLabel="Toggle dark mode"
          defaultChecked={false}
          onChange={(checked) => {
            // This will be handled by next-themes or your theme provider
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('theme-toggle', { detail: { checked } })
              window.dispatchEvent(event)
            }
          }}
        />
      )}
    </div>
  )
}

