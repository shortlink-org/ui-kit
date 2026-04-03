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
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-foreground)] sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    onSearch: fn(),
  } as Partial<SearchFormProps>,
})

export default meta

const getSearchInput = (ctx: ReturnType<typeof within>) =>
  ctx.queryByRole('searchbox') ??
  ctx.queryByRole('textbox', { name: /search/i }) ??
  ctx.queryByPlaceholderText(/search/i) ??
  ctx.getByRole('textbox')

export const MarketplaceToolbar = meta.story({
  args: {
    placeholder: 'Search products, SKUs, brands, or collections',
    fullWidth: true,
  },
  render: (args: SearchFormProps) => (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Catalog command bar
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Refine a large marketplace catalog quickly
          </h2>
        </div>
        <div className="w-full max-w-3xl">
          <SearchForm {...args} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--color-muted-foreground)]">
        {['In stock', 'Top sellers', 'Same-day delivery', 'Featured brands'].map(
          (chip) => (
            <span
              key={chip}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1"
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
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                    Workspace search
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-[var(--color-foreground)]">
                    Investigate account activity
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
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
            </div>

            <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                Last query
              </p>
              <p
                className="mt-2 break-words text-base font-medium text-[var(--color-foreground)]"
                data-testid="last-query"
              >
                {lastQuery || 'No query yet'}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                Debounced search helps with large order and catalog indexes.
              </p>
            </aside>
          </div>
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
