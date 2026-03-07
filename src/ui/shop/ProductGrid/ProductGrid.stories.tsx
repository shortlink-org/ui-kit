import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductGrid } from './ProductGrid'
import type { Product } from './ProductGrid'

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Storm Shell Parka',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: 'Black weatherproof jacket.',
    price: {
      current: 148,
      original: 198,
      currency: 'USD',
      locale: 'en-US',
    },
    color: 'Midnight',
    description: 'Water-resistant outer layer for cold city commutes.',
    badges: [{ label: 'Best seller', tone: 'warning' }],
    cta: {
      rating: 4.8,
      reviewCount: 124,
    },
    onAddToCart: () => undefined,
  },
  {
    id: 2,
    name: 'Contour Knit',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: 'Soft cream knitwear.',
    price: {
      current: 86,
      currency: 'USD',
      locale: 'en-US',
    },
    color: 'Chalk',
    description: 'Soft structured knit with a relaxed premium silhouette.',
    badges: [{ label: 'New arrival', tone: 'info' }],
    cta: {
      rating: 4.6,
      reviewCount: 48,
    },
    onAddToCart: () => undefined,
  },
  {
    id: 3,
    name: 'Transit Runner',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: 'Performance sneaker in charcoal.',
    price: {
      current: 112,
      original: 140,
      currency: 'USD',
      locale: 'en-US',
    },
    color: 'Charcoal',
    description: 'Everyday performance sneaker with lightweight cushioning.',
    badges: [{ label: 'Limited drop', tone: 'error' }],
    cta: {
      rating: 4.9,
      reviewCount: 203,
    },
    onAddToCart: () => undefined,
  },
  {
    id: 4,
    name: 'Canvas Weekender',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: 'Minimal weekender bag.',
    price: {
      current: 132,
      currency: 'USD',
      locale: 'en-US',
    },
    color: 'Sand',
    description: 'Structured travel bag sized for two-day trips.',
    badges: [{ label: 'Staff pick', tone: 'success' }],
    cta: {
      rating: 4.7,
      reviewCount: 89,
    },
    onAddToCart: () => undefined,
  },
]

const catalogProducts: Product[] = [
  ...mockProducts,
  {
    id: 5,
    name: 'Wool Overshirt',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: 'Olive overshirt.',
    price: { current: 118, currency: 'USD', locale: 'en-US' },
    color: 'Olive',
    description: 'Layering piece with tailored structure.',
  },
  {
    id: 6,
    name: 'Meridian Tote',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: 'Large tote in soft grey.',
    price: { current: 94, currency: 'USD', locale: 'en-US' },
    color: 'Mist',
    description: 'Daily carry tote with padded laptop sleeve.',
  },
  {
    id: 7,
    name: 'Field Bottle',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: 'Reusable bottle.',
    price: { current: 38, currency: 'USD', locale: 'en-US' },
    color: 'Steel',
    description: 'Insulated bottle with powder-coated finish.',
  },
  {
    id: 8,
    name: 'Arc Lamp',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: 'Minimal table lamp.',
    price: { current: 176, currency: 'USD', locale: 'en-US' },
    color: 'Bone',
    description: 'Warm ambient lighting for desks and nightstands.',
  },
]

const meta: Meta<typeof ProductGrid> = {
  title: 'Shop/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  argTypes: {
    onProductClick: {
      action: 'productClicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProductGrid>

export const StorefrontShelf: Story = {
  args: {
    products: mockProducts,
    title: 'Recommended for your storefront',
  },
}

export const ExpandedCatalog: Story = {
  args: {
    products: catalogProducts,
    title: 'Top picks across categories',
    columns: {
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
  },
}

export const LoadingState: Story = {
  args: {
    products: mockProducts,
    title: 'Trending this week',
    loading: true,
    skeletonCount: 8,
  },
}
