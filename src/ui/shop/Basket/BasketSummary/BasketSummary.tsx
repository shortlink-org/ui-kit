import * as React from 'react'
import { clsx } from 'clsx'

export interface BasketSummaryProps {
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
  /** Custom className */
  className?: string
}

export function BasketSummary({
  subtotal,
  shippingNote = 'Shipping and taxes calculated at checkout.',
  checkoutText = 'Checkout',
  checkoutHref,
  onCheckout,
  onContinueShopping,
  continueShoppingText = 'Continue Shopping',
  className,
}: BasketSummaryProps) {
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else if (checkoutHref) {
      window.location.href = checkoutHref
    }
  }

  return (
    <div className={clsx('border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6', className)}>
      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      {shippingNote && (
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{shippingNote}</p>
      )}
      <div className="mt-6">
        {checkoutHref ? (
          <a
            href={checkoutHref}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {checkoutText}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleCheckout}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {checkoutText}
          </button>
        )}
      </div>
      {onContinueShopping && (
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            or{' '}
            <button
              type="button"
              onClick={onContinueShopping}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {continueShoppingText}
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default BasketSummary

