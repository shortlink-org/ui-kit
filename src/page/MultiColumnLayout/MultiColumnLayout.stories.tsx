import * as React from 'react'
import { clsx } from 'clsx'
import preview from '#.storybook/preview'
import {
  BellAlertIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { MultiColumnLayout, type ColumnConfig } from './MultiColumnLayout'
import { Sidebar, type SidebarSection } from '../Sidebar/Sidebar'
import { SecondaryMenu, type SecondaryMenuItem } from '../Sidebar/SecondaryMenu'
import { AppHeader } from '../AppHeader/AppHeader'
import { Header } from '../Header/Header'

const workspaceSections: SidebarSection[] = [
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
        icon: <ChartBarSquareIcon />,
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

const controlCenterMenu: Record<
  string,
  {
    title: string
    items: SecondaryMenuItem[]
    content: React.ReactNode
  }
> = {
  '/dashboard': {
    title: 'Overview',
    items: [
      { url: '/dashboard/revenue', name: 'Revenue' },
      { url: '/dashboard/funnel', name: 'Conversion funnel' },
      { url: '/dashboard/regions', name: 'Top regions', badge: '7' },
      { url: '/dashboard/retention', name: 'Retention' },
    ],
    content: (
      <DashboardCanvas
        eyebrow="Marketplace pulse"
        title="Revenue command center"
        description="A three-column shell with persistent workspace rails, compact action surfaces and a center canvas designed for dense decision-making."
      />
    ),
  },
  '/catalog': {
    title: 'Catalog',
    items: [
      { url: '/catalog/collections', name: 'Collections' },
      { url: '/catalog/new-arrivals', name: 'New arrivals', badge: '18' },
      { url: '/catalog/pricing', name: 'Pricing rules' },
      { url: '/catalog/merchandising', name: 'Merchandising' },
    ],
    content: (
      <DashboardCanvas
        eyebrow="Catalog studio"
        title="Merchandising and sell-through analysis"
        description="Use the content column as a fully composed page, not just as a blank slot. The header, metric cards and lists stay visually consistent with the surrounding rails."
      />
    ),
  },
  '/orders': {
    title: 'Orders',
    items: [
      { url: '/orders/live', name: 'Live queue', badge: '24' },
      { url: '/orders/disputes', name: 'Disputes' },
      { url: '/orders/returns', name: 'Returns', badge: '5' },
      { url: '/orders/finance', name: 'Finance' },
    ],
    content: (
      <DashboardCanvas
        eyebrow="Fulfillment stream"
        title="Order queue health and escalation tracking"
        description="The layout supports operational views just as well as executive dashboards. Left and right rails remain stable while the center switches context."
      />
    ),
  },
  '/growth/campaigns': {
    title: 'Campaigns',
    items: [
      { url: '/growth/campaigns/live', name: 'Live campaigns', badge: '6' },
      { url: '/growth/campaigns/attribution', name: 'Attribution' },
      { url: '/growth/campaigns/budget', name: 'Budget pacing' },
      { url: '/growth/campaigns/creative', name: 'Creative tests' },
    ],
    content: (
      <DashboardCanvas
        eyebrow="Growth engine"
        title="Campaign pacing, attribution and creative velocity"
        description="This is the primary showcase scenario for the refreshed multi-column system."
        headerClassName="[&>div:first-child]:hidden border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_22px_56px_-36px_rgba(15,23,42,0.2)] dark:shadow-[0_22px_56px_-36px_rgba(0,0,0,0.45)] [&_p.text-sky-600]:!text-[var(--color-muted-foreground)] dark:[&_p.text-sky-300]:!text-[var(--color-muted-foreground)]"
      />
    ),
  },
}

function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="flex min-h-0 w-full max-w-none flex-1 flex-col gap-3 sm:gap-4">
        {children}
      </div>
    </div>
  )
}

