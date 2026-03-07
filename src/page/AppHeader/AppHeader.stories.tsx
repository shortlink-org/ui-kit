import type { ComponentProps } from 'react'
import preview from '#.storybook/preview'
import { fn } from 'storybook/test'
import { AppHeader } from './AppHeader'

const profileMenu = [
  { name: 'Workspace settings', href: '/settings' },
  { name: 'Billing', href: '/billing' },
  {
    name: 'Sign out',
    onClick: fn(),
    confirmDialog: {
      title: 'Sign out?',
      description: "You'll need to log in again to access your workspace.",
      confirmText: 'Sign out',
      variant: 'danger' as const,
    },
  },
]

const meta = preview.meta({
  title: 'Page/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

export const WorkspaceDashboard = meta.story({
  args: {
    sticky: true,
    workspaceLabel: 'Growth workspace',
    statusBadge: {
      label: 'Live',
      tone: 'success',
    },
    currentPath: '/dashboard',
    navigation: [
      { name: 'Dashboard', href: '/dashboard', badge: 'Live' },
      { name: 'Campaigns', href: '/campaigns', badge: '12' },
      { name: 'Links', href: '/links' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Audience', href: '/audience', badge: 'Beta' },
    ],
    showMenuButton: true,
    onMenuClick: fn(),
    showThemeToggle: true,
    showSecondMenu: true,
    secondMenuLabel: 'Explore',
    secondMenuItems: [
      {
        name: 'Reports',
        description: 'Performance, cohort and revenue reporting',
        href: '/reports',
      },
      {
        name: 'Automations',
        description: 'Trigger campaign actions based on events',
        href: '/automations',
      },
      {
        name: 'API tokens',
        description: 'Developer access and webhook credentials',
        href: '/tokens',
      },
    ],
    showSearch: true,
    searchProps: {
      placeholder: 'Search links, campaigns, or docs…',
      onSearch: fn(),
    },
    showNotifications: true,
    notifications: {
      count: 6,
      items: [
        {
          id: '1',
          title: 'Conversion spike',
          message: 'Your creator campaign is up 18% in the last hour.',
          time: '3 min ago',
        },
        {
          id: '2',
          title: 'Budget threshold reached',
          message: 'Retargeting campaign hit 80% of its daily budget.',
          time: '12 min ago',
        },
      ],
    },
    showProfile: true,
    profile: {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
      name: 'Sara Salah',
      email: 'sara@shortlink.org',
      menuItems: profileMenu,
    },
  },
  render: (args: ComponentProps<typeof AppHeader>) => (
    <div className="min-h-screen bg-[var(--color-background)]">
      <AppHeader {...args} />
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {['Live traffic', 'Paid media', 'Top creators'].map((card) => (
            <div
              key={card}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_22px_50px_-34px_rgba(15,23,42,0.45)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                {card}
              </p>
              <div className="mt-4 h-28 rounded-[1.25rem] bg-[var(--color-muted)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
})

export const CommerceControlCenter = meta.story({
  args: {
    workspaceLabel: 'Seller operations',
    statusBadge: {
      label: 'Q1 launch',
      tone: 'accent',
    },
    currentPath: '/catalog',
    navigation: [
      { name: 'Overview', href: '/overview' },
      { name: 'Catalog', href: '/catalog', badge: '128' },
      { name: 'Orders', href: '/orders', badge: '19' },
      { name: 'Leaderboard', href: '/leaderboard' },
    ],
    showMenuButton: true,
    onMenuClick: fn(),
    showThemeToggle: true,
    showSearch: true,
    searchProps: {
      placeholder: 'Search SKU, seller, or customer…',
      onSearch: fn(),
    },
    showNotifications: true,
    notifications: {
      count: 3,
    },
    showProfile: true,
    profile: {
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop',
      name: 'John Doe',
      email: 'john@example.com',
      menuItems: profileMenu,
    },
  },
})

export const SignedOutMarketing = meta.story({
  args: {
    brand: {
      name: 'Shortlink Cloud',
      href: '/',
    },
    workspaceLabel: 'Public site',
    currentPath: '/pricing',
    navigation: [
      { name: 'Product', href: '/product' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Docs', href: '/docs' },
    ],
    showMenuButton: false,
    showThemeToggle: true,
    showSearch: false,
    showNotifications: false,
    showProfile: false,
    showLogin: true,
    loginButton: {
      href: '/auth/login',
      label: 'Log in',
    },
  },
})

export const MobileControlCenter = meta.story({
  args: {
    workspaceLabel: 'Mobile workspace',
    statusBadge: {
      label: 'Live',
      tone: 'warning',
    },
    currentPath: '/campaigns',
    navigation: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Campaigns', href: '/campaigns' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Settings', href: '/settings' },
    ],
    showMenuButton: false,
    showThemeToggle: false,
    showSearch: false,
    showNotifications: true,
    notifications: {
      count: 2,
    },
    showProfile: true,
    profile: {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
      name: 'Sara Salah',
      menuItems: profileMenu,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
})
