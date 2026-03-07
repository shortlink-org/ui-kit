import * as React from 'react'
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Drawer } from '../../Drawer/Drawer'
import type { DrawerProps } from '../../Drawer/Drawer'
import { BasketItem } from './BasketItem/BasketItem'
import type { BasketItem as BasketItemData } from './BasketItem/BasketItem'
import { BasketSummary } from './BasketSummary/BasketSummary'
import { clsx } from 'clsx'
import { FamilyDialog } from '../../FamilyDialog/FamilyDialog'

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
  /** Callback when all items are removed */
  onClearBasket?: () => void
  /** Callback when quantity changes */
  onQuantityChange?: (itemId: number | string, quantity: number) => void
  /** Clear basket button text */
  clearBasketText?: string
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
  onClearBasket,
  onQuantityChange,
  clearBasketText = 'Clear cart',
  emptyMessage,
  itemsClassName,
  position,
  size,
  ...drawerProps
}: BasketProps) {
  const effectivePosition = position ?? 'bottom'
  const effectiveSize =
    size ?? (effectivePosition === 'bottom' ? 'full' : 'md')
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

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
      contentClassName="!px-0 !pb-0 !pt-0"
      panelClassName={clsx(
        effectivePosition === 'bottom' && 'rounded-t-[2rem]',
        drawerProps.panelClassName,
      )}
    >
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[var(--color-background)]">
        <div className="relative flex flex-shrink-0 items-start justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)]">
                <ShoppingBagIcon className="size-4" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--color-foreground)] sm:text-xl">
                  Cart
                </h2>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            {items.length > 1 && onClearBasket ? (
              <div className="mt-3">
                <FamilyDialog
                  trigger={clearBasketText}
                  eyebrow="Bulk cart action"
                  title="Clear basket?"
                  description="This removes every item from the current cart. Saved and recommended products stay available in the storefront."
                  confirmText="Remove all items"
                  cancelText="Keep basket"
                  variant="danger"
                  onConfirm={onClearBasket}
                  triggerClassName="!rounded-none !border-0 !bg-transparent !px-0 !py-0 !text-xs !font-semibold !uppercase !tracking-[0.18em] !text-rose-600 !shadow-none hover:!text-rose-500"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.2rem] border border-rose-200/70 bg-white/80 p-4 text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700">
                        Products
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        {items.length}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-slate-200/80 bg-white/80 p-4 text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Units
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        {itemCount}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-slate-200/80 bg-slate-950 p-4 text-left text-slate-50">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200">
                        Subtotal
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {subtotal}
                      </p>
                    </div>
                  </div>
                </FamilyDialog>
              </div>
            ) : null}
          </div>

          <div className="ml-3 flex h-10 items-center">
            <button
              type="button"
              onClick={() => drawerProps.onClose?.(false)}
              className="focus-ring relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-14 text-center">
              {emptyMessage || (
                <>
                  <svg
                    className="mx-auto size-12 text-[var(--color-muted-foreground)]"
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
                  <h3 className="mt-4 text-lg font-semibold text-[var(--color-foreground)]">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted-foreground)]">
                    Start adding items to your cart.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div>
              <ul
                role="list"
                className={clsx(
                  'space-y-3',
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
          <div className="flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-6">
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
