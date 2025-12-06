import preview from '#.storybook/preview'
import Sidebar, { type SidebarSection } from './Sidebar'
import AddLinkIcon from '@mui/icons-material/AddLink'
import ListIcon from '@mui/icons-material/List'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

const meta = preview.meta({
  title: 'Page/Sidebar',
  component: Sidebar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
})

export const Default = meta.story({
  args: {
    mode: 'full',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    let className = 'h-screen w-96'

    if (args.mode === 'mini') {
      className = 'h-screen w-14'
    }

    return (
      <div className={className}>
        <Sidebar {...args} />
      </div>
    )
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

export const WithCustomSections = meta.story({
  args: {
    mode: 'full',
    sections: [
      {
        type: 'simple',
        items: [
          {
            url: '/dashboard',
            icon: <ListIcon />,
            name: 'Dashboard',
          },
          {
            url: '/projects',
            icon: <AddLinkIcon />,
            name: 'Projects',
          },
          {
            url: '/settings',
            icon: <SettingsIcon />,
            name: 'Settings',
          },
        ],
      },
      {
        type: 'collapsible',
        icon: AdminPanelSettingsIcon,
        title: 'Administration',
        defaultCollapsed: false,
        items: [
          {
            url: '/admin/users',
            icon: <PersonIcon />,
            name: 'Users',
          },
          {
            url: '/admin/teams',
            icon: <GroupAddIcon />,
            name: 'Teams',
          },
        ],
      },
    ] as SidebarSection[],
    activePath: '/dashboard',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-80">
        <Sidebar {...args} />
      </div>
    )
  },
})

export const WithActivePath = meta.story({
  args: {
    mode: 'full',
    activePath: '/links',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-80">
        <Sidebar {...args} />
      </div>
    )
  },
})

export const Collapsed = meta.story({
  args: {
    mode: 'full',
    collapsed: true,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-14">
        <Sidebar {...args} />
      </div>
    )
  },
})

export const CustomWidth = meta.story({
  args: {
    mode: 'full',
    width: '16rem',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen" style={{ width: args.width }}>
        <Sidebar {...args} />
      </div>
    )
  },
})

export const WithCustomFooter = meta.story({
  args: {
    mode: 'full',
    footerSlot: (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Logout
        </button>
      </div>
    ),
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-80">
        <Sidebar {...args} />
      </div>
    )
  },
})

export const WithoutFooter = meta.story({
  args: {
    mode: 'full',
    footerSlot: null,
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-80">
        <Sidebar {...args} />
      </div>
    )
  },
})

export const StickyVariant = meta.story({
  args: {
    mode: 'full',
    variant: 'sticky',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-[200vh]">
        <div className="sticky top-0 w-80">
          <Sidebar {...args} />
        </div>
        <div className="p-8">
          <p className="mb-4">
            Scroll down to see the sticky sidebar behavior.
          </p>
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                Content block {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
})

export const MiniMode = meta.story({
  args: {
    mode: 'mini',
  },

  render: (args: Parameters<typeof Sidebar>[0]) => {
    return (
      <div className="h-screen w-14">
        <Sidebar {...args} />
      </div>
    )
  },
})
