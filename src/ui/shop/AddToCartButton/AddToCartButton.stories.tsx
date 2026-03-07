import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import preview from '#.storybook/preview'

import { AddToCartButton } from './AddToCartButton'

const meta = preview.meta({
  title: 'Shop/AddToCartButton',
  component: AddToCartButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Animated add-to-cart CTA for commerce surfaces. Stories focus on real storefront usage instead of prop permutations.',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    chromatic: { viewports: [375, 768, 1280, 1920] },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef3f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text label',
    },
    scale: {
      control: { type: 'range', min: 0.75, max: 1.5, step: 0.05 },
      description: 'Scale factor for the button size',
    },
    reveal: {
      control: 'boolean',
      description: 'Show the reveal/loading animation',
    },
    className: {
      control: false,
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    onAddToCart: {
      action: 'addToCart',
    },
  },
  args: {
    text: 'Add to cart',
    scale: 1,
    reveal: false,
    ariaLabel: 'Add to cart',
    onAddToCart: fn(),
  },
})

export default meta

export const ProductCardCta = meta.story({
  render: (args) => (
    <div className="grid gap-6 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)]">
      <article className="rounded-[2rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)]">
        <div className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(180deg,#f3f6fb_0%,#e6edf6_100%)]" />
        <div className="mt-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            New drop
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Coastal trail jacket
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Lightweight outer layer for everyday wear, fast shipping included.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Price</p>
              <p className="text-2xl font-semibold text-slate-950">$128</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              In stock
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-start">
          <AddToCartButton {...args} />
        </div>
      </article>

      <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_62px_-38px_rgba(15,23,42,0.42)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Primary usage
        </p>
        <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
          <p>This is the default merchandising CTA on a product card or quick view.</p>
          <p>Controls stay available for copy, scale, and reveal without needing separate synthetic stories.</p>
        </div>
      </aside>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /add to cart/i })
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
})

export const StickyProductBar = meta.story({
  args: {
    reveal: false,
    text: 'Add bag',
    ariaLabel: 'Add bag',
  },
  render: (args) => (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Product detail
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Studio monitor headphones
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Long-form product details above the fold with a sticky purchase bar at
          the bottom of the viewport.
        </p>
        <div className="mt-8 h-72 rounded-[1.5rem] bg-[linear-gradient(180deg,#eef4fa_0%,#dce7f4_100%)]" />
      </section>

      <div className="sticky bottom-4 rounded-[1.75rem] border border-slate-200 bg-white/95 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-slate-500">Selected configuration</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-semibold text-slate-950">Matte black / USB-C</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                Ready to ship
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold text-slate-950">$249</p>
            <AddToCartButton {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
})

export const AsyncCartUpdate = meta.story({
  args: {
    text: 'Add to cart',
    ariaLabel: 'Add to cart',
  },
  render: (args) => {
    const Demo = () => {
      const [status, setStatus] = React.useState('Idle')

      return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Cart mutation
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Async add-to-cart flow
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Useful for testing the button inside a real network-backed product flow.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <AddToCartButton
                {...args}
                onAddToCart={async () => {
                  setStatus('Updating cart...')
                  await new Promise((resolve) => setTimeout(resolve, 1500))
                  setStatus('Cart updated')
                  args.onAddToCart?.()
                }}
              />
              <span
                className="text-sm font-medium text-slate-600"
                data-testid="cart-status"
              >
                {status}
              </span>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              What this story covers
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Real async callback timing</li>
              <li>Loading and completion path in one scenario</li>
              <li>Useful for visual regression without prop-noise</li>
            </ul>
          </aside>
        </div>
      )
    }

    return <Demo />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /add to cart/i })
    await userEvent.click(button)
    await expect(canvas.getByTestId('cart-status')).toHaveTextContent(
      /updating cart|cart updated/i,
    )
  },
})
