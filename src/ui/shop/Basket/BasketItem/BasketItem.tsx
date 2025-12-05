import * as React from 'react'
import { clsx } from 'clsx'

export interface BasketItem {
  id: number | string
  name: string
  href: string
  color?: string
  price: string
  quantity: number
  imageSrc: string
  imageAlt: string
}

export interface BasketItemProps {
  /** Product item data */
  item: BasketItem
  /** Callback when item is removed */
  onRemove?: (itemId: number | string) => void
  /** Callback when quantity changes */
  onQuantityChange?: (itemId: number | string, quantity: number) => void
  /** Custom className */
  className?: string
}

export function BasketItem({ item, onRemove, onQuantityChange, className }: BasketItemProps) {
  const handleRemove = () => {
    onRemove?.(item.id)
  }

  return (
    <li className={clsx('flex py-6', className)}>
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
        <img alt={item.imageAlt} src={item.imageSrc} className="size-full object-cover" />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
            <h3>
              <a
                href={item.href}
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {item.name}
              </a>
            </h3>
            <p className="ml-4">{item.price}</p>
          </div>
          {item.color && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.color}</p>
          )}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default BasketItem

