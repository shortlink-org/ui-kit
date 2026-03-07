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

/**
 * Card Stack - swipeable photo stack interface.
 * Drag cards left/right to browse images.
 * @see https://motion.dev/tutorials/react-card-stack
 */
export const CardStack = meta.story({
  render: (args: ComponentProps<typeof ProductImageGallery>) => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--color-border)] bg-white/85 p-6 pb-24 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8 sm:pb-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Product media
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Card stack gallery
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          The gallery is presented as a physical stack of product photos. Drag
          the top card left or right to cycle through the set.
        </p>

        <div className="mt-8 sm:mt-10">
          <ProductImageGallery {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    variant: 'stack',
    enableZoom: true,
    images,
  },
})
