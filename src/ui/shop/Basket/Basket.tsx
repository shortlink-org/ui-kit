import * as React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Drawer } from '../../Drawer/Drawer'
import type { DrawerProps } from '../../Drawer/Drawer'
import { BasketItem } from './BasketItem/BasketItem'
import type { BasketItem as BasketItemData } from './BasketItem/BasketItem'
import { BasketSummary } from './BasketSummary/BasketSummary'
import { clsx } from 'clsx'

export interface BasketProps extends Omit<DrawerProps, 'title' | 'children'> {
  /** Array of items in the basket */
  items: BasketItemData[]
  /** Subtotal amount */
  subtotal: string
  /** Shipping and taxes note */
  shippingNote?: string
  /** Checkout button text */
  checkoutText?: string
  /** Checkout button href */
  checkoutHref?: string
  /** Callback when checkout is clicked */
  onCheckout?: () => void
  /** Callback when continue shopping is clicked */
  onContinueShopping?: () => void
  /** Continue shopping text */
  continueShoppingText?: string
  /** Callback when item is removed */
  onRemoveItem?: (itemId: number | string) => void
  /** Callback when quantity changes */
  onQuantityChange?: (itemId: number | string, quantity: number) => void
  /** Empty basket message */
  emptyMessage?: React.ReactNode
  /** Custom className for the items list */
  itemsClassName?: string
}

export function Basket({
  items,
  subtotal,
  shippingNote,
  checkoutText,
  checkoutHref,
  onCheckout,
  onContinueShopping,
  continueShoppingText,
  onRemoveItem,
  onQuantityChange,
  emptyMessage,
  itemsClassName,
  position,
  size,
  ...drawerProps
}: BasketProps) {
  const effectivePosition = position ?? 'bottom'
  const effectiveSize =
    size ?? (effectivePosition === 'bottom' ? 'full' : 'md')

  const handleContinueShopping = () => {
    onContinueShopping?.()
    drawerProps.onClose?.(false)
  }

  return (
    <Drawer
      {...drawerProps}
      position={effectivePosition}
      size={effectiveSize}
      showCloseButton={false}
      contentScrollable={false}
      panelClassName={clsx(
        effectivePosition === 'bottom' && 'rounded-t-3xl',
        drawerProps.panelClassName,
      )}
    >
      <div className="flex h-full min-h-0 flex-col bg-white dark:bg-gray-900">
        <div className="flex flex-shrink-0 items-start justify-between border-b border-gray-200 py-6 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Shopping cart
          </h2>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={() => drawerProps.onClose?.(false)}
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>

        <div
          className="flex-1 min-h-0 overflow-y-auto py-6"
        >
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12">
              {emptyMessage || (
                <>
                  <svg
                    className="mx-auto size-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Start adding items to your cart.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="flow-root">
              <ul
                role="list"
                className={clsx(
                  '-my-6 divide-y divide-gray-200 dark:divide-gray-700',
                  itemsClassName,
                )}
              >
                {items.map((item) => (
                  <BasketItem
                    key={item.id}
                    item={item}
                    onRemove={onRemoveItem}
                    onQuantityChange={onQuantityChange}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex-shrink-0">
            <BasketSummary
              subtotal={subtotal}
              shippingNote={shippingNote}
              checkoutText={checkoutText}
              checkoutHref={checkoutHref}
              onCheckout={onCheckout}
              onContinueShopping={handleContinueShopping}
              continueShoppingText={continueShoppingText}
              className="px-0 sm:px-0"
            />
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default Basket
