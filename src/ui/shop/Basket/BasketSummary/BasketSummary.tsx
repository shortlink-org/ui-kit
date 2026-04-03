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

  const checkoutClassName =
    'focus-ring flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800'

  return (
    <div className={clsx('space-y-2.5', className)}>
      <div className="flex min-w-0 items-baseline justify-between gap-3 border-b border-[var(--color-border)] pb-2.5">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Subtotal
        </p>
        <p className="min-w-0 text-right text-xl font-semibold tabular-nums tracking-tight text-[var(--color-foreground)] sm:text-2xl">
          {subtotal}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {shippingNote ? (
          <p className="text-[13px] leading-snug text-[var(--color-muted-foreground)]">
            {shippingNote}
          </p>
        ) : null}

        {checkoutHref ? (
          <a href={checkoutHref} className={checkoutClassName}>
            <LockClosedIcon className="size-4 shrink-0" aria-hidden="true" />
            {checkoutText}
            <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <button type="button" onClick={handleCheckout} className={checkoutClassName}>
            <LockClosedIcon className="size-4 shrink-0" aria-hidden="true" />
            {checkoutText}
            <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />
          </button>
        )}

        {onContinueShopping ? (
          <div className="flex justify-start pt-0.5">
            <button
              type="button"
              onClick={onContinueShopping}
              className="cursor-pointer text-sm font-medium text-[var(--color-foreground)] underline-offset-4 hover:text-sky-700 hover:underline"
            >
              {continueShoppingText}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BasketSummary
