import preview from '#.storybook/preview'
import { ProductReviews } from './ProductReviews'

const meta = preview.meta({
  title: 'Shop/ProductReviews',
  component: ProductReviews,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    average: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    totalCount: {
      control: { type: 'number', min: 0, step: 1 },
    },
  },
})

export default meta

export const Default = meta.story({
  args: {
    average: 4.4,
    totalCount: 117,
  },
})
