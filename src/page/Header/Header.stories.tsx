import type { ComponentProps } from 'react'
import preview from '#.storybook/preview'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import Header from './Header'

const meta = preview.meta({
  title: 'Page/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

export const CommerceOverview = meta.story({
  args: {
    eyebrow: 'Revenue cockpit',
    title: 'Catalog growth and campaign performance in one control surface',
    description:
      'Use the page header as a strategic summary block with actions, context and KPI chips instead of a plain title row.',
    stats: [
      { label: 'Gross merchandise value', value: '$482K' },
      { label: 'Conversion uplift', value: '+18.4%' },
      { label: 'Open experiments', value: '12' },
    ],
    secondaryAction: {
      label: 'Export report',
      handler: () => undefined,
      variant: 'secondary',
    },
    primaryAction: {
      label: 'Launch campaign',
      handler: () => undefined,
      variant: 'primary',
    },
  },
  render: (args: ComponentProps<typeof Header>) => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-6 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto max-w-6xl">
        <Header {...args} />
      </div>
    </div>
  ),
})

export const CompactControlBar = meta.story({
  args: {
    title: 'Warehouse alerts',
    description:
      'A denser page header still keeps the same visual language and action grouping.',
    secondaryAction: {
      label: 'Mute all',
      handler: () => undefined,
      customNode: (
        <button className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]">
          <BellAlertIcon className="size-4" />
          Notify team
        </button>
      ),
    },
    primaryAction: {
      label: 'Resolve',
      handler: () => undefined,
      variant: 'primary',
    },
  },
  render: (args: ComponentProps<typeof Header>) => (
    <div className="min-h-screen bg-[var(--color-background)] p-6">
      <div className="mx-auto max-w-4xl">
        <Header {...args} />
      </div>
    </div>
  ),
})
