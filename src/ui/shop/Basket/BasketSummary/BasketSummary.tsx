import { ArrowRightIcon, LockClosedIcon } from '@heroicons/react/24/outline'
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
    <div
      className={clsx(
        'rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-background)] p-4 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.16)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
            Subtotal
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            {subtotal}
          </p>
        </div>
        <div className="text-right text-xs text-[var(--color-muted-foreground)]">
          <p>Secure checkout</p>
          <p className="mt-1">Taxes calculated next</p>
        </div>
      </div>
      {shippingNote && (
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {shippingNote}
        </p>
      )}
      <div className="mt-4">
        {checkoutHref ? (
          <a
            href={checkoutHref}
            className="focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <LockClosedIcon className="size-4" aria-hidden="true" />
            {checkoutText}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <button
            type="button"
            onClick={handleCheckout}
            className="focus-ring flex w-full cursor-pointer items-center justify-center gap-2 rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <LockClosedIcon className="size-4" aria-hidden="true" />
            {checkoutText}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {onContinueShopping && (
        <div className="mt-3 flex justify-start text-sm text-[var(--color-muted-foreground)]">
          <p>
            <button
              type="button"
              onClick={onContinueShopping}
              className="cursor-pointer font-medium text-[var(--color-foreground)] hover:text-sky-700"
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
