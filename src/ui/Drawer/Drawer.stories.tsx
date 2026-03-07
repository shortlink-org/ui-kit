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
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'close' },
    title: { control: 'text' },
    children: { control: { disable: true } },
    position: {
      control: 'radio',
      options: ['left', 'right', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: { control: 'boolean' },
    contentScrollable: { control: 'boolean' },
    panelClassName: { control: 'text' },
    backdropClassName: { control: 'text' },
    titleClassName: { control: 'text' },
    contentClassName: { control: 'text' },
  },
  args: {
    position: 'right',
    size: 'md',
    showCloseButton: true,
    contentScrollable: true,
  },
})

export default meta

function DrawerWrapper(args: Omit<DrawerProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer {...args} open={open} onClose={setOpen} />
    </div>
  )
}

export const WorkspaceSidePanel = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Campaign filters',
    position: 'right',
    size: 'md',
    children: (
      <div className="space-y-4">
        <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
            Audience segment
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Filter by creator cohorts, campaign source and conversion quality.
          </p>
        </div>
        <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
            Date range
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Compare last 7, 30 or 90 days without leaving the workspace.
          </p>
        </div>
        <Button variant="primary" onClick={() => undefined}>
          Apply filters
        </Button>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Open drawer/i })
    await userEvent.click(button)
    await expect(canvas.getByText('Campaign filters')).toBeInTheDocument()
  },
})

export const MobileBottomSheet = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Navigation',
    position: 'bottom',
    size: 'lg',
    children: (
      <div className="space-y-3">
        {['Overview', 'Catalog', 'Orders', 'Leaderboard'].map((item) => (
          <button
            key={item}
            type="button"
            className="flex w-full items-center justify-between rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left text-sm font-medium text-[var(--color-foreground)]"
          >
            <span>{item}</span>
            <span className="text-[var(--color-muted-foreground)]">Open</span>
          </button>
        ))}
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
})

export const ScrollableDetails = meta.story({
  render: (args: ComponentProps<typeof Drawer>) => <DrawerWrapper {...args} />,
  args: {
    title: 'Order timeline',
    position: 'right',
    size: 'lg',
    children: (
      <div className="space-y-3">
        {Array.from({ length: 16 }, (_, index) => (
          <div
            key={index}
            className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
              Event {index + 1}
            </h4>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              This story validates long, scrollable content inside the drawer
              rather than another size or position permutation.
            </p>
          </div>
        ))}
      </div>
    ),
  },
})
