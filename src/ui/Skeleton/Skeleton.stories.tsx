import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { CardSkeleton } from './CardSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="w-48 h-4" />,
}

export const Circular: Story = {
  render: () => <Skeleton circular className="w-16 h-16" />,
}

export const CustomSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width={200} height={20} />
      <Skeleton width={150} height={20} />
      <Skeleton width={100} height={20} />
    </div>
  ),
}

export const Card: StoryObj<typeof CardSkeleton> = {
  render: (args) => <CardSkeleton {...args} />,
  args: {
    maxWidth: 'md',
  },
}

export const CardVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <CardSkeleton maxWidth="sm" />
      <CardSkeleton maxWidth="md" />
      <CardSkeleton maxWidth="lg" />
    </div>
  ),
}

