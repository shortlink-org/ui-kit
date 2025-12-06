import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { ProductReviews } from './ProductReviews'

const meta = preview.meta({
  title: 'Shop/ProductReviews',
  component: ProductReviews,
  parameters: {
    layout: 'centered',
  },
})

export default meta

function Template(args: ComponentProps<typeof ProductReviews>) {
  return <ProductReviews {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {
    average: 4,
    totalCount: 117,
  },
})

export const HighRating = meta.story({
  render: Template,
  args: {
    average: 5,
    totalCount: 250,
  },
})

export const LowRating = meta.story({
  render: Template,
  args: {
    average: 2.5,
    totalCount: 15,
  },
})

export const NoReviews = meta.story({
  render: Template,
  args: {
    average: 0,
    totalCount: 0,
  },
})

export const ManyReviews = meta.story({
  render: Template,
  args: {
    average: 4.5,
    totalCount: 1234,
  },
})

export const PartialRating = meta.story({
  render: Template,
  args: {
    average: 3.7,
    totalCount: 89,
  },
})
