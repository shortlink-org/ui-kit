import * as React from 'react'
import { clsx } from 'clsx'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type IconPosition = 'left' | 'right' | 'only'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant
  /** Button size */
  size?: ButtonSize
  /** Icon element to display */
  icon?: React.ReactNode
  /** Icon position relative to text */
  iconPosition?: IconPosition
  /** Loading state - shows spinner and disables button */
  loading?: boolean
  /** Custom className for additional styling */
  className?: string
  /** Button content */
  children?: React.ReactNode
  /** Render as a different element (e.g., 'a' for links) */
  as?: React.ElementType
  /** Props to pass when using 'as' prop */
  asProps?: Record<string, any>
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className = '',
  children,
  as: Component = 'button',
  asProps,
  ...props
}: ButtonProps) {
  const isIconOnly = size === 'icon' || iconPosition === 'only' || (!children && icon)
  const effectiveIconPosition = isIconOnly ? 'only' : iconPosition

  const buttonClasses = clsx(
    'btn',
    loading && 'btn-loading',
    className,
  )

  const dataAttributes = {
    'data-variant': variant,
    'data-size': isIconOnly ? 'icon' : size,
    'data-icon': effectiveIconPosition,
    ...(loading && { 'data-loading': 'true' }),
  }

  const spinner = loading && (
    <span className="btn-spinner inline-flex items-center justify-center" aria-hidden="true">
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  )

  const iconElement = icon && !loading && (
    <span className="inline-flex items-center justify-center flex-shrink-0 leading-none" aria-hidden="true">
      {React.isValidElement(icon) && typeof icon === 'object'
        ? React.cloneElement(icon as React.ReactElement, {
            className: clsx(
              'flex-shrink-0 leading-none block',
              size === 'sm' ? '!h-3.5 !w-3.5' : size === 'lg' ? '!h-5 !w-5' : '!h-4 !w-4',
              (icon as any).props?.className,
            ),
            fontSize: size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium',
          } as any)
        : icon}
    </span>
  )

  const content = (
    <>
      {effectiveIconPosition === 'left' && (loading ? spinner : iconElement)}
      {children && <span className="flex items-center">{children}</span>}
      {effectiveIconPosition === 'right' && (loading ? spinner : iconElement)}
      {effectiveIconPosition === 'only' && (loading ? spinner : iconElement)}
    </>
  )

  const isDisabled = disabled || loading

  if (Component === 'button') {
    return (
      <button
        type={props.type || 'button'}
        className={buttonClasses}
        disabled={isDisabled}
        aria-busy={loading}
        {...dataAttributes}
        {...props}
      >
        {content}
      </button>
    )
  }

  return React.createElement(
    Component,
    {
      className: buttonClasses,
      'aria-disabled': isDisabled,
      'aria-busy': loading,
      ...dataAttributes,
      ...asProps,
      ...props,
    },
    content,
  )
}

export default Button

