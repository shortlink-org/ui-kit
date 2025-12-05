import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { AddToCartButton } from './AddToCartButton'

const meta = preview.meta({
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: 'Button text',
      control: 'text',
    },
    scale: {
      description: 'Scale factor for the button',
      control: { type: 'number', min: 0.5, max: 4, step: 0.1 },
    },
    reveal: {
      description: 'Show reveal animation',
      control: 'boolean',
    },
    onAddToCart: {
      description: 'Callback when item is added to cart',
      action: 'clicked',
    },
    ariaLabel: {
      description: 'Aria label for accessibility',
      control: 'text',
    },
  },
})

export default meta

function Template(args: ComponentProps<typeof AddToCartButton>) {
  return <AddToCartButton {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {
    text: 'Add to cart',
    scale: 1,
    reveal: false,
  },
})

