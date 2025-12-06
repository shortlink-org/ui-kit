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
        'hover:bg-white/10 active:bg-white/20 transition-all duration-200',
        'rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:scale-105 active:scale-95',
        hasNavigation && 'hidden sm:block',
      )}
    >
      <Bars3Icon className="size-6" />
    </button>
  )
}
