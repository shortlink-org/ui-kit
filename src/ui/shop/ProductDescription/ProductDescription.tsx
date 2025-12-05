import * as React from 'react'
import { clsx } from 'clsx'

export interface ProductDescriptionProps {
  /** Product description text */
  description?: string
  /** Array of highlight points */
  highlights?: string[]
  /** Additional product details */
  details?: string
  /** Custom className */
  className?: string
}

export function ProductDescription({
  description,
  highlights = [],
  details,
  className,
}: ProductDescriptionProps) {
  return (
    <div className={clsx('py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16 dark:lg:border-gray-700', className)}>
      {/* Description */}
      {description && (
        <div>
          <h3 className="sr-only">Description</h3>
          <div className="space-y-6">
            <p className="text-base text-gray-900 dark:text-gray-100">{description}</p>
          </div>
        </div>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Highlights</h3>
          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              {highlights.map((highlight, index) => (
                <li key={index} className="text-gray-400 dark:text-gray-500">
                  <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Details */}
      {details && (
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Details</h2>
          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">{details}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDescription

