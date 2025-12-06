import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeatureCard } from './FeatureCard'

const meta: Meta<typeof FeatureCard> = {
  title: 'Card/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Icon element (SVG or component)',
    },
    title: {
      description: 'Card title',
      control: 'text',
    },
    description: {
      description: 'Card description',
      control: 'text',
    },
    linkText: {
      description: 'Optional link text',
      control: 'text',
    },
    iconGradient: {
      description: 'Icon background gradient colors',
    },
    decorationGradient: {
      description: 'Background decoration gradient colors',
    },
    linkColor: {
      description: 'Link text color',
      control: 'select',
      options: ['indigo', 'purple', 'blue', 'green', 'red', 'yellow', 'pink', 'teal', 'cyan', 'orange'],
    },
  },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

const LinkIcon = (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
)

const ChartIcon = (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const SyncIcon = (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

export const Default: Story = {
  args: {
    icon: LinkIcon,
    title: 'URL Shortener',
    description:
      'Free custom URL Shortener with many features that gives you better quality for links shortening. We do not display ads during direct redirecting to the original url.',
    linkText: 'Learn more',
    onLinkClick: () => alert('Link clicked!'),
  },
}

export const WithoutLink: Story = {
  args: {
    icon: ChartIcon,
    title: 'Reporting',
    description:
      'Our shortlink service can generate a comprehensive report on your vitals depending on your settings either daily, weekly, monthly, quarterly or yearly.',
  },
}

export const CustomColors: Story = {
  args: {
    icon: SyncIcon,
    title: 'Syncing',
    description:
      'Our shortlink service allows you to sync data across all your mobile devices whether iOS, Android or Windows OS.',
    linkText: 'Get started',
    onLinkClick: () => alert('Link clicked!'),
    iconGradient: { from: 'pink-500', to: 'rose-600' },
    decorationGradient: { from: 'pink-500/5', to: 'rose-500/5' },
    linkColor: 'pink',
  },
}

export const Purple: Story = {
  args: {
    icon: ChartIcon,
    title: 'Analytics Dashboard',
    description:
      'Track your link performance with detailed analytics. Monitor clicks, geographic data, referrers, and more in real-time.',
    linkText: 'View dashboard',
    onLinkClick: () => alert('Link clicked!'),
    iconGradient: { from: 'purple-500', to: 'pink-600' },
    decorationGradient: { from: 'purple-500/5', to: 'pink-500/5' },
    linkColor: 'purple',
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    icon: LinkIcon,
    title: 'URL Shortener',
    description:
      'Free custom URL Shortener with many features that gives you better quality for links shortening.',
    linkText: 'Learn more',
    onLinkClick: () => alert('Link clicked!'),
  },
}



