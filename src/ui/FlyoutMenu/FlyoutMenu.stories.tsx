import type React from 'react'
import { expect, userEvent, within } from 'storybook/test'
import preview from '#.storybook/preview'
import { FlyoutMenu } from './FlyoutMenu'
import type {
  FlyoutMenuCallToAction,
  FlyoutMenuSection,
} from './FlyoutMenu'
import {
  ArrowTrendingUpIcon,
  ChartPieIcon,
  ClockIcon,
  CubeTransparentIcon,
  PlayCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const sections: FlyoutMenuSection[] = [
  {
    title: 'Operate the marketplace',
    items: [
      {
        id: 'seller-insights',
        name: 'Seller insights',
        description:
          'Monitor GMV, retention and payout health across your top-performing merchants.',
        href: '#',
        icon: ChartPieIcon,
      },
      {
        id: 'campaigns',
        name: 'Campaign orchestration',
        description:
          'Launch category boosts, flash-sale lanes and promo rules without leaving the dashboard.',
        href: '#',
        icon: SparklesIcon,
      },
    ],
  },
  {
    title: 'Reliability and growth',
    items: [
      {
        id: 'inventory-sync',
        name: 'Inventory sync',
        description:
          'Keep supplier stock, lead times and bundle availability aligned in real time.',
        href: '#',
        icon: CubeTransparentIcon,
      },
      {
        id: 'risk-automation',
        name: 'Risk automation',
        description:
          'Flag suspicious orders, payout anomalies and checkout abuse before they escalate.',
        href: '#',
        icon: ShieldCheckIcon,
      },
      {
        id: 'growth-pacing',
        name: 'Growth pacing',
        description:
          'See which acquisition channels are lifting conversion by cohort and seasonality.',
        href: '#',
        icon: ArrowTrendingUpIcon,
      },
      {
        id: 'sla-monitoring',
        name: 'SLA monitoring',
        description:
          'Track support latency, shipping promises and incident recovery windows in one lane.',
        href: '#',
        icon: ClockIcon,
      },
    ],
  },
]

const callsToAction: FlyoutMenuCallToAction[] = [
  { name: 'Watch product tour', href: '#', icon: PlayCircleIcon },
  { name: 'Talk to platform team', href: '#', icon: PhoneIcon },
]

const meta = preview.meta({
  title: 'UI/FlyoutMenu',
  component: FlyoutMenu,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1600],
    },
  },
})

export default meta

export const CommerceNavigationFlyout = meta.story({
  args: {
    label: 'Platform',
    sections,
    callsToAction,
  },
  render: (args: React.ComponentProps<typeof FlyoutMenu>) => (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_-60px_rgba(15,23,42,0.28)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-900 text-lg font-semibold text-white">
              S
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Store operations
              </p>
              <p className="text-sm font-semibold text-slate-950">
                Commerce control center
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              Overview
            </a>
            <FlyoutMenu {...args} />
            <a
              href="#"
              className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              Orders
            </a>
            <a
              href="#"
              className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              Customers
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              label: 'Live sellers',
              value: '2,482',
              note: 'Managed across campaigns and payout windows',
            },
            {
              label: 'Revenue pulse',
              value: '$842K',
              note: 'Updated every 90 seconds from commerce events',
            },
            {
              label: 'Incident SLA',
              value: '99.92%',
              note: 'Automation and support routing are both healthy',
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.4)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                {card.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /platform/i })
    await userEvent.click(button)
    await expect(
      canvas.getByText('Seller insights'),
    ).toBeInTheDocument()
  },
})
