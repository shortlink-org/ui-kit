import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { ProductPage } from './ProductPage'
import type { ProductPageProps } from './ProductPage'
import { Button } from '../../Button/Button'

// ============================================================================
// Mock Data - Different Product Types
// ============================================================================

const clothingProduct: ProductPageProps = {
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
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  reviews: {
    href: '#',
    average: 4,
    totalCount: 117,
  },
  sizeGuideHref: '#',
}

// ============================================================================
// Story Configuration
// ============================================================================

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
    name: {
      control: 'text',
    },
    price: {
      control: 'text',
    },
    onColorChange: {
      action: 'colorChanged',
    },
    onSizeChange: {
      action: 'sizeChanged',
    },
    onAddToCart: {
      action: 'addToCart',
    },
  },
})

export default meta

// ============================================================================
// Basic Stories
// ============================================================================

function Template(args: ComponentProps<typeof ProductPage>) {
  return <ProductPage {...args} />
}

export const Default = meta.story({
  render: Template,
  args: clothingProduct,
})

export const Variations = meta.story({
  render: Template,
  args: {
    ...clothingProduct,
    description: undefined,
    highlights: [],
    details: undefined,
    reviews: undefined,
  },
  name: 'Variations - Minimal Content',
})

export const WithSelectedOptions = meta.story({
  render: Template,
  args: {
    ...clothingProduct,
    selectedColorId: 'black',
    selectedSizeId: 'M',
  },
})

export const Interactive = meta.story({
  render: function InteractiveTemplate(
    args: ComponentProps<typeof ProductPage>,
  ) {
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
      args.selectedColorId,
    )
    const [selectedSize, setSelectedSize] = useState<
      string | number | undefined
    >(args.selectedSizeId)
    const [, setAddToCartLoading] = useState(false)

    const handleAddToCart = async () => {
      setAddToCartLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAddToCartLoading(false)
      alert(`Added to cart: Color ${selectedColor}, Size ${selectedSize}`)
    }

    return (
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
      />
    )
  },
  args: {
    ...clothingProduct,
    selectedColorId: 'white',
    selectedSizeId: 'M',
    galleryVariant: 'stack',
    enableZoom: true,
  },
  name: 'Interactive - With Card Stack Gallery',
})

// ============================================================================
// Custom Slots Stories
// ============================================================================

export const CustomSlots = meta.story({
  render: Template,
  args: {
    ...clothingProduct,
    headerSlot: (
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
          >
            ← Back to products
          </a>
          <span className="text-sm text-[var(--color-muted-foreground)]">
            /
          </span>
          <span className="text-sm font-medium text-[var(--color-foreground)]">
            {clothingProduct.name}
          </span>
        </div>
      </div>
    ),
    actionSlot: (
      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" className="w-full">
          Add to Cart
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          Add to Wishlist
        </Button>
      </div>
    ),
    gallerySlot: (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-[var(--color-muted)]">
          <img
            src={clothingProduct.images[0].src}
            alt={clothingProduct.images[0].alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    ),
  },
  name: 'Custom Slots',
})

// ============================================================================
// Edge Cases Stories
// ============================================================================

export const EdgeCases = meta.story({
  render: Template,
  args: {
    ...clothingProduct,
    name: 'Premium Organic Cotton Long Sleeve T-Shirt with Custom Embroidery and Sustainable Packaging',
    colors: [],
    sizes: [
      { name: 'XS', inStock: false },
      { name: 'S', inStock: false },
      { name: 'M', inStock: false },
    ],
    description:
      'This is a very detailed product description that goes on for multiple paragraphs. ' +
      'It includes information about the materials used, the manufacturing process, care instructions, ' +
      'sustainability practices, and more. '.repeat(5),
    highlights: Array.from(
      { length: 10 },
      (_, i) => `Feature ${i + 1}: Important product feature`,
    ),
    images: [
      ...clothingProduct.images,
      {
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        alt: 'Additional product view 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        alt: 'Additional product view 2',
      },
    ],
    galleryVariant: 'stack',
    enableZoom: true,
  },
  name: 'Edge Cases',
})

// ============================================================================
// Real-World Scenarios
// ============================================================================

export const FashionEcommerce = meta.story({
  render: Template,
  args: {
    name: 'Designer Leather Jacket',
    price: '$899',
    breadcrumbs: [
      { id: 1, name: 'Fashion', href: '#' },
      { id: 2, name: 'Outerwear', href: '#' },
      { id: 3, name: 'Jackets', href: '#' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
        alt: 'Leather jacket front',
      },
      {
        src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
        alt: 'Leather jacket back',
      },
    ],
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'brown', name: 'Brown', hex: '#8B4513' },
    ],
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: true },
    ],
    description:
      'Premium genuine leather jacket with modern design. Perfect for any occasion.',
    highlights: [
      '100% Genuine Leather',
      'Handcrafted',
      'Lifetime warranty',
      'Free shipping',
    ],
    reviews: {
      average: 4.9,
      totalCount: 342,
    },
    galleryVariant: 'stack',
    enableZoom: true,
  },
  name: 'Real-World - Fashion E-commerce',
})

export const TechProduct = meta.story({
  render: Template,
  args: {
    name: 'Gaming Laptop Pro 16"',
    price: '$2,499',
    breadcrumbs: [
      { id: 1, name: 'Computers', href: '#' },
      { id: 2, name: 'Laptops', href: '#' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        alt: 'Gaming laptop',
      },
      {
        src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
        alt: 'Gaming laptop keyboard',
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
      'High-performance gaming laptop with RTX 4080, Intel i9 processor, and 16" 4K display. Perfect for gaming and professional work.',
    highlights: [
      'RTX 4080 Graphics',
      'Intel i9-13900HX',
      '16" 4K 144Hz Display',
      '32GB DDR5 RAM',
      '1TB NVMe SSD',
    ],
    details:
      'This laptop is designed for serious gamers and content creators. Features advanced cooling system, RGB keyboard, and premium build quality.',
    reviews: {
      average: 4.7,
      totalCount: 521,
    },
    galleryVariant: 'stack',
    enableZoom: true,
  },
  name: 'Real-World - Tech Product',
})

export const WithBuyNow = meta.story({
  render: function BuyNowTemplate(args: ComponentProps<typeof ProductPage>) {
    const handleBuyNow = async () => {
      // Simulate checkout redirect
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Redirecting to checkout...')
    }

    return <ProductPage {...args} onBuyNow={handleBuyNow} />
  },
  args: {
    ...clothingProduct,
    showBuyNow: true,
    galleryVariant: 'stack',
    enableZoom: true,
  },
  name: 'With Buy Now Button',
})
