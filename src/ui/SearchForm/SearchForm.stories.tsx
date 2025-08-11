import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { action } from 'storybook/actions'
import { userEvent, within, expect, screen } from 'storybook/test'

import SearchForm, { SearchFormProps } from './SearchForm'

const meta: Meta<typeof SearchForm> = {
  title: 'UI/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1920] },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl px-4 py-6">
        <Story />
      </div>
    ),
  ],
  args: {
    onSearch: action('searched'),
  } as Partial<SearchFormProps>,
}
export default meta

type Story = StoryObj<typeof SearchForm>

/** helper for robust input lookup */
const getSearchInput = (ctx: ReturnType<typeof within>) =>
  ctx.queryByRole('textbox', { name: /search/i }) ??
  ctx.queryByPlaceholderText(/search/i) ??
  ctx.getByRole('textbox')

export const Default: Story = {
  args: { placeholder: 'Search for anything…' },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.clear(input)
    await userEvent.type(input, 'hello{enter}')
    await expect(c.getByRole('button', { name: /search/i })).toBeEnabled()
  },
}

export const PreFilled: Story = {
  args: { placeholder: 'Search for anything…', defaultQuery: 'laptop' },
}

export const SlowDebounce: Story = {
  args: { placeholder: 'Type slowly – debounce 800 ms', debounceDelay: 800 },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.type(input, 'slow')
    await expect(c.getByRole('button', { name: /search/i })).toBeEnabled()
  },
}

export const Disabled: Story = {
  args: { placeholder: 'Search disabled…', disabled: true },
}

export const WithCustomStyling: Story = {
  args: { placeholder: 'Full-width, centred', className: 'mx-auto max-w-md' },
}

export const InHeaderBar: Story = {
  args: { placeholder: 'Search…' },
  decorators: [
    (Story) => (
      <div className="w-full px-6 py-4 bg-indigo-600 dark:bg-slate-800">
        <div className="mx-auto max-w-5xl">
          <Story />
        </div>
      </div>
    ),
  ],
}

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [last, setLast] = React.useState('')
      return (
        <div className="space-y-3">
          <SearchForm {...args} onSearch={(q) => { setLast(q); args.onSearch?.(q) }} />
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Last query:</span>{' '}
            <span data-testid="last-query">{last || '—'}</span>
          </div>
        </div>
      )
    }
    return <Demo />
  },
  args: { placeholder: 'Try typing…', debounceDelay: 300 },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    const input = getSearchInput(c)
    await userEvent.type(input, 'debounce test')
  },
}
