import React from 'react'
import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { expect, fn, userEvent, within } from 'storybook/test'

import preview from '#.storybook/preview'

import { Button } from './Button'

const meta = preview.meta({
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef3f8_100%)] px-4 py-8 text-[var(--color-foreground)] sm:px-6 lg:px-8 dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'link',
        'destructive',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'only'],
    },
  },
})

export default meta

export const Showcase = meta.story({
  render: () => (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)]">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)] dark:shadow-[0_24px_54px_-38px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
            Button system
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Core actions for product, workspace, and destructive flows
          </h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              Variants
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              Sizes and icons
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" icon={<PlusIcon />} iconPosition="left">
                Small
              </Button>
              <Button size="md" icon={<ArrowRightIcon />} iconPosition="right">
                Medium
              </Button>
              <Button size="lg" variant="secondary" icon={<ShareIcon />}>
                Large
              </Button>
              <Button
                size="icon"
                variant="outline"
                icon={<PencilSquareIcon />}
                aria-label="Edit"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              States
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button loading>Processing</Button>
              <Button disabled variant="outline">
                Disabled
              </Button>
              <Button as="a" asProps={{ href: '#billing' }} variant="link">
                Open billing
              </Button>
              <Button variant="destructive" icon={<TrashIcon />}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-[var(--color-border)] bg-slate-950 p-5 text-slate-300 shadow-[0_28px_62px_-38px_rgba(15,23,42,0.42)] sm:p-6 dark:border-[var(--color-border)] dark:bg-[color-mix(in_srgb,var(--color-background)_92%,var(--color-muted)_8%)] dark:text-[var(--color-foreground)] dark:shadow-[0_28px_62px_-38px_rgba(0,0,0,0.5)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-[var(--color-muted-foreground)]">
          Usage guidance
        </p>
        <div className="mt-5 space-y-4 text-sm text-slate-300 dark:text-[var(--color-muted-foreground)]">
          <p>Use `primary` for the single dominant action in a block.</p>
          <p>`outline` and `ghost` should handle secondary and quiet actions.</p>
          <p>`destructive` is reserved for irreversible flows and confirmations.</p>
        </div>
      </aside>
    </div>
  ),
})

export const CommerceActionBar = meta.story({
  render: () => (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.16)] dark:shadow-[0_24px_54px_-38px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted-foreground)]">
              Catalog actions
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
              Manage a merchandising collection
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost">Discard</Button>
            <Button variant="outline" icon={<ArrowDownTrayIcon />}>
              Export CSV
            </Button>
            <Button variant="primary" icon={<PlusIcon />}>
              Add product
            </Button>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-4 dark:bg-[color-mix(in_srgb,var(--color-background)_70%,var(--color-muted)_30%)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="secondary" icon={<PencilSquareIcon />}>
                Edit details
              </Button>
              <Button size="sm" variant="outline" icon={<ShareIcon />}>
                Share preview
              </Button>
              <Button size="sm" variant="outline" icon={<ArrowDownTrayIcon />}>
                Download feed
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="destructive" icon={<TrashIcon />}>
                Delete collection
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon={<ArrowRightIcon />}
                iconPosition="right"
              >
                Publish changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /publish changes/i })
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
})
