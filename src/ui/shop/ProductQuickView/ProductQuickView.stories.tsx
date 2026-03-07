import preview from '#.storybook/preview'
import { useState } from 'react'
import { ProductQuickView } from './ProductQuickView'
import type { ProductQuickViewProps } from './ProductQuickView'
import { Button } from '../../Button/Button'

const apparelProduct: ProductQuickViewProps['product'] = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  rating: 4.2,
  reviewCount: 117,
  href: '#',
  imageSrc:
    'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    {
      id: 'white',
      name: 'White',
      classes: 'bg-white checked:outline-gray-400',
    },
    {
      id: 'gray',
      name: 'Gray',
      classes: 'bg-gray-200 checked:outline-gray-400',
    },
    {
      id: 'black',
      name: 'Black',
      classes: 'bg-gray-900 checked:outline-gray-900',
    },
  ],
  sizes: [
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: false },
  ],
}

const travelProduct: ProductQuickViewProps['product'] = {
  name: 'Weekender Travel Pack',
  price: '$248',
  rating: 4.8,
  reviewCount: 312,
  href: '#',
  imageSrc:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  imageAlt: 'Travel bag product preview.',
  colors: [
    {
      id: 'sand',
      name: 'Sand',
      classes: 'bg-stone-200 checked:outline-stone-400',
    },
    {
      id: 'navy',
      name: 'Navy',
      classes: 'bg-slate-800 checked:outline-slate-700',
    },
  ],
  sizes: [
    { name: 'Carry-on', inStock: true },
    { name: 'Weekend', inStock: true },
    { name: 'Extended', inStock: false },
  ],
}

const meta = preview.meta({
  title: 'Shop/ProductQuickView',
  component: ProductQuickView,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  argTypes: {
    onColorChange: { action: 'colorChanged' },
    onSizeChange: { action: 'sizeChanged' },
    onAddToCart: { action: 'addToCart' },
  },
})

export default meta

function StorefrontShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.42)] backdrop-blur-xl sm:p-8">
        {children}
      </div>
    </div>
  )
}

export const StorefrontQuickView = meta.story({
  args: {
    product: apparelProduct,
    selectedColorId: 'black',
    selectedSizeId: 'M',
    sizeGuideHref: '#size-guide',
  },
  render: (args: ProductQuickViewProps) => {
    const [open, setOpen] = useState(true)

    return (
      <StorefrontShell>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Product quick view
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              Drawer-based storefront preview
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
              A realistic quick-view interaction for category shelves and
              recommendation lanes.
            </p>
          </div>

          {!open ? (
            <Button variant="primary" onClick={() => setOpen(true)}>
              Reopen quick view
            </Button>
          ) : null}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5">
          <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
            Imagine this shell as a marketplace shelf. The quick view opens
            immediately so the component can be evaluated in-context instead of
            behind a demo button.
          </p>
        </div>

        <ProductQuickView
          {...args}
          open={open}
          onClose={setOpen}
        />
      </StorefrontShell>
    )
  },
})

export const MobileBottomSheet = meta.story({
  args: {
    product: travelProduct,
    selectedColorId: 'sand',
    selectedSizeId: 'Carry-on',
    position: 'bottom',
    size: 'full',
  },
  render: (args: ProductQuickViewProps) => {
    const [open, setOpen] = useState(true)

    return (
      <StorefrontShell>
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Mobile commerce
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Bottom-sheet quick view
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            Compact product selection flow for mobile merchandising and campaign
            landing pages.
          </p>
        </div>

        {!open ? (
          <div className="mt-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
              Reopen bottom sheet
            </Button>
          </div>
        ) : null}

        <ProductQuickView
          {...args}
          open={open}
          onClose={setOpen}
        />
      </StorefrontShell>
    )
  },
})
