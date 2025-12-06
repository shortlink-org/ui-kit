import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
import { ProductQuickView } from './ProductQuickView'
import type { ProductQuickViewProps } from './ProductQuickView'
import { Button } from '../../Button/Button'

const mockProduct: ProductQuickViewProps['product'] = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  rating: 3.9,
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
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false },
  ],
}

const meta = preview.meta({
  title: 'Shop/ProductQuickView',
  component: ProductQuickView,
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
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

function QuickViewWrapper(
  args: Omit<ProductQuickViewProps, 'open' | 'onClose'>,
) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Quick View</Button>
      <ProductQuickView {...args} open={open} onClose={setOpen} />
    </div>
  )
}

export const Default = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: mockProduct,
  },
})

export const WithSelectedOptions = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: mockProduct,
    selectedColorId: 'black',
    selectedSizeId: 'M',
  },
})

export const WithoutReviews = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      ...mockProduct,
      rating: undefined,
      reviewCount: undefined,
    },
  },
})

export const HighRating = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      ...mockProduct,
      rating: 4.8,
      reviewCount: 250,
    },
  },
})

export const ManyColors = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      ...mockProduct,
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
        {
          id: 'red',
          name: 'Red',
          classes: 'bg-red-500 checked:outline-red-400',
        },
        {
          id: 'blue',
          name: 'Blue',
          classes: 'bg-blue-500 checked:outline-blue-400',
        },
        {
          id: 'green',
          name: 'Green',
          classes: 'bg-green-500 checked:outline-green-400',
        },
      ],
    },
  },
})

export const ManySizes = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      ...mockProduct,
      sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
        { name: '4XL', inStock: false },
        { name: '5XL', inStock: false },
      ],
    },
  },
})

export const WithSizeGuide = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: mockProduct,
    sizeGuideHref: '#size-guide',
  },
})

export const WithCallbacks = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: mockProduct,
    onColorChange: (colorId: string | number) => {
      console.log('Color changed:', colorId)
    },
    onSizeChange: (sizeId: string | number) => {
      console.log('Size changed:', sizeId)
    },
    onAddToCart: async () => {
      console.log('Add to cart clicked')
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
})

export const MinimalProduct = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      name: 'Simple Product',
      price: '$50',
      imageSrc:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-02-detail.jpg',
      imageAlt: 'Simple product image',
      colors: [
        {
          id: 'black',
          name: 'Black',
          classes: 'bg-gray-900 checked:outline-gray-900',
        },
      ],
      sizes: [
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
      ],
    },
  },
})

export const LongProductName = meta.story({
  render: (args: ComponentProps<typeof ProductQuickView>) => (
    <QuickViewWrapper {...args} />
  ),
  args: {
    product: {
      ...mockProduct,
      name: 'Premium Basic Tee 6-Pack with Extra Long Sleeves and Comfortable Fit',
    },
  },
})
