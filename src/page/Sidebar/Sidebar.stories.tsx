import * as React from 'react'
import preview from '#.storybook/preview'
import {
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { type SecondaryMenuItem } from './SecondaryMenu'
import Sidebar, { type SidebarSection } from './Sidebar'
import { SidebarShell } from './SidebarShell'

const commerceSections: SidebarSection[] = [
  {
    type: 'simple',
    items: [
      {
        url: '/dashboard',
        icon: <SparklesIcon />,
        name: 'Overview',
      },
      {
        url: '/catalog',
        icon: <ShoppingBagIcon />,
        name: 'Catalog',
      },
      {
        url: '/orders',
        icon: <ClipboardDocumentListIcon />,
        name: 'Orders',
      },
    ],
  },
  {
    type: 'collapsible',
    icon: MegaphoneIcon,
    title: 'Growth',
    items: [
      {
        url: '/growth/campaigns',
        icon: <MegaphoneIcon />,
        name: 'Campaigns',
      },
      {
        url: '/growth/audiences',
        icon: <UserGroupIcon />,
        name: 'Audiences',
      },
      {
        url: '/growth/messages',
        icon: <ChatBubbleLeftRightIcon />,
        name: 'Messages',
      },
    ],
  },
  {
    type: 'collapsible',
    icon: ShieldCheckIcon,
    title: 'Operations',
    defaultCollapsed: true,
    items: [
      {
        url: '/ops/inventory',
        icon: <CubeIcon />,
        name: 'Inventory',
      },
      {
        url: '/ops/billing',
        icon: <CircleStackIcon />,
        name: 'Billing',
      },
      {
        url: '/ops/alerts',
        icon: <BellAlertIcon />,
        name: 'Alerts',
      },
    ],
  },
]

const catalogSections: SecondaryMenuItem[] = [
  {
    url: '/catalog/collections',
    name: 'Collections',
  },
  {
    url: '/catalog/new-arrivals',
    name: 'New arrivals',
    badge: '18',
  },
  {
    url: '/catalog/pricing',
    name: 'Pricing rules',
  },
  {
    url: '/catalog/merchandising',
    name: 'Merchandising',
  },
]

const meta = preview.meta({
  title: 'Page/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: ['full', 'mini'],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['sticky', 'scrollable'],
    },
    collapsed: {
      control: {
        type: 'boolean',
      },
    },
  },
})

export default meta

const workspaceShellStyle: React.CSSProperties = {
  backgroundImage: [
    'radial-gradient(circle at top left, var(--color-status-accent-soft) 0%, transparent 28%)',
    'radial-gradient(circle at bottom right, color-mix(in srgb, var(--color-primary-300) 10%, transparent) 0%, transparent 26%)',
  ].join(', '),
}

function CommerceWorkspaceStory(args: React.ComponentProps<typeof Sidebar>) {
  const [activePath, setActivePath] = React.useState('/catalog/collections')

  const pathLink = React.useMemo(
    () =>
      function PathLink({
        href,
        children,
        className,
      }: {
        href: string
        children: React.ReactNode
        className?: string
      }) {
        return (
          <a
            href={href}
            className={className}
            onClick={(e) => {
              e.preventDefault()
              setActivePath(href)
            }}
          >
            {children}
          </a>
        )
      },
    [],
  )

  return (
    <div
      className="min-h-screen bg-[var(--color-background)] p-6"
      style={workspaceShellStyle}
    >
      <SidebarShell
        sidebar={{
          ...args,
          activePath,
          height: '100%',
          renderItem: ({ item, defaultRender }) => {
            const element = defaultRender()
            if (!React.isValidElement(element)) {
              return element
            }
            return React.cloneElement(element, {
              onClickCapture: (e: React.MouseEvent) => {
                e.preventDefault()
                setActivePath(item.url)
              },
            } as React.HTMLAttributes<HTMLElement>)
          },
        }}
        secondaryMenu={{
          parentLabel: 'Catalog',
          title: 'Catalog sections',
          items: catalogSections,
          activePath,
          sticky: true,
          stickyOffset: '0',
          LinkComponent: pathLink,
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
          Commerce OS
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-foreground)]">
          Catalog control center
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted-foreground)]">
          Primary + secondary rails via SidebarShell; в mini секциях список в
          flyout при наведении.
        </p>
      </SidebarShell>
    </div>
  )
}

export const CommerceWorkspace = meta.story({
  args: {
    mode: 'full',
    sections: commerceSections,
  },

  render: (args: React.ComponentProps<typeof Sidebar>) => (
    <CommerceWorkspaceStory {...args} />
  ),
})

export const MiniRail = meta.story({
  args: {
    mode: 'mini',
    activePath: '/catalog',
    sections: commerceSections,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => (
    <div className="min-h-screen bg-[var(--color-background)] p-6 sm:p-8">
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <Sidebar {...args} height="calc(100vh - 5rem)" />
      </div>
    </div>
  ),
})