function WorkspaceSidebar({
  activePath,
  collapsed = false,
  onCollapsedChange,
  className,
}: {
  activePath: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}) {
  return (
    <Sidebar
      mode="full"
      collapsed={collapsed}
      onCollapsedChange={onCollapsedChange}
      variant="sticky"
      activePath={activePath}
      sections={workspaceSections}
      height="calc(100vh - 5rem)"
      className={className}
    />
  )
}

function MetricTile({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'positive' | 'accent'
}) {
  const toneClassName =
    tone === 'positive'
      ? 'text-emerald-600 dark:text-emerald-300'
      : tone === 'accent'
        ? 'text-sky-600 dark:text-sky-300'
        : 'text-[var(--color-foreground)]'

  return (
    <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface)]/92 p-4 shadow-[0_18px_48px_-36px_rgba(15,23,42,0.34)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        {label}
      </p>
      <p className={`mt-3 text-2xl font-semibold ${toneClassName}`}>
        {value}
      </p>
    </div>
  )
}

function DashboardCanvas({
  eyebrow,
  title,
  description,
  headerClassName,
}: {
  eyebrow: string
  title: string
  description: string
  headerClassName?: string
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4 sm:p-5">
      <Header
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={headerClassName}
        stats={[
          { label: 'Gross revenue', value: '$482K' },
          { label: 'Conversion lift', value: '+18.4%' },
          { label: 'Open tests', value: '12' },
        ]}
        secondaryAction={{
          label: 'Export',
          handler: () => undefined,
          variant: 'secondary',
        }}
        primaryAction={{
          label: 'Launch experiment',
          handler: () => undefined,
          variant: 'primary',
        }}
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.32)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                Performance curve
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-foreground)]">
                Revenue by channel
              </h3>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-300">
              +12.8% week over week
            </span>
          </div>

          <div className="mt-6 grid h-60 grid-cols-12 items-end gap-2">
            {[36, 44, 38, 56, 61, 72, 66, 84, 76, 92, 88, 98].map((height, index) => (
              <div key={index} className="flex h-full items-end">
                <div
                  className="w-full rounded-t-2xl bg-[linear-gradient(180deg,rgba(56,189,248,0.2)_0%,rgba(14,165,233,0.82)_100%)]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <MetricTile label="Average order value" value="$124.80" tone="accent" />
          <MetricTile label="Fulfillment SLA" value="98.2%" tone="positive" />
          <MetricTile label="Refund pressure" value="1.8%" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Live signals
          </p>
          <div className="mt-4 space-y-3">
            {[
              ['Flash sale', '8,422 sessions in the last hour'],
              ['Top seller', 'Studio Nord now drives 18% of GMV'],
              ['Risk alert', 'Returns rising in footwear for EU markets'],
            ].map(([label, detail]) => (
              <div
                key={label}
                className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 p-4"
              >
                <p className="text-sm font-semibold text-[var(--color-foreground)]">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Priorities
          </p>
          <div className="mt-4 space-y-3">
            {[
              ['Reprice best sellers', 'Merchandising', 'Today'],
              ['Approve creator payout', 'Finance', '2h'],
              ['Review shipping SLA dip', 'Operations', 'Now'],
            ].map(([label, owner, eta]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {label}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                    {owner}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">
                  {eta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightsRail() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4">
      <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-background)]/72 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Team focus
        </p>
        <h3 className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">
          3 approvals need attention
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
          Pricing, creator payout and inventory transfer are waiting for review.
        </p>
      </div>

      <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-background)]/72 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Alert stream
        </p>
        <div className="mt-4 space-y-3">
          {[
            'Delayed deliveries crossed threshold in Berlin',
            'Top campaign exhausted 78% of budget',
            'Seller leaderboard updated 12 minutes ago',
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm leading-6 text-[var(--color-muted-foreground)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AppChrome({
  children,
  currentPath = '/growth/campaigns',
  onMenuClick,
  LinkComponent,
}: {
  children?: React.ReactNode
  currentPath?: string
  onMenuClick?: () => void
  LinkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
  }>
}) {
  return (
    <>
      <AppHeader
        className="-mx-3 sm:-mx-4 lg:-mx-6"
        fullWidth
        sticky
        workspaceLabel="Marketplace workspace"
        statusBadge={{ label: 'Live', tone: 'success' }}
        showMenuButton
        onMenuClick={onMenuClick}
        showThemeToggle
        showSearch
        showNotifications
        notifications={{ count: 4 }}
        showProfile
        profile={{
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
          name: 'Nadia Li',
          email: 'nadia@marketplace.com',
          menuItems: [
            { name: 'Workspace settings', href: '/settings' },
            { name: 'Billing', href: '/billing' },
            { name: 'Sign out', onClick: () => undefined },
          ],
        }}
        navigation={[
          { name: 'Overview', href: '/dashboard' },
          { name: 'Catalog', href: '/catalog' },
          { name: 'Orders', href: '/orders', badge: 'Hot' },
          { name: 'Campaigns', href: '/growth/campaigns' },
        ]}
        currentPath={currentPath}
        LinkComponent={LinkComponent}
      />
      {children}
    </>
  )
}

const meta = preview.meta({
  title: 'Page/MultiColumnLayout',
  component: MultiColumnLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    stackAt: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    mobileDrawer: {
      control: false,
    },
    columns: {
      control: false,
    },
  },
})

export default meta

export const CommerceWorkbench = meta.story({
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

    const miniStacked =
      'xl:-translate-x-2 xl:[&>div]:ring-1 xl:[&>div]:ring-sky-200/50 xl:dark:[&>div]:ring-sky-400/30 xl:[&>div]:shadow-[0_28px_70px_-34px_rgba(56,189,248,0.32),0_18px_48px_-32px_rgba(15,23,42,0.12)]'

    const columns: ColumnConfig[] = [
      {
        id: 'sidebar',
        content: (
          <WorkspaceSidebar
            activePath="/growth/campaigns"
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            className={sidebarCollapsed ? miniStacked : undefined}
          />
        ),
        width: { xl: sidebarCollapsed ? '7rem' : '18rem' },
        surface: 'plain',
        sticky: true,
        stickyOffset: '5rem',
        className: clsx(
          'relative min-h-0',
          sidebarCollapsed &&
            'z-[5] xl:!overflow-visible max-xl:z-auto',
        ),
      },
      {
        id: 'main',
        content: controlCenterMenu['/growth/campaigns'].content,
        className: clsx(
          'relative min-h-0',
          sidebarCollapsed &&
            'z-30 xl:-ml-12 xl:pl-3 xl:!overflow-visible max-xl:z-auto max-xl:ml-0 max-xl:pl-0',
        ),
      },
      {
        id: 'rail',
        content: <InsightsRail />,
        width: { xl: '22rem' },
        sticky: true,
        stickyOffset: '5rem',
        className: clsx(
          'relative min-h-0',
          sidebarCollapsed && 'z-[15] max-xl:z-auto',
        ),
      },
    ]

    return (
      <WorkspaceShell>
        <AppChrome
          currentPath="/growth/campaigns"
          onMenuClick={() => setSidebarCollapsed((value) => !value)}
        />
        <MultiColumnLayout
          columns={columns}
          gap="md"
          gridClassName="!pt-5 sm:!pt-6 lg:!pt-7"
          minHeight="min-h-[calc(100vh-8rem)]"
          stackAt="xl"
          mobileDrawer={{
            columns: [0, 2],
            title: 'Workspace panels',
            triggerLabel: 'Open panels',
            position: 'bottom',
          }}
        />
      </WorkspaceShell>
    )
  },
})

export const CommerceWithSecondaryRail = meta.story({
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
    const [secondaryCollapsed, setSecondaryCollapsed] = React.useState(false)

    const columns: ColumnConfig[] = [
      {
        id: 'sidebar',
        content: (
          <WorkspaceSidebar
            activePath="/catalog"
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            className="[&>div]:rounded-r-none [&>div]:border-r-0 [&>div]:shadow-[12px_0_34px_-28px_rgba(15,23,42,0.18)]"
          />
        ),
        width: { xl: sidebarCollapsed ? '7rem' : '18rem' },
        surface: 'plain' as const,
        sticky: true,
        stickyOffset: '5rem',
      },
      {
        id: 'secondary',
        content: (
          <SecondaryMenu
            parentLabel="Catalog"
            title="Catalog sections"
            items={controlCenterMenu['/catalog'].items}
            activePath="/catalog/collections"
            collapsed={secondaryCollapsed}
            onCollapsedChange={setSecondaryCollapsed}
            className="-ml-px z-10"
          />
        ),
        width: { xl: secondaryCollapsed ? '4.75rem' : '23rem' },
        surface: 'plain',
        sticky: true,
        stickyOffset: '5rem',
      },
      {
        id: 'main',
        content: controlCenterMenu['/catalog'].content,
        className:
          '-ml-px rounded-l-none border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] shadow-[22px_0_56px_-42px_rgba(15,23,42,0.18)]',
      },
    ]

    return (
      <WorkspaceShell>
        <AppChrome
          currentPath="/catalog"
          onMenuClick={() => setSidebarCollapsed((value) => !value)}
        />
        <MultiColumnLayout
          columns={columns}
          gap="none"
          minHeight="min-h-[calc(100vh-8rem)]"
          stackAt="xl"
          mobileDrawer={{
            columns: [0, 1],
            title: 'Navigation',
            triggerLabel: 'Open navigation',
            position: 'bottom',
          }}
        />
      </WorkspaceShell>
    )
  },
})

export const InteractiveWorkspace = meta.story({
  render: () => {
    const [activePath, setActivePath] = React.useState('/growth/campaigns')
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
    const [secondaryCollapsed, setSecondaryCollapsed] = React.useState(false)

    const currentMenu =
      controlCenterMenu[activePath] ??
      controlCenterMenu[
        Object.keys(controlCenterMenu).find((path) =>
          activePath.startsWith(`${path}/`),
        ) || '/growth/campaigns'
      ]

    const LinkBridge: React.ComponentType<{
      href: string
      children: React.ReactNode
      className?: string
    }> = ({ href, children, className }) => (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          event.preventDefault()
          setActivePath(href)
        }}
      >
        {children}
      </a>
    )

    const columns: ColumnConfig[] = [
      {
        id: 'sidebar',
        content: (
          <WorkspaceSidebar
            activePath={activePath}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />
        ),
        width: { xl: sidebarCollapsed ? '7rem' : '18rem' },
        surface: 'plain',
        sticky: true,
        stickyOffset: '5rem',
      },
      {
        id: 'secondary',
        content: (
          <SecondaryMenu
            title={currentMenu.title}
            items={currentMenu.items}
            activePath={activePath}
            collapsed={secondaryCollapsed}
            onCollapsedChange={setSecondaryCollapsed}
            LinkComponent={LinkBridge}
          />
        ),
        width: { xl: secondaryCollapsed ? '4.75rem' : '22rem' },
        sticky: true,
        stickyOffset: '5rem',
      },
      {
        id: 'main',
        content: currentMenu.content,
      },
    ]

    return (
      <WorkspaceShell>
        <AppChrome
          currentPath={activePath}
          onMenuClick={() => setSidebarCollapsed((value) => !value)}
          LinkComponent={LinkBridge}
        />
        <MultiColumnLayout
          columns={columns}
          gap="none"
          minHeight="min-h-[calc(100vh-8rem)]"
          stackAt="xl"
          mobileDrawer={{
            columns: [0, 1],
            title: 'Workspace menus',
            triggerLabel: 'Open menus',
            position: 'bottom',
          }}
        />
      </WorkspaceShell>
    )
  },
})
