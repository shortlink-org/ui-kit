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
    'animate-pulse rounded-lg bg-[linear-gradient(180deg,rgba(226,232,240,0.95),rgba(241,245,249,0.92))] dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.95),rgba(30,41,59,0.92))]',
    circular && 'rounded-full',
    className,
  )

  const skeletonStyle: React.CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
    ...style,
  }

  return (
    <div className={skeletonClasses} style={skeletonStyle} {...props}>
      {children}
    </div>
  )
}

export default Skeleton
