import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { ProductSizeSelector } from './ProductSizeSelector'

const meta = preview.meta({
  title: 'Shop/ProductSizeSelector',
  component: ProductSizeSelector,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSizeChange: {
      action: 'sizeChanged',
    },
  },
})

export default meta

function Template(args: ComponentProps<typeof ProductSizeSelector>) {
  const [selectedSize, setSelectedSize] = useState<string | number | undefined>(args.selectedSizeId)

  return (
    <ProductSizeSelector
      {...args}
      selectedSizeId={selectedSize}
      onSizeChange={(sizeId) => {
        setSelectedSize(sizeId)
        args.onSizeChange?.(sizeId)
      }}
    />
  )
}

export const Default = meta.story({
  render: Template,
  args: {
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
  },
})

export const WithSelection = meta.story({
  render: Template,
  args: {
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
    selectedSizeId: 'M',
  },
})

export const AllInStock = meta.story({
  render: Template,
  args: {
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
    ],
  },
})

export const ManySizes = meta.story({
  render: Template,
  args: {
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
})

export const WithSizeGuide = meta.story({
  render: Template,
  args: {
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
    ],
    sizeGuideHref: '#size-guide',
  },
})

