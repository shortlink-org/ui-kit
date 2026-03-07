import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'
import { CardSkeleton } from './CardSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.42)] backdrop-blur-xl sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Loading surfaces
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Card skeleton variants
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            Product and content placeholders should feel like part of the same
            UI system, not generic gray blocks.
          </p>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          <CardSkeleton maxWidth="sm" />
          <CardSkeleton maxWidth="md" />
          <CardSkeleton maxWidth="lg" />
        </div>
      </div>
    </div>
  ),
}
