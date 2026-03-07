import { Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface SidebarMenuButtonProps {
  onClick?: () => void
  disabled?: boolean
  hasNavigation?: boolean
}

export function SidebarMenuButton({
  onClick,
  disabled = false,
  hasNavigation = false,
}: SidebarMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Toggle sidebar menu"
      className={clsx(
        'focus-ring rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-muted-foreground)] transition-all duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:scale-105 active:scale-95',
        hasNavigation && 'hidden sm:block',
      )}
    >
      <Bars3Icon className="size-6" />
    </button>
  )
}
