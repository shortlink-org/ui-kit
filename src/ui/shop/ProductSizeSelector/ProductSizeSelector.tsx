import { RadioGroup, Radio } from '@headlessui/react'
import { clsx } from 'clsx'

export interface ProductSize {
  id?: string | number
  name: string
  inStock: boolean
  description?: string
}

export interface ProductSizeSelectorProps {
  /** Array of available sizes */
  sizes: ProductSize[]
  /** Selected size ID */
  selectedSizeId?: string | number
  /** Callback when size is selected */
  onSizeChange?: (sizeId: string | number) => void
  /** Name attribute for the radio group */
  name?: string
  /** Link to size guide */
  sizeGuideHref?: string
  /** Custom className */
  className?: string
}

export function ProductSizeSelector({
  sizes,
  selectedSizeId,
  onSizeChange,
  name = 'size',
  sizeGuideHref,
  className,
}: ProductSizeSelectorProps) {
  const handleChange = (sizeId: string | number) => {
    onSizeChange?.(sizeId)
  }

  return (
    <div className={clsx('mt-10', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Size
        </h3>
        {sizeGuideHref && (
          <a
            href={sizeGuideHref}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Size guide
          </a>
        )}
      </div>
      <RadioGroup
        value={selectedSizeId ? String(selectedSizeId) : undefined}
        onChange={(value) => handleChange(value)}
        name={name}
        className="mt-4"
        aria-label="Choose a size"
      >
        <div className="grid grid-cols-4 gap-3">
          {sizes.map((size) => {
            const sizeId = size.id ?? size.name
            const sizeIdStr = String(sizeId)
            const isDisabled = !size.inStock

            return (
              <Radio
                key={sizeIdStr}
                value={sizeIdStr}
                disabled={isDisabled}
                className={clsx(
                  'group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3',
                  'data-checked:border-indigo-600 data-checked:bg-indigo-600',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                  'data-disabled:border-gray-400 data-disabled:bg-gray-200 data-disabled:opacity-25',
                  'dark:border-gray-600 dark:bg-gray-800',
                  'dark:data-checked:border-indigo-500 dark:data-checked:bg-indigo-600',
                  'cursor-pointer disabled:cursor-not-allowed',
                )}
                aria-label={size.name}
                aria-describedby={
                  size.description ? `size-desc-${sizeIdStr}` : undefined
                }
              >
                <span
                  className={clsx(
                    'text-sm font-medium uppercase',
                    'data-checked:text-white data-[checked=false]:text-gray-900',
                    'dark:data-[checked=false]:text-gray-100',
                    isDisabled && 'opacity-50',
                  )}
                >
                  {size.name}
                </span>
                {size.description && (
                  <span id={`size-desc-${sizeIdStr}`} className="sr-only">
                    {size.description}
                  </span>
                )}
              </Radio>
            )
          })}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ProductSizeSelector
