import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Card/StatCard',
  component: StatCard,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Showcase: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-14 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Metric cards
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Stat cards as a reusable dashboard primitive
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
            Use the card for KPI strips, summary widgets and leaderboard stat
            clusters without rebuilding the same layout each time.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Gross volume"
            value="$842K"
            change="+12.4%"
            tone="accent"
          />
          <StatCard
            label="Orders fulfilled"
            value="1,284"
            change="+8.1%"
            tone="success"
          />
          <StatCard
            label="Avg. conversion"
            value="6.8%"
            change="+0.4pp"
            tone="warning"
          />
          <StatCard
            label="Escalations"
            value="07"
            change="watch"
            tone="danger"
          />
        </div>
      </div>
    </div>
  ),
}
