import * as React from 'react'
import { clsx } from 'clsx'
import { Skeleton } from './Skeleton'

export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className for additional styling */
  className?: string
  /** Maximum width of the card */
  maxWidth?: string
}

/**
 * Card skeleton component for loading product/card states.
 * Displays a card layout with image placeholder, title, description, rating, and price/button area.
 */
export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  maxWidth = 'md',
  ...props
}) => {
  const containerClasses = clsx(
    'flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800',
    maxWidth === 'sm' && 'max-w-sm',
    maxWidth === 'md' && 'max-w-md',
    maxWidth === 'lg' && 'max-w-lg',
    maxWidth === 'xl' && 'max-w-xl',
    maxWidth === '2xl' && 'max-w-2xl',
    maxWidth === 'full' && 'max-w-full',
    typeof maxWidth === 'string' &&
      !['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(maxWidth) &&
      `max-w-[${maxWidth}]`,
    className,
  )

  return (
    <div className={containerClasses} {...props}>
      {/* Image placeholder */}
      <div className="w-1/3 bg-gray-300 dark:bg-gray-600" />

      {/* Content area */}
      <div className="w-2/3 p-4 md:p-4">
        {/* Title */}
        <Skeleton className="w-40 h-2" />

        {/* Description */}
        <Skeleton className="w-48 h-2 mt-4" />

        {/* Rating stars */}
        <div className="flex mt-4 items-center gap-x-2">
          <Skeleton className="w-5 h-2" />
          <Skeleton className="w-5 h-2" />
          <Skeleton className="w-5 h-2" />
          <Skeleton className="w-5 h-2" />
          <Skeleton className="w-5 h-2" />
        </div>

        {/* Price and button area */}
        <div className="flex justify-between mt-6 items-center">
          <Skeleton className="w-10 h-2" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
