import clsx from 'clsx'

interface HeaderLoginButtonProps {
  label?: string
  href?: string
  onClick?: () => void
  className?: string
}

export function HeaderLoginButton({
  label = 'Log in',
  href,
  onClick,
  className,
}: HeaderLoginButtonProps) {
  const buttonClassName = clsx(
    'focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
    'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
    'hover:bg-[var(--color-muted)] transition-colors duration-200',
    className,
  )

  if (href && !onClick) {
    return (
      <a href={href} className={buttonClassName}>
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClassName}
    >
      {label}
    </button>
  )
}
