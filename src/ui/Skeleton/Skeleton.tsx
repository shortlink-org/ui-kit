import * as React from 'react'
import { clsx } from 'clsx'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className for additional styling */
  className?: string
  /** Width of the skeleton element */
  width?: string | number
  /** Height of the skeleton element */
  height?: string | number
  /** Whether to show the skeleton in a circular shape */
  circular?: boolean
  /** Children elements */
  children?: React.ReactNode
}

/**
 * Base Skeleton component for loading states.
 * Provides a pulsing animation effect.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  circular = false,
  children,
  style,
  ...props
}) => {
  const skeletonClasses = clsx(
    'bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse',
    circular && 'rounded-full',
    className,
  )

  const skeletonStyle: React.CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style,
  }

  return (
    <div className={skeletonClasses} style={skeletonStyle} {...props}>
      {children}
    </div>
  )
}

export default Skeleton

