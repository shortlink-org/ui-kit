import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { useState } from 'react'
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

function Template(args: ComponentProps<typeof ProductColorSelector>) {
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
  render: Template,
  args: {
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
  },
})

export const WithSelection = meta.story({
  render: Template,
  args: {
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
    selectedColorId: 'black',
  },
})

export const ManyColors = meta.story({
  render: Template,
  args: {
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
      { id: 'red', name: 'Red', classes: 'bg-red-500 checked:outline-red-400' },
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
})
