import React from 'react'
import { action } from 'storybook/actions'
import { userEvent, within, expect } from 'storybook/test'
import preview from '#.storybook/preview'

import SearchForm, { SearchFormProps } from './SearchForm'

const meta = preview.meta({
  title: 'UI/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1920] },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-full max-w-2xl px-4 py-6">
        <Story />
      </div>
    ),
  ],
  args: {
    onSearch: action('searched'),
  } as Partial<SearchFormProps>,
})

/** helper for robust input lookup */
const getSearchInput = (ctx: ReturnType<typeof within>) =>
  ctx.queryByRole('textbox', { name: /search/i }) ??
  ctx.queryByPlaceholderText(/search/i) ??
  ctx.getByRole('textbox')

export const Default = meta.story({
  args: { placeholder: 'Search for anything…' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.clear(input)
    await userEvent.type(input, 'hello{enter}')
    await expect(input).toHaveValue('hello')
  },
})

export const PreFilled = meta.story({
  args: { placeholder: 'Search for anything…', defaultValue: 'laptop' },
})

export const SlowDebounce = meta.story({
  args: { placeholder: 'Type slowly – debounce 800 ms', debounceMs: 800 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.type(input, 'slow')
    await expect(input).toHaveValue('slow')
  },
})

export const Disabled = meta.story({
  args: { placeholder: 'Search disabled…', disabled: true },
})

export const WithCustomStyling = meta.story({
  args: { placeholder: 'Full-width, centred', className: 'mx-auto max-w-md' },
})

export const InHeaderBar = meta.story({
  args: { placeholder: 'Search…' },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-full px-6 py-4 bg-indigo-600 dark:bg-slate-800">
        <div className="mx-auto max-w-5xl">
          <Story />
        </div>
      </div>
    ),
  ],
})

export const Interactive = meta.story({
  render: (args: SearchFormProps) => {
    const Demo = () => {
      const [last, setLast] = React.useState('')
      return (
        <div className="space-y-3">
          <SearchForm
            {...args}
            onSearch={(q) => {
              setLast(q)
              args.onSearch?.(q)
            }}
          />
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Last query:</span>{' '}
            <span data-testid="last-query">{last || '—'}</span>
          </div>
        </div>
      )
    }
    return <Demo />
  },
  args: { placeholder: 'Try typing…', debounceMs: 300 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.type(input, 'debounce test')
  },
})
