import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
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

function InteractiveStory(args: ComponentProps<typeof ProductSizeSelector>) {
  const [selectedSize, setSelectedSize] = useState<string | number | undefined>(
    args.selectedSizeId,
  )

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
  render: InteractiveStory,
  args: {
    sizes: [
      { name: 'XS', inStock: false },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: false },
    ],
    selectedSizeId: 'M',
    sizeGuideHref: '#size-guide',
  },
})
