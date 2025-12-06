import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ProductGrid } from './ProductGrid'
import type { Product } from './ProductGrid'

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: '$35',
    color: 'Charcoal',
  },
  {
    id: 4,
    name: 'Artwork Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: '$35',
    color: 'Iso Dots',
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

function Template(args: ComponentProps<typeof ProductGrid>) {
  return <ProductGrid {...args} />
}

export const Default: Story = {
  render: Template,
  args: {
    products: mockProducts,
    title: 'Customers also purchased',
  },
}

export const WithoutTitle: Story = {
  render: Template,
  args: {
    products: mockProducts,
  },
}

export const WithBadges: Story = {
  render: Template,
  args: {
    products: mockProducts.map((product, index) => ({
      ...product,
      badge: index === 0 ? 'New' : index === 1 ? 'Popular' : undefined,
    })),
    title: 'Featured Products',
  },
}

export const WithSale: Story = {
  render: Template,
  args: {
    products: mockProducts.map((product, index) => ({
      ...product,
      onSale: index < 2,
      originalPrice: index < 2 ? '$50' : undefined,
      price: index < 2 ? '$35' : product.price,
    })),
    title: 'Sale Products',
  },
}

export const WithDescriptions: Story = {
  render: Template,
  args: {
    products: mockProducts.map((product) => ({
      ...product,
      description: 'Comfortable and stylish basic tee made from premium cotton.',
    })),
    title: 'Recommended for You',
  },
}

export const ManyProducts: Story = {
  render: Template,
  args: {
    products: [
      ...mockProducts,
      {
        id: 5,
        name: 'Premium Tee',
        href: '#',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Premium Tee.",
        price: '$45',
        color: 'Navy',
      },
      {
        id: 6,
        name: 'Classic Tee',
        href: '#',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Classic Tee.",
        price: '$30',
        color: 'Gray',
      },
      {
        id: 7,
        name: 'Sport Tee',
        href: '#',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "Front of men's Sport Tee.",
        price: '$40',
        color: 'Blue',
      },
      {
        id: 8,
        name: 'Casual Tee',
        href: '#',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "Front of men's Casual Tee.",
        price: '$32',
        color: 'Green',
      },
    ],
    title: 'All Products',
  },
}

export const CustomGrid: Story = {
  render: Template,
  args: {
    products: mockProducts,
    title: 'Custom Grid Layout',
    gridClassName: 'lg:grid-cols-3',
  },
}

export const SingleProduct: Story = {
  render: Template,
  args: {
    products: [mockProducts[0]],
    title: 'Featured Product',
  },
}

export const TwoProducts: Story = {
  render: Template,
  args: {
    products: mockProducts.slice(0, 2),
    title: 'Best Sellers',
  },
}

export const WithClickHandler: Story = {
  render: Template,
  args: {
    products: mockProducts,
    title: 'Click to View Details',
    onProductClick: (product) => {
      console.log('Product clicked:', product)
    },
  },
}

export const WithAddToCart: Story = {
  render: Template,
  args: {
    products: mockProducts.map((product) => ({
      ...product,
      onAddToCart: () => {
        console.log('Add to cart:', product.name)
      },
    })),
    title: 'Products with Add to Cart',
  },
}

