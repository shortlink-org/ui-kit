import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { MultiColumnLayout, ColumnConfig } from './MultiColumnLayout'
import { Sidebar } from '../Sidebar/Sidebar'
import { SecondaryMenu, SecondaryMenuItem } from '../Sidebar/SecondaryMenu'
import { AppHeader } from '../AppHeader/AppHeader'

const meta: Meta<typeof MultiColumnLayout> = {
  title: 'Page/MultiColumnLayout',
  component: MultiColumnLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Array of column configurations',
    },
    className: {
      description: 'Optional className for the container',
      control: 'text',
    },
    gap: {
      description: 'Gap between columns',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    minHeight: {
      description: 'Minimum height of the layout container',
      control: 'text',
    },
    containerClassName: {
      description: 'Background color classes for the container',
      control: 'text',
    },
    stackAt: {
      description: 'Breakpoint at which columns stack vertically',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof MultiColumnLayout>

// Sample content components

const SampleMiddleContent = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Main Content
    </h2>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Content Item {item}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This is the main content area. You can place any content here, such
            as articles, lists, or interactive elements.
          </p>
        </div>
      ))}
    </div>
  </div>
)

const SampleRightContent = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Right Column
    </h2>
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Sidebar Item 1
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Additional information or actions can be placed here.
        </p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Sidebar Item 2
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This column is perfect for secondary content or widgets.
        </p>
      </div>
    </div>
  </div>
)

// Secondary menu items example (like in CodePen)
const secondaryMenuItems = [
  { url: '/users/activities', name: 'Activities' },
  { url: '/users/transfer', name: 'Transfer' },
  { url: '/users/budgets', name: 'Budgets' },
  { url: '/users/notifications', name: 'Notifications', badge: 3 },
  { url: '/users/cards', name: 'Cards' },
]

// Default three columns with real Sidebar - wrapped in function to create fresh instances
const getDefaultColumns = (): ColumnConfig[] => [
  {
    content: <Sidebar mode="full" />,
    className: 'border-r border-gray-200 dark:border-gray-700',
    span: 1,
  },
  {
    content: <SampleMiddleContent />,
    className: 'bg-white dark:bg-gray-900',
    span: 2, // Main content takes 2 columns
  },
  {
    content: <SampleRightContent />,
    className:
      'bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700',
    span: 1,
  },
]

