import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowPathIcon,
  ChartBarSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import { FeatureCard } from './FeatureCard'

const meta: Meta<typeof FeatureCard> = {
  title: 'Card/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    linkColor: {
      control: 'select',
      options: [
        'indigo',
        'purple',
        'blue',
        'green',
        'red',
        'yellow',
        'pink',
        'teal',
        'cyan',
        'orange',
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    icon: <LinkIcon className="size-8" />,
    title: 'URL Shortener',
    description:
      'Launch branded short links, campaign aliases, and vanity URLs without sending users through ad-heavy redirects.',
    linkText: 'Explore links',
    href: '#',
    eyebrow: 'Growth tool',
    metric: '99.9% uptime',
  },
}

export const FeatureGrid: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-14 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Platform features
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Feature cards as a real product-marketing section
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
            This showcase demonstrates the card in a realistic landing-page grid
            instead of isolated one-off color variants.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={<LinkIcon className="size-8" />}
            title="Branded links"
            description="Publish memorable short URLs for campaigns, affiliates, and creator traffic without sacrificing trust."
            linkText="Explore links"
            href="#"
            eyebrow="Acquisition"
            metric="48% higher CTR"
            iconGradient={{ from: 'blue-500', to: 'cyan-600' }}
            decorationGradient={{ from: 'blue-500/10', to: 'cyan-500/5' }}
            linkColor="cyan"
          />
          <FeatureCard
            icon={<ChartBarSquareIcon className="size-8" />}
            title="Live analytics"
            description="Track campaign performance, regional demand, referrers, and conversion quality with a single reporting surface."
            linkText="View analytics"
            href="#"
            eyebrow="Insights"
            metric="Realtime"
            iconGradient={{ from: 'orange-500', to: 'red-600' }}
            decorationGradient={{ from: 'orange-500/10', to: 'red-500/5' }}
            linkColor="orange"
          />
          <FeatureCard
            icon={<ArrowPathIcon className="size-8" />}
            title="Fast sync"
            description="Keep your links, tags, and routing rules aligned across teams, devices, and integrated systems."
            linkText="See integrations"
            href="#"
            eyebrow="Operations"
            metric="12 integrations"
            iconGradient={{ from: 'green-500', to: 'teal-600' }}
            decorationGradient={{ from: 'green-500/10', to: 'teal-500/5' }}
            linkColor="teal"
          />
        </div>
      </div>
    </div>
  ),
}
