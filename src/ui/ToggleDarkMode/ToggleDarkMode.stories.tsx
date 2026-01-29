import type { ComponentProps } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import preview from '#.storybook/preview'

import ToggleDarkMode from './ToggleDarkMode'
import Header from '../../page/Header/Header'

const meta = preview.meta({
  title: 'UI/ToggleDarkMode',
  component: ToggleDarkMode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A beautiful sun/moon toggle switch for dark mode. Uses CSS @scope and @layer for complete style isolation.',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    // State
    checked: {
      name: 'Checked',
      description: 'Controlled checked state (dark mode when true)',
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      name: 'Default Checked',
      description: 'Initial checked state for uncontrolled mode',
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    // Identification
    id: {
      name: 'ID',
      description: 'Unique identifier for the toggle',
      control: 'text',
      table: {
        category: 'Identification',
      },
    },
    // Accessibility
    ariaLabel: {
      name: 'Aria Label',
      description: 'Accessible label for screen readers',
      control: 'text',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'Toggle dark mode' },
      },
    },
    // Events
    onChange: {
      name: 'On Change',
      description: 'Callback when toggle state changes (receives new checked state)',
      action: 'changed',
      table: {
        category: 'Events',
      },
    },
    onClick: {
      name: 'On Click (deprecated)',
      description: 'Legacy click handler - use onChange instead',
      action: 'clicked',
      table: {
        category: 'Events (Deprecated)',
      },
    },
  },
  args: {
    id: 'toggle-dark-mode',
    defaultChecked: false,
    ariaLabel: 'Toggle dark mode',
  },
})

export default meta

// Controlled component wrapper
function ControlledToggle(args: ComponentProps<typeof ToggleDarkMode>) {
  const [checked, setChecked] = useState(args.checked ?? args.defaultChecked ?? false)
  return (
    <ToggleDarkMode
      {...args}
      checked={checked}
      onChange={(newChecked) => {
        setChecked(newChecked)
        args.onChange?.(newChecked)
      }}
    />
  )
}

export const Default = meta.story({
  name: 'Default (Light Mode)',
  render: (args: ComponentProps<typeof ToggleDarkMode>) => <ControlledToggle {...args} />,
  args: {
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle in light mode (sun visible). Click to switch to dark mode.',
      },
    },
  },
})

export const DarkMode = meta.story({
  name: 'Dark Mode',
  render: (args: ComponentProps<typeof ToggleDarkMode>) => <ControlledToggle {...args} />,
  args: {
    defaultChecked: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Toggle in dark mode (moon with stars visible).',
      },
    },
  },
})

export const Interactive = meta.story({
  name: 'Interactive Demo',
  render: () => {
    const [isDark, setIsDark] = useState(false)
    return (
      <div
        className={`p-8 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        <div className="flex items-center justify-between gap-8">
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </span>
          <ToggleDarkMode
            id="interactive-toggle"
            checked={isDark}
            onChange={setIsDark}
          />
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Interactive demo showing the toggle affecting a container background.',
      },
    },
  },
})

export const WithHeader = meta.story({
  name: 'With Header',
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="w-full max-w-2xl">
        <Header title="Header" />
        <div className="mt-4 flex items-center gap-4">
          <ToggleDarkMode
            id="header-toggle"
            checked={checked}
            onChange={setChecked}
          />
          <Button variant="contained">Example MUI button</Button>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Toggle used alongside a header component and MUI button.',
      },
    },
  },
})

export const Uncontrolled = meta.story({
  name: 'Uncontrolled',
  render: (args: ComponentProps<typeof ToggleDarkMode>) => (
    <ToggleDarkMode {...args} />
  ),
  args: {
    defaultChecked: false,
    checked: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled toggle that manages its own state internally.',
      },
    },
  },
})
