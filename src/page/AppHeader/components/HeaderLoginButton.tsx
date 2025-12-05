import React from 'react'
import clsx from 'clsx'

interface HeaderLoginButtonProps {
  label?: string
  onClick?: () => void
}

export function HeaderLoginButton({ label = 'Log in', onClick }: HeaderLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-4 py-2 text-sm font-medium rounded-md',
        'border border-white text-white',
        'hover:bg-white/10 transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-white/50'
      )}
    >
      {label}
    </button>
  )
}

