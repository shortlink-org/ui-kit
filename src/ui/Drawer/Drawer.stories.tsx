import { expect, within, userEvent } from 'storybook/test'
import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
import { Drawer } from './Drawer'
import type { DrawerProps } from './Drawer'
import { Button } from '../Button/Button'

const meta = preview.meta({
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
  },
})

export default meta

// Wrapper component for interactive stories
function DrawerWrapper(args: Omit<DrawerProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer {...args} open={open} onClose={setOpen} />
    </div>
  )
}

export const Default = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Panel title',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          Your content goes here. This is a simple example of drawer content.
        </p>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Open drawer/i })
    await userEvent.click(button)
    await expect(canvas.getByText('Panel title')).toBeInTheDocument()
  },
})

export const LeftPosition = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Left Drawer',
    position: 'left',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer opens from the left side.
        </p>
      </div>
    ),
  },
})

export const RightPosition = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Right Drawer',
    position: 'right',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer opens from the right side.
        </p>
      </div>
    ),
  },
})

export const BottomPosition = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Bottom Drawer',
    position: 'bottom',
    size: 'lg',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer slides from the bottom and works well for mobile layouts.
        </p>
      </div>
    ),
  },
})

export const SmallSize = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Small Drawer',
    size: 'sm',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This is a small drawer with max-width of 24rem.
        </p>
      </div>
    ),
  },
})

export const LargeSize = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Large Drawer',
    size: 'lg',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This is a large drawer with max-width of 32rem.
        </p>
      </div>
    ),
  },
})

export const FullSize = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Full Width Drawer',
    size: 'full',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer takes the full available width.
        </p>
      </div>
    ),
  },
})

export const WithoutCloseButton = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer doesn't have a close button. Click outside to close.
        </p>
      </div>
    ),
  },
})

export const WithoutTitle = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    children: (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Content without title prop
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This drawer doesn't use the title prop.
        </p>
      </div>
    ),
  },
})

export const WithRichContent = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Rich Content Example',
    children: (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Section 1
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This drawer contains multiple sections with rich content.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Section 2
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You can add any content you need inside the drawer.
          </p>
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={() => {}}>
            Action Button
          </Button>
        </div>
      </div>
    ),
  },
})

export const LongContent = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Scrollable Content',
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Item {i + 1}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is item number {i + 1}. The drawer should be scrollable when
              content exceeds the viewport height.
            </p>
          </div>
        ))}
      </div>
    ),
  },
})

export const DarkMode = meta.story({
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Dark Mode Drawer',
    children: (
      <div>
        <p className="text-gray-400">
          This drawer adapts to dark mode automatically.
        </p>
      </div>
    ),
  },
})
