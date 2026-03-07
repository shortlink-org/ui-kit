import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
import { Basket } from './Basket'
import type { BasketProps } from './Basket'
import { Button } from '../../Button/Button'

const mockItems = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    quantity: 1,
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]

const meta = preview.meta({
  title: 'Shop/Basket',
  component: Basket,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    onRemoveItem: {
      action: 'itemRemoved',
    },
    onCheckout: {
      action: 'checkoutClicked',
    },
    onContinueShopping: {
      action: 'continueShoppingClicked',
    },
  },
})

export default meta

function BasketWrapper(args: Omit<BasketProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(true)
  const [items, setItems] = useState(args.items)

  const handleRemoveItem = (itemId: number | string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    args.onRemoveItem?.(itemId)
  }

  const handleQuantityChange = (itemId: number | string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    )
    args.onQuantityChange?.(itemId, quantity)
  }

  const handleClearBasket = () => {
    setItems([])
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,250,252,0.96))]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[860px] w-full max-w-none overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_32px_90px_-54px_rgba(15,23,42,0.3)]">
        <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
              Basket side panel
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-foreground)]">
              Right-side cart review
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
              The default story keeps the surrounding layout quiet and shows the
              basket as a right-hand review panel inside a storefront workspace.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => setOpen(true)}>Open basket</Button>
              <Button variant="secondary">Continue browsing</Button>
            </div>
          </div>

          <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Preview item',
                    value: 'Coastal trail jacket',
                    note: 'Updated 2 minutes ago',
                  },
                  {
                    title: 'Saved for later',
                    value: '3 products',
                    note: 'Available in your account',
                  },
                  {
                    title: 'Shipping zone',
                    value: 'US West',
                    note: 'Express available',
                  },
                  {
                    title: 'Applied offer',
                    value: 'Spring member',
                    note: 'Checkout to verify',
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                      {card.title}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--color-foreground)]">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-dashed border-[var(--color-border)] bg-[var(--color-background)]/60" />
          </div>
        </div>
      </div>

      <Basket
        {...args}
        items={items}
        onRemoveItem={handleRemoveItem}
        onQuantityChange={handleQuantityChange}
        onClearBasket={handleClearBasket}
        open={open}
        onClose={setOpen}
      />
    </div>
  )
}

export const Default = meta.story({
  render: (args: ComponentProps<typeof Basket>) => (
    <BasketWrapper key={JSON.stringify(args.items)} {...args} />
  ),
  args: {
    items: mockItems,
    subtotal: '$262.00',
    shippingNote: 'Shipping, taxes and express delivery options are confirmed at checkout.',
    checkoutText: 'Proceed to checkout',
    continueShoppingText: 'Back to storefront',
    clearBasketText: 'Clear basket',
    position: 'right',
    size: 'lg',
  },
})

export const Empty = meta.story({
  render: (args: ComponentProps<typeof Basket>) => (
    <BasketWrapper key={JSON.stringify(args.items)} {...args} />
  ),
  args: {
    items: [],
    subtotal: '$0.00',
    position: 'right',
    size: 'lg',
  },
})
