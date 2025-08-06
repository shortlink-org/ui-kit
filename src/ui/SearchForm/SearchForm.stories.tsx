import { Meta, StoryObj } from '@storybook/react'

import SearchForm from './SearchForm'

/* ----------------------------- Meta ---------------------------------- */

const meta: Meta<typeof SearchForm> = {
  title: 'UI/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in the search input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire search form when true.',
    },
    debounceDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Milliseconds to wait before firing onSearch while typing.',
      table: { category: 'Timing' },
    },
    defaultQuery: {
      control: 'text',
      description: 'Initial text value inside the input.',
    },
    onSearch: {
      action: 'searched',
      description: 'Callback invoked with the query string when a search is triggered.',
      table: { disable: true },
    },
    className: { table: { disable: true } },
  },
}
export default meta

/* ----------------------------- Types --------------------------------- */

type Story = StoryObj<typeof SearchForm>

/* ----------------------------- Stories ------------------------------- */

export const Default: Story = {
  args: {
    placeholder: 'Search for anything…',
  },
}

export const PreFilled: Story = {
  args: {
    placeholder: 'Search for anything…',
    defaultQuery: 'laptop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input starts with a default query, useful for persisted filters.',
      },
    },
  },
}

export const SlowDebounce: Story = {
  args: {
    placeholder: 'Type slowly – debounce 800 ms',
    debounceDelay: 800,
  },
  parameters: {
    docs: {
      description: {
        story: 'Debounce extended to 800 ms to illustrate delayed callbacks.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Search disabled…',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Entire form is disabled and cannot be interacted with.',
      },
    },
  },
}

export const WithCustomStyling: Story = {
  args: {
    placeholder: 'Full-width, centred',
    className: 'mx-auto max-w-md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Form wrapped in additional Tailwind classes via `className`.',
      },
    },
  },
}
