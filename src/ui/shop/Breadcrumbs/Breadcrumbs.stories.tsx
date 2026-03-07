import React from 'react'
import preview from '#.storybook/preview'
import {
  Cog6ToothIcon,
  RectangleGroupIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumbs } from './Breadcrumbs'

const meta = preview.meta({
  title: 'Shop/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Story />
        </div>
      </div>
    ),
  ],
})

export default meta

export const ProductPageTrail = meta.story({
  render: (args) => (
    <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.18)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        Product detail
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        Storm Shell Parka
      </h2>
      <div className="mt-4">
        <Breadcrumbs {...args} />
      </div>
    </div>
  ),
  args: {
    breadcrumbs: [
      { id: 1, name: 'Women', href: '#' },
      { id: 2, name: 'Outerwear', href: '#' },
      { id: 3, name: 'Rain Jackets', href: '#' },
      { id: 4, name: 'Storm Shell Parka', href: '#' },
    ],
  },
})

export const AccountNavigation = meta.story({
  render: (args) => (
    <div className="dark">
      <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 shadow-[0_22px_54px_-36px_rgba(15,23,42,0.36)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Account workspace
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Settings navigation
        </h2>
        <div className="mt-4">
          <Breadcrumbs {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    breadcrumbs: [
      {
        id: 1,
        name: 'Account',
        href: '#',
        icon: <UserCircleIcon className="h-5 w-5" />,
      },
      {
        id: 2,
        name: 'Orders',
        href: '#',
        icon: <RectangleGroupIcon className="h-5 w-5" />,
      },
      {
        id: 3,
        name: 'Settings',
        href: '#',
        icon: <Cog6ToothIcon className="h-5 w-5" />,
      },
    ],
  },
})
