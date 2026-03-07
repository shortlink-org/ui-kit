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
    'mx-auto flex w-full overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] shadow-[0_22px_64px_-46px_rgba(15,23,42,0.28)]',
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
      <div className="relative w-[34%] min-w-[120px] bg-[linear-gradient(180deg,rgba(226,232,240,0.92),rgba(241,245,249,0.96))] dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.9),rgba(30,41,59,0.95))]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_60%)] opacity-70 dark:bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_60%)]"
          aria-hidden="true"
        />
      </div>

      {/* Content area */}
      <div className="flex w-[66%] flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton circular className="size-8" />
        </div>

        {/* Title */}
        <Skeleton className="h-4 w-40 max-w-[80%]" />

        {/* Description */}
        <div className="mt-4 space-y-2.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[86%]" />
          <Skeleton className="h-3 w-[62%]" />
        </div>

        {/* Rating stars */}
        <div className="mt-5 flex items-center gap-x-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Price and button area */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
