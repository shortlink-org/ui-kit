import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { ProductDescription } from './ProductDescription'

const meta = preview.meta({
  title: 'Shop/ProductDescription',
  component: ProductDescription,
  parameters: {
    layout: 'padded',
  },
})

export default meta

function Template(args: ComponentProps<typeof ProductDescription>) {
  return <ProductDescription {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {
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
  },
})

export const DescriptionOnly = meta.story({
  render: Template,
  args: {
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.',
  },
})

export const HighlightsOnly = meta.story({
  render: Template,
  args: {
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
  },
})

export const DetailsOnly = meta.story({
  render: Template,
  args: {
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors.',
  },
})

export const ManyHighlights = meta.story({
  render: Template,
  args: {
    description: 'A premium product with many features.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
      'Eco-friendly materials',
      'Sustainable production',
      'Fair trade certified',
      'Lifetime warranty',
    ],
    details: 'This product comes with a comprehensive warranty and support.',
  },
})

