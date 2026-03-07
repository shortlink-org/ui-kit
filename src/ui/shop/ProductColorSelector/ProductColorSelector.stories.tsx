import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
import { ProductColorSelector } from './ProductColorSelector'

const meta = preview.meta({
  title: 'Shop/ProductColorSelector',
  component: ProductColorSelector,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onColorChange: {
      action: 'colorChanged',
    },
  },
})

export default meta

function InteractiveStory(args: ComponentProps<typeof ProductColorSelector>) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    args.selectedColorId,
  )

  return (
    <ProductColorSelector
      {...args}
      selectedColorId={selectedColor}
      onColorChange={(colorId) => {
        setSelectedColor(colorId)
        args.onColorChange?.(colorId)
      }}
    />
  )
}

export const Default = meta.story({
  render: InteractiveStory,
  args: {
    colors: [
      {
        id: 'chalk',
        name: 'Chalk',
        hex: '#F7F3EC',
      },
      {
        id: 'sage',
        name: 'Sage',
        hex: '#95A78D',
      },
      {
        id: 'ink',
        name: 'Ink',
        hex: '#1F2937',
      },
      {
        id: 'clay',
        name: 'Clay',
        hex: '#C97B63',
      },
    ],
    selectedColorId: 'ink',
  },
})
