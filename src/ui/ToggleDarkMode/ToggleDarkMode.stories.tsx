import type { ComponentProps } from 'react'
import React, { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import preview from '#.storybook/preview'

import { AppHeader } from '../../page/AppHeader/AppHeader'
import { Button } from '../Button/Button'
import ToggleDarkMode from './ToggleDarkMode'

const meta = preview.meta({
  title: 'UI/ToggleDarkMode',
  component: ToggleDarkMode,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dark mode switch shown in real UI contexts. Stories focus on preference and header integration scenarios.',
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
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state for uncontrolled mode',
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the toggle',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when toggle state changes',
    },
    onClick: {
      control: false,
    },
  },
  args: {
    id: 'toggle-dark-mode',
    defaultChecked: false,
    ariaLabel: 'Toggle dark mode',
    onChange: fn(),
  },
})

export default meta

function ControlledToggle(args: ComponentProps<typeof ToggleDarkMode>) {
  const [checked, setChecked] = useState(
    args.checked ?? args.defaultChecked ?? false,
  )

  return (
    <ToggleDarkMode
      {...args}
      checked={checked}
      onChange={(nextChecked) => {
        setChecked(nextChecked)
        args.onChange?.(nextChecked)
      }}
    />
  )
}

export const PreferencePanel = meta.story({
  render: (args: ComponentProps<typeof ToggleDarkMode>) => {
    const Demo = () => {
      const [enabled, setEnabled] = useState(
        args.checked ?? args.defaultChecked ?? false,
      )

      return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Appearance preferences
            </p>
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Workspace theme mode
                </h2>
                <p className="max-w-xl text-sm leading-6 text-slate-600">
                  Let operators switch between light and dark appearance without
                  leaving the settings surface.
                </p>
              </div>
              <ControlledToggle
                {...args}
                checked={enabled}
                onChange={(nextChecked) => {
                  setEnabled(nextChecked)
                  args.onChange?.(nextChecked)
                }}
              />
            </div>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_62px_-38px_rgba(15,23,42,0.42)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Current state
            </p>
            <div className="mt-5 space-y-3">
              <p
                className="text-lg font-medium text-white"
                data-testid="theme-state"
              >
                {enabled ? 'Dark mode enabled' : 'Light mode enabled'}
              </p>
              <p className="text-sm leading-6 text-slate-300">
                The component remains visually unchanged; this story only makes
                its product usage clearer.
              </p>
            </div>
          </aside>
        </div>
      )
    }

    return <Demo />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('switch', { name: /toggle dark mode/i })
    await userEvent.click(toggle)
    await expect(canvas.getByTestId('theme-state')).toHaveTextContent(
      /dark mode enabled/i,
    )
  },
})

export const HeaderControlCluster = meta.story({
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="min-h-screen w-full">
        <AppHeader
          fullWidth
          className="-mx-4 sm:-mx-6 lg:-mx-8"
          workspaceLabel="Workspace shell"
          showMenuButton
          showSearch
          showNotifications
          notifications={{ count: 3 }}
          showProfile
          profile={{
            avatar:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
            name: 'Sara Salah',
            email: 'sara@shortlink.org',
            menuItems: [
              { name: 'Workspace settings', href: '#' },
              { name: 'Billing', href: '#' },
              { name: 'Sign out', onClick: () => undefined },
            ],
          }}
          navigation={[
            { name: 'Overview', href: '#' },
            { name: 'Analytics', href: '#' },
            { name: 'Catalog', href: '#' },
          ]}
          currentPath="#"
          rightSlot={
            <div className="flex items-center gap-3">
              <ToggleDarkMode
                id="header-toggle"
                checked={checked}
                onChange={setChecked}
              />
              <Button variant="outline" size="sm">
                Invite team
              </Button>
            </div>
          }
        />

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-54px_rgba(15,23,42,0.24)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Header integration
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            ToggleDarkMode inside a real header control cluster, paired with the
            other workspace controls instead of a synthetic demo row.
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
  },
})
