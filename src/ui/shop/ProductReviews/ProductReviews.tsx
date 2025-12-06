import { StarIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'

export interface ProductReviewsProps {
  /** Average rating (0-5) */
  average: number
  /** Total number of reviews */
  totalCount: number
  /** Link to reviews page */
  href?: string
  /** Custom className */
  className?: string
}

export function ProductReviews({ average, totalCount, href = '#', className }: ProductReviewsProps) {
  const roundedAverage = Math.round(average * 2) / 2 // Round to nearest 0.5

  return (
    <div className={clsx('mt-6', className)}>
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden="true"
              className={clsx(
                roundedAverage > rating ? 'text-gray-900 dark:text-yellow-400' : 'text-gray-200 dark:text-gray-700',
                'size-5 shrink-0',
              )}
            />
          ))}
        </div>
        <p className="sr-only">{roundedAverage} out of 5 stars</p>
        <a
          href={href}
          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {totalCount} reviews
        </a>
      </div>
    </div>
  )
}

export default ProductReviews

