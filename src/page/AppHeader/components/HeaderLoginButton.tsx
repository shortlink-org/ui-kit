import clsx from 'clsx'

interface HeaderLoginButtonProps {
  label?: string
  href?: string
  onClick?: () => void
}

export function HeaderLoginButton({
  label = 'Log in',
  href,
  onClick,
}: HeaderLoginButtonProps) {
  const className = clsx(
    'focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
    'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
    'hover:bg-[var(--color-muted)] transition-colors duration-200',
  )

  if (href && !onClick) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {label}
    </button>
  )
}
