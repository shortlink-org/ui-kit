import { fn, expect, within, userEvent } from 'storybook/test'
import preview from '#.storybook/preview'
import { FlyoutMenu } from './FlyoutMenu'
import type { FlyoutMenuItem, FlyoutMenuCallToAction } from './FlyoutMenu'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions: FlyoutMenuItem[] = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure",
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon,
  },
]

const callsToAction: FlyoutMenuCallToAction[] = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const meta = preview.meta({
  title: 'UI/FlyoutMenu',
  component: FlyoutMenu,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  args: {
    label: 'Solutions',
    items: solutions,
    callsToAction,
  },
  argTypes: {
    label: {
      control: 'text',
    },
    showChevron: {
      control: 'boolean',
    },
  },
})

export default meta

export const Default = meta.story({
  args: {
    label: 'Solutions',
    items: solutions,
    callsToAction,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /Solutions/i })
    await userEvent.click(button)
    // Wait for menu to appear
    await expect(canvas.getByText('Analytics')).toBeInTheDocument()
  },
})

export const WithoutCallToAction = meta.story({
  args: {
    label: 'Products',
    items: solutions,
    callsToAction: [],
  },
})

export const WithoutChevron = meta.story({
  args: {
    label: 'Menu',
    items: solutions,
    showChevron: false,
  },
})

export const SingleItem = meta.story({
  args: {
    label: 'Options',
    items: [solutions[0]],
    callsToAction: [],
  },
})

export const DarkBackground = meta.story({
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    label: 'Solutions',
    items: solutions,
    callsToAction,
  },
})

export const Interactive = meta.story({
  render: (args) => (
    <div className="p-8 bg-gray-900">
      <FlyoutMenu {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: args.label })
    await userEvent.click(button)
    await expect(canvas.getByText('Analytics')).toBeInTheDocument()
  },
})

