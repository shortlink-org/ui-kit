import {
  BoltIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  MegaphoneIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import preview from '#.storybook/preview'

import Timeline, { type TimelineProps } from './Timeline'

const meta = preview.meta({
  title: 'UI/Timeline',
  component: Timeline,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1600],
    },
  },
})

export default meta

export const CommerceLaunchTimeline = meta.story({
  render: (args: TimelineProps) => (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_-56px_rgba(15,23,42,0.22)] sm:p-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-700">
            Release operations
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Marketplace expansion launch
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            A single timeline story with product, campaign and operations
            milestones instead of isolated dummy events.
          </p>
        </div>

        <Timeline {...args} />
      </div>
    </div>
  ),
  args: {
    items: [
      {
        id: 'campaign',
        date: 'Mar 03, 2026',
        name: 'Campaign team',
        action: 'scheduled the category launch wave',
        content:
          'Creative, paid media and onsite placements were aligned for the three fastest-growing catalog lanes before the regional rollout.',
        icon: <MegaphoneIcon className="size-5" />,
        badge: 'Go-live',
        meta: 'Performance marketing',
        highlighted: true,
      },
      {
        id: 'inventory',
        date: 'Mar 04, 2026',
        name: 'Inventory sync',
        action: 'verified supplier stock and lead times',
        content:
          'The operations team confirmed buffer stock, fast-moving bundles and fallback warehouses across the new assortment.',
        icon: <TruckIcon className="size-5" />,
        badge: 'Ops ready',
        meta: 'Fulfillment reliability',
      },
      {
        id: 'analytics',
        date: 'Mar 05, 2026',
        name: 'Analytics cockpit',
        action: 'published the launch dashboard',
        content:
          'GMV, seller conversion, checkout drop-off and category-level pacing are now streaming into a shared workspace for the launch squad.',
        icon: <ChartBarIcon className="size-5" />,
        badge: 'Live metrics',
        meta: 'Data instrumentation',
      },
      {
        id: 'automation',
        date: 'Mar 06, 2026',
        name: 'Risk automation',
        action: 'enabled payout and fraud monitors',
        content:
          'Escalation rules, payout anomaly checks and order abuse heuristics were activated ahead of the highest-traffic push window.',
        icon: <BoltIcon className="size-5" />,
        badge: 'Guardrails',
        meta: 'Trust and safety',
      },
      {
        id: 'post-launch',
        date: 'Mar 07, 2026',
        name: 'Launch review',
        action: 'closed the first-day readiness checklist',
        content:
          'The release was signed off with seller onboarding, customer support playbooks and recovery procedures documented for handoff.',
        icon: <CheckBadgeIcon className="size-5" />,
        badge: 'Completed',
        meta: 'Cross-functional handoff',
        highlighted: true,
      },
    ],
  },
})
