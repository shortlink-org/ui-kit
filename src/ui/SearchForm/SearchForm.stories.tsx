import React from 'react'
import { fn, expect, userEvent, waitFor, within } from 'storybook/test'

import preview from '#.storybook/preview'

import SearchForm, { SearchFormProps } from './SearchForm'

const meta = preview.meta({
  title: 'UI/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
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
  args: {
    onSearch: fn(),
  } as Partial<SearchFormProps>,
})

const getSearchInput = (ctx: ReturnType<typeof within>) =>
  ctx.queryByRole('textbox', { name: /search/i }) ??
  ctx.queryByPlaceholderText(/search/i) ??
  ctx.getByRole('textbox')

export const MarketplaceToolbar = meta.story({
  args: {
    placeholder: 'Search products, SKUs, brands, or collections',
    fullWidth: true,
  },
  render: (args: SearchFormProps) => (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/90 p-4 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.18)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Catalog command bar
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Refine a large marketplace catalog quickly
          </h2>
        </div>
        <div className="w-full max-w-3xl">
          <SearchForm {...args} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
        {['In stock', 'Top sellers', 'Same-day delivery', 'Featured brands'].map(
          (chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
            >
              {chip}
            </span>
          ),
        )}
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = getSearchInput(canvas)
    await userEvent.clear(input)
    await userEvent.type(input, 'wireless headphones{enter}')
    await expect(input).toHaveValue('wireless headphones')
  },
})

export const WorkspaceSearchFeedback = meta.story({
  args: {
    placeholder: 'Search orders, customers, or notes',
    debounceMs: 300,
    fullWidth: true,
    size: 'sm',
  },
  render: (args: SearchFormProps) => {
    const Demo = () => {
      const [lastQuery, setLastQuery] = React.useState('')

      return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_28px_56px_-40px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Workspace search
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  Investigate account activity
                </h2>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Live query
              </span>
            </div>
            <SearchForm
              {...args}
              onSearch={(query) => {
                setLastQuery(query)
                args.onSearch?.(query)
              }}
            />
          </section>

          <aside className="rounded-[2rem] border border-[var(--color-border)] bg-slate-950 p-5 text-white shadow-[0_32px_64px_-42px_rgba(15,23,42,0.42)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Search status
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Last query</p>
                <p
                  className="mt-1 text-lg font-medium text-white"
                  data-testid="last-query"
                >
                  {lastQuery || 'No query yet'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  Debounced search is useful for large catalog and order indexes.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )
    }

    return <Demo />
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = getSearchInput(canvas)
    await userEvent.type(input, 'chargeback review')
    await waitFor(() =>
      expect(canvas.getByTestId('last-query')).toHaveTextContent(
        'chargeback review',
      ),
    )
  },
})