// User profile content for secondary menu example
const UserProfileContent = () => (
  <div className="p-6">
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          MC
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mert Cukuren
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sales Department
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Account balance
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $2,794.00
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      {[
        {
          type: 'Card',
          where: 'PayPal',
          description: 'Subscription renewal',
          amount: '- $120.00',
          date: '24.12.2020 11:16 AM',
        },
        {
          type: 'Card',
          where: 'Microsoft',
          description: 'Subscription renewal',
          amount: '- $9.99',
          date: '24.12.2020 07:16 AM',
        },
        {
          type: 'Income',
          where: 'Client',
          description: 'Invoice payment',
          amount: '+ $1,200.00',
          date: '23.12.2020 14:30 PM',
        },
      ].map((activity, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                {activity.type}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activity.where}
              </span>
            </div>
            <span
              className={`text-sm font-semibold ${activity.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {activity.amount}
            </span>
          </div>
          <p className="text-sm text-gray-900 dark:text-white mb-1">
            {activity.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activity.date}
          </p>
        </div>
      ))}
    </div>
  </div>
)

export const Default: Story = {
  args: {
    columns: getDefaultColumns(),
    gap: 'md',
  },
}

export const WithSecondaryMenu: Story = {
  name: 'With Secondary Menu (Dashboard Style)',
  args: {
    columns: [
      {
        content: <Sidebar mode="full" />,
        className: 'border-r border-gray-200 dark:border-gray-700',
        sticky: true,
        stickyOffset: '0',
      },
      {
        content: (
          <SecondaryMenu
            title="USERS"
            items={secondaryMenuItems}
            sticky={true}
            stickyOffset="0"
          />
        ),
        className: 'border-r border-gray-200 dark:border-gray-700',
        sticky: true,
        stickyOffset: '0',
      },
      {
        content: <UserProfileContent />,
        className: 'bg-white dark:bg-gray-900',
      },
    ],
    gap: 'none', // No gap between menus for seamless connection
  },
}

export const TwoColumns: Story = {
  name: 'Two Columns Layout',
  args: {
    columns: [
      {
        content: <Sidebar mode="full" />,
        className: 'border-r border-gray-200 dark:border-gray-700',
        sticky: true,
        stickyOffset: '0',
        span: 1,
      },
      {
        content: <SampleMiddleContent />,
        className: 'bg-white dark:bg-gray-900',
        span: 3, // Content takes remaining space
      },
    ],
    gap: 'md',
  },
}

export const FourColumns: Story = {
  name: 'Four Columns Layout',
  args: {
    columns: [
      {
        content: (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Column 1
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Narrow sidebar
            </p>
          </div>
        ),
        className: 'border-r border-gray-200 dark:border-gray-700',
        span: 1,
      },
      {
        content: (
          <div className="p-4 bg-green-50 dark:bg-green-900/20">
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              Column 2
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Secondary menu
            </p>
          </div>
        ),
        className: 'border-r border-gray-200 dark:border-gray-700',
        span: 1,
      },
      {
        content: <SampleMiddleContent />,
        className: 'bg-white dark:bg-gray-900',
        span: 2, // Main content
      },
      {
        content: <SampleRightContent />,
        className:
          'bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700',
        span: 1,
      },
    ],
    gap: 'md',
  },
}

export const SingleColumn: Story = {
  name: 'Single Column (Full Width)',
  args: {
    columns: [
      {
        content: <SampleMiddleContent />,
        className: 'bg-white dark:bg-gray-900',
        span: 1,
      },
    ],
    gap: 'none',
  },
}

export const AsymmetricLayout: Story = {
  name: 'Asymmetric Layout (Wide Sidebar)',
  args: {
    columns: [
      {
        content: <Sidebar mode="full" />,
        className: 'border-r border-gray-200 dark:border-gray-700',
        sticky: true,
        stickyOffset: '0',
        span: 2, // Wider sidebar
      },
      {
        content: <SampleMiddleContent />,
        className: 'bg-white dark:bg-gray-900',
        span: 3, // Content area
      },
    ],
    gap: 'md',
  },
}

export const WithStickySidebar: Story = {
  args: {
    columns: [
      {
        content: <Sidebar mode="full" />,
        className: 'border-r border-gray-200 dark:border-gray-700',
        sticky: true,
        stickyOffset: '0',
      },
      {
        content: <SampleMiddleContent />,
        className: 'bg-white dark:bg-gray-900',
      },
      {
        content: <SampleRightContent />,
        className:
          'bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700',
      },
    ],
    gap: 'md',
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    columns: [
      {
        content: <Sidebar mode="full" />,
        className: 'border-r border-gray-700',
        sticky: true,
        stickyOffset: '0',
      },
      {
        content: (
          <SecondaryMenu
            title="MENU"
            items={secondaryMenuItems}
            sticky={true}
            stickyOffset="0"
          />
        ),
        className: 'border-r border-gray-700',
        sticky: true,
        stickyOffset: '0',
      },
      {
        content: <UserProfileContent />,
        className: 'bg-gray-900',
      },
    ],
    gap: 'none',
  },
}

// Interactive dashboard with dynamic secondary menu
interface MenuStructure {
  [path: string]: {
    title: string
    items: SecondaryMenuItem[]
    content: React.ReactNode
  }
}

const InteractiveExample = () => {
  const [activePath, setActivePath] = useState<string>('/links')

  // Define menu structure - maps Sidebar paths to secondary menu
  const menuStructure: MenuStructure = {
    '/add-link': {
      title: 'ADD LINK',
      items: [
        { url: '/add-link/bulk', name: 'Bulk Import' },
        { url: '/add-link/quick', name: 'Quick Add' },
        { url: '/add-link/schedule', name: 'Schedule' },
        { url: '/add-link/templates', name: 'Templates' },
      ],
      content: (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Add Link
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add new links and manage URL settings.
          </p>
        </div>
      ),
    },
    '/links': {
      title: 'LINKS',
      items: [
        { url: '/links/all', name: 'All Links' },
        { url: '/links/active', name: 'Active', badge: 42 },
        { url: '/links/expired', name: 'Expired' },
        { url: '/links/analytics', name: 'Analytics' },
        { url: '/links/archived', name: 'Archived' },
      ],
      content: <UserProfileContent />,
    },
    '/profile': {
      title: 'PROFILE',
      items: [
        { url: '/profile/settings', name: 'Settings' },
        { url: '/profile/security', name: 'Security' },
        { url: '/profile/preferences', name: 'Preferences' },
        { url: '/profile/notifications', name: 'Notifications', badge: 3 },
      ],
      content: (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile and account settings.
          </p>
        </div>
      ),
    },
    '/admin/users': {
      title: 'ADMIN - USERS',
      items: [
        { url: '/admin/users/list', name: 'All Users' },
        { url: '/admin/users/pending', name: 'Pending', badge: 5 },
        { url: '/admin/users/roles', name: 'Roles' },
        { url: '/admin/users/permissions', name: 'Permissions' },
      ],
      content: (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users and their permissions.
          </p>
        </div>
      ),
    },
    '/admin/links': {
      title: 'ADMIN - LINKS',
      items: [
        { url: '/admin/links/moderation', name: 'Moderation', badge: 12 },
        { url: '/admin/links/reports', name: 'Reports' },
        { url: '/admin/links/analytics', name: 'Analytics' },
      ],
      content: (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Link Administration
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Admin tools for link management.
          </p>
        </div>
      ),
    },
    '/admin/groups': {
      title: 'ADMIN - GROUPS',
      items: [
        { url: '/admin/groups/list', name: 'All Groups' },
        { url: '/admin/groups/create', name: 'Create Group' },
        { url: '/admin/groups/members', name: 'Members' },
      ],
      content: (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Group Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user groups and memberships.
          </p>
        </div>
      ),
    },
  }

  // Find matching menu structure by active path
  // Match exact path or find parent path (e.g., /admin/users/something -> /admin/users)
  const getCurrentMenu = (path: string) => {
    if (menuStructure[path]) {
      return menuStructure[path]
    }
    // Try to find parent path
    const pathParts = path.split('/').filter(Boolean)
    for (let i = pathParts.length; i > 0; i--) {
      const parentPath = '/' + pathParts.slice(0, i).join('/')
      if (menuStructure[parentPath]) {
        return menuStructure[parentPath]
      }
    }
    // Default fallback
    return menuStructure['/links']
  }

  const currentMenu = getCurrentMenu(activePath)

  // Navigation items for AppHeader
  const navigationItems = [
    { name: 'Add Link', href: '/add-link' },
    { name: 'Links', href: '/links' },
    { name: 'Profile', href: '/profile' },
  ]

  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Create custom Sidebar wrapper function that returns JSX (not a component)
  const createCustomSidebar = (
    activePath: string,
    setActivePath: (path: string) => void,
  ) => {
    const handleLinkClick = (e: React.MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a')
      if (link?.href) {
        try {
          const url = new URL(link.href)
          const path = url.pathname
          setActivePath(path)
        } catch {
          // Ignore invalid URLs
        }
      }
    }

    return (
      <div
        onClick={handleLinkClick}
        className="w-full max-w-full lg:max-w-xs h-full"
      >
        <Sidebar mode="full" activePath={activePath} />
      </div>
    )
  }

  // Build columns conditionally based on sidebarOpen state
  const columns: ColumnConfig[] = [
    // Sidebar column - only shown when sidebarOpen is true
    ...(sidebarOpen
      ? [
          {
            content: createCustomSidebar(activePath, setActivePath),
            className: 'border-r border-gray-200 dark:border-gray-700',
            sticky: true,
            stickyOffset: '0',
          },
        ]
      : []),
    {
      content: (
        <SecondaryMenu
          title={currentMenu.title}
          items={currentMenu.items}
          sticky={true}
          stickyOffset="0"
          activePath={activePath}
        />
      ),
      className: 'border-r border-gray-200 dark:border-gray-700',
      sticky: true,
      stickyOffset: '0',
    },
    {
      content: (
        <div className="w-full h-full overflow-y-auto">
          {currentMenu.content}
        </div>
      ),
      className: 'bg-white dark:bg-gray-900',
    },
  ]

  // Custom Link component that syncs with activePath
  const CustomLink: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
  }> = ({ href, children, className, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setActivePath(href)
    }
    return (
      <a href={href} onClick={handleClick} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <AppHeader
        navigation={navigationItems}
        currentPath={activePath}
        showMenuButton={true}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        showThemeToggle={true}
        showSearch={true}
        searchProps={{
          placeholder: 'Search links...',
          onSearch: (query) => console.log('Search:', query),
        }}
        showNotifications={true}
        notifications={{
          count: 3,
        }}
        showProfile={true}
        profile={{
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
          name: 'Mert Cukuren',
          email: 'mert@example.com',
          menuItems: [
            { name: 'Your Profile', href: '/profile' },
            { name: 'Settings', href: '/settings' },
            { name: 'Sign out', onClick: () => console.log('Sign out') },
          ],
        }}
        LinkComponent={CustomLink}
      />
      <div className="flex-1 overflow-hidden">
        <MultiColumnLayout columns={columns} gap="none" />
      </div>
    </div>
  )
}

export const Interactive: Story = {
  name: 'Interactive (Dynamic Secondary Menu)',
  render: () => <InteractiveExample />,
}
