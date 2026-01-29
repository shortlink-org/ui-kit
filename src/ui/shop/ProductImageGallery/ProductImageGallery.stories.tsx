import preview from '#.storybook/preview'
import type { ComponentProps } from 'react'
import { ProductImageGallery } from './ProductImageGallery'

const images = [
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
    alt: 'Two each of gray, white, and black shirts laying flat.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
    alt: 'Model wearing plain black basic tee.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
    alt: 'Model wearing plain gray basic tee.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    alt: 'Model wearing plain white basic tee.',
  },
]

const meta = preview.meta({
  title: 'Shop/ProductImageGallery',
  component: ProductImageGallery,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
})

export default meta

function Template(args: ComponentProps<typeof ProductImageGallery>) {
  return <ProductImageGallery {...args} />
}

/** Grid layout (default) */
export const Grid = meta.story({
  render: Template,
  args: {
    variant: 'grid',
    enableZoom: true,
    images,
  },
})

/** Carousel with thumbnails */
export const Carousel = meta.story({
  render: Template,
  args: {
    variant: 'carousel',
    enableZoom: true,
    images,
  },
})

/**
 * Card Stack - swipeable photo stack interface.
 * Drag cards left/right to browse images.
 * @see https://motion.dev/tutorials/react-card-stack
 */
export const CardStack = meta.story({
  render: Template,
  args: {
    variant: 'stack',
    enableZoom: true,
    images,
  },
})
