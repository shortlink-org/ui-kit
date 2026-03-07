import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { ProductPage } from './ProductPage'
import type { ProductPageProps } from './ProductPage'
import { Button } from '../../Button/Button'

const apparelProduct: ProductPageProps = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'gray', name: 'Gray', hex: '#9CA3AF' },
    { id: 'black', name: 'Black', hex: '#111827' },
  ],
  sizes: [
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: false },
  ],
  description:
    'The Basic Tee 6-Pack lets you switch between neutral essentials while keeping the page composition dense and commerce-ready.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with proprietary colors',
    'Pre-washed and pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray tees designed for repeat-purchase basics and storefront merchandising.',
  reviews: {
    href: '#',
    average: 4.1,
    totalCount: 117,
  },
  sizeGuideHref: '#',
}

const techProduct: ProductPageProps = {
  name: 'Gaming Laptop Pro 16"',
  price: '$2,499',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Computers', href: '#' },
    { id: 2, name: 'Laptops', href: '#' },
  ],
  images: [
    {
      src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200',
      alt: 'Gaming laptop open on desk.',
    },
    {
      src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200',
      alt: 'Gaming laptop keyboard and screen.',
    },
  ],
  colors: [
    { id: 'space-gray', name: 'Space Gray', hex: '#374151' },
    { id: 'black', name: 'Matte Black', hex: '#000000' },
  ],
  sizes: [
    { name: '16GB RAM / 512GB SSD', inStock: true },
    { name: '32GB RAM / 1TB SSD', inStock: true },
    { name: '64GB RAM / 2TB SSD', inStock: false },
  ],
  description:
    'High-performance laptop with RTX graphics, a 4K display and a spec-selection flow that behaves more like premium retail than a raw spec sheet.',
  highlights: [
    'RTX 4080 graphics',
    'Intel i9 processor',
    '16-inch 4K 144Hz display',
    'Advanced cooling system',
  ],
  details:
    'Designed for gaming and creator workflows with premium materials, fast storage and a clearer product-page hierarchy for large-ticket items.',
  reviews: {
    average: 4.7,
    totalCount: 521,
  },
  galleryVariant: 'stack',
  enableZoom: true,
}

const meta = preview.meta({
  title: 'Shop/ProductPage',
  component: ProductPage,
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

function ProductPageShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
      {children}
    </div>
  )
}

function InteractivePurchaseStory(args: ComponentProps<typeof ProductPage>) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    args.selectedColorId,
  )
  const [selectedSize, setSelectedSize] = useState<string | number | undefined>(
    args.selectedSizeId,
  )
  const [status, setStatus] = useState('Ready to purchase')

  const handleAddToCart = async () => {
    setStatus('Adding item to cart...')
    await new Promise((resolve) => setTimeout(resolve, 800))
    setStatus('Item added to cart')
  }

  const handleBuyNow = async () => {
    setStatus('Preparing secure checkout...')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStatus('Checkout session created')
  }

  return (
    <ProductPageShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-5 py-4 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.28)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
              Purchase flow
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              {status}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus('Ready to purchase')}
          >
            Reset state
          </Button>
        </div>

        <ProductPage
          {...args}
          selectedColorId={selectedColor}
          selectedSizeId={selectedSize}
          onColorChange={(colorId) => {
            setSelectedColor(colorId)
            args.onColorChange?.(colorId)
          }}
          onSizeChange={(sizeId) => {
            setSelectedSize(sizeId)
            args.onSizeChange?.(sizeId)
          }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </ProductPageShell>
  )
}

export const StorefrontApparel = meta.story({
  render: (args: ComponentProps<typeof ProductPage>) => (
    <ProductPageShell>
      <ProductPage {...args} />
    </ProductPageShell>
  ),
  args: {
    ...apparelProduct,
    selectedColorId: 'black',
    selectedSizeId: 'M',
  },
})

export const TechSpecShowcase = meta.story({
  render: (args: ComponentProps<typeof ProductPage>) => (
    <ProductPageShell>
      <ProductPage {...args} />
    </ProductPageShell>
  ),
  args: techProduct,
})

export const InteractivePurchaseFlow = meta.story({
  render: InteractivePurchaseStory,
  args: {
    ...apparelProduct,
    selectedColorId: 'white',
    selectedSizeId: 'M',
    galleryVariant: 'stack',
    enableZoom: true,
    showBuyNow: true,
  },
})
