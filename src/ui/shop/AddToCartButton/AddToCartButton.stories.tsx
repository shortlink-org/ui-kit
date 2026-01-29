import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { AddToCartButton } from './AddToCartButton'

const meta = preview.meta({
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated "Add to Cart" button with GSAP animations. Uses CSS @scope and @layer for style isolation.',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    // Content
    text: {
      name: 'Text',
      description: 'Button text label',
      control: 'text',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Add to cart' },
      },
    },
    ariaLabel: {
      name: 'Aria Label',
      description: 'Accessible label for screen readers',
      control: 'text',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'Add to cart' },
      },
    },
    // Appearance
    scale: {
      name: 'Scale',
      description: 'Scale factor for the button size',
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      table: {
        category: 'Appearance',
        defaultValue: { summary: '1' },
      },
    },
    reveal: {
      name: 'Reveal Animation',
      description: 'Show the reveal/loading animation',
      control: 'boolean',
      table: {
        category: 'Animation',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      name: 'Class Name',
      description: 'Additional CSS class for the wrapper',
      control: 'text',
      table: {
        category: 'Styling',
      },
    },
    // Events
    onAddToCart: {
      name: 'On Add To Cart',
      description: 'Callback fired when the button is clicked',
      action: 'addToCart',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    text: 'Add to cart',
    scale: 1,
    reveal: false,
    ariaLabel: 'Add to cart',
  },
})

export default meta

function Template(args: ComponentProps<typeof AddToCartButton>) {
  return <AddToCartButton {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {},
})

export const WithRevealAnimation = meta.story({
  name: 'With Reveal Animation',
  render: Template,
  args: {
    reveal: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with the reveal animation enabled, showing the loading border effect.',
      },
    },
  },
})

export const CustomText = meta.story({
  name: 'Custom Text',
  render: Template,
  args: {
    text: 'Buy Now',
  },
})

export const Scaled = meta.story({
  name: 'Scaled Sizes',
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">0.75x</span>
        <AddToCartButton text="Small" scale={0.75} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">1x</span>
        <AddToCartButton text="Default" scale={1} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">1.5x</span>
        <AddToCartButton text="Large" scale={1.5} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">2x</span>
        <AddToCartButton text="Extra Large" scale={2} />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstration of different scale sizes.',
      },
    },
  },
})

export const WithAsyncAction = meta.story({
  name: 'With Async Action',
  render: (args: ComponentProps<typeof AddToCartButton>) => (
    <AddToCartButton
      {...args}
      onAddToCart={async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }}
    />
  ),
  args: {
    text: 'Add to cart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an async action that simulates an API call (1.5s delay).',
      },
    },
  },
})
