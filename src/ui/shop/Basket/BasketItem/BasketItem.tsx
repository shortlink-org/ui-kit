import * as React from 'react'
import { clsx } from 'clsx'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { FamilyDialog } from '../../../FamilyDialog/FamilyDialog'

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
  /** Show confirmation dialog before removing */
  confirmRemove?: boolean
  /** Custom className */
  className?: string
}

export function BasketItem({
  item,
  onRemove,
  onQuantityChange,
  confirmRemove = true,
  className,
}: BasketItemProps) {
  const handleRemove = () => {
    onRemove?.(item.id)
  }

  const handleDecrease = () => {
    if (!onQuantityChange || item.quantity <= 1) {
      return
    }

    onQuantityChange(item.id, item.quantity - 1)
  }

  const handleIncrease = () => {
    onQuantityChange?.(item.id, item.quantity + 1)
  }

  return (
    <li
      className={clsx(
        'rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.24)] sm:p-4',
        className,
      )}
    >
      <div className="flex gap-3">
        <div className="size-20 shrink-0 overflow-hidden rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-muted)] sm:size-24">
          <img
            alt={item.imageAlt}
            src={item.imageSrc}
            className="size-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <a
                href={item.href}
                className="line-clamp-2 cursor-pointer text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:text-sky-700 sm:text-[15px]"
              >
                {item.name}
              </a>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {item.color ? `${item.color} · ` : ''}Qty {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-[var(--color-foreground)]">
                {item.price}
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                unit price
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {onQuantityChange ? (
              <div className="inline-flex items-center rounded-[0.85rem] border border-[var(--color-border)] bg-[var(--color-background)]">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={item.quantity <= 1}
                  className="focus-ring inline-flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  <MinusIcon className="size-4" aria-hidden="true" />
                </button>
                <span className="min-w-10 border-x border-[var(--color-border)] px-3 text-center text-sm font-semibold text-[var(--color-foreground)]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="focus-ring inline-flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  <PlusIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Qty {item.quantity}
              </p>
            )}

            <div className="flex items-center gap-3">
              {confirmRemove ? (
                <FamilyDialog
                  trigger="Remove"
                  eyebrow="Cart update"
                  title="Remove from cart?"
                  description={`Remove "${item.name}" from your cart?`}
                  confirmText="Remove"
                  cancelText="Keep"
                  variant="danger"
                  onConfirm={handleRemove}
                  triggerClassName="!rounded-none !border-0 !bg-transparent !p-0 !text-xs !font-semibold !uppercase !tracking-[0.16em] !text-rose-600 !shadow-none hover:!text-rose-500"
                >
                  <div className="rounded-[1rem] border border-rose-200/70 bg-white/80 p-3 shadow-[0_18px_55px_-40px_rgba(244,63,94,0.4)]">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="size-12 rounded-[0.9rem] object-cover"
                      />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-semibold text-slate-950">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                          Qty {item.quantity}
                          {item.color ? ` • ${item.color}` : ''}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-slate-950">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </FamilyDialog>
              ) : (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="cursor-pointer text-xs font-semibold uppercase tracking-[0.16em] text-rose-600 hover:text-rose-500"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default BasketItem
