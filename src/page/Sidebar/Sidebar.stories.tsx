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
import { SecondaryMenu, type SecondaryMenuItem } from './SecondaryMenu'
import Sidebar, { type SidebarSection } from './Sidebar'

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

export const CommerceWorkspace = meta.story({
  args: {
    mode: 'full',
    activePath: '/catalog',
    sections: commerceSections,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-6 dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto flex max-w-7xl gap-0">
        <div className="w-[320px] shrink-0">
          <Sidebar {...args} height="calc(100vh - 3rem)" />
        </div>

        <div className="w-[320px] shrink-0">
          <SecondaryMenu
            parentLabel="Catalog"
            title="Catalog sections"
            items={catalogSections}
            activePath="/catalog/collections"
            sticky
            stickyOffset="0"
            className="-ml-px h-[calc(100vh-3rem)]"
          />
        </div>

        <div className="flex-1 rounded-r-[2rem] border border-white/50 bg-white/70 p-8 shadow-[0_30px_90px_-56px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
            Commerce OS
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Catalog control center
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            This story shows the primary workspace rail next to a secondary
            contextual rail. It is useful for catalog and operations tools where
            one menu sets the domain and the second menu scopes the active
            workflow.
          </p>
        </div>
      </div>
    </div>
  ),
})

export const MiniRail = meta.story({
  args: {
    mode: 'mini',
    activePath: '/catalog',
    sections: commerceSections,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => (
    <div className="flex min-h-screen items-start justify-center bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-8 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <Sidebar {...args} height="calc(100vh - 4rem)" />
    </div>
  ),
})

export const StickyKnowledgeBase = meta.story({
  args: {
    mode: 'full',
    variant: 'sticky',
    activePath: '/ops/inventory',
    sections: commerceSections,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => (
    <div className="mx-auto flex min-h-[200vh] max-w-6xl gap-8 bg-[var(--color-background)] px-6 py-8">
      <div className="w-[320px] shrink-0">
        <Sidebar {...args} height="calc(100vh - 4rem)" />
      </div>

      <div className="flex-1 space-y-6">
        {Array.from({ length: 10 }, (_, index) => (
          <article
            key={index}
            className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.35)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              Documentation module {index + 1}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-[var(--color-foreground)]">
              Operational runbook and escalation flow
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted-foreground)]">
              Sticky mode keeps the sidebar locked while dense content scrolls
              next to it. This story validates the shell, the shadow treatment
              and the navigation legibility during long reading sessions.
            </p>
          </article>
        ))}
      </div>
    </div>
  ),
})
