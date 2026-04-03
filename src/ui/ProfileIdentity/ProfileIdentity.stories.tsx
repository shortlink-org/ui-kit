import type React from 'react'
import preview from '#.storybook/preview'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProfileIdentity } from './ProfileIdentity'

const meta = preview.meta({
  title: 'UI/ProfileIdentity',
  component: ProfileIdentity,
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

export const Showcase = meta.story({
  args: {
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    name: 'Sara Salah',
    email: 'sara@shortlink.org',
    label: 'Workspace account',
    size: 'md',
  },
  render: (args: React.ComponentProps<typeof ProfileIdentity>) => (
    <div className="min-h-screen bg-[var(--color-background)] px-4 py-10 text-[var(--color-foreground)] sm:px-6">
      <div className="mx-auto max-w-xl space-y-5">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Profile identity
          </p>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Avatar, details and optional accessory (e.g. chevron for menus).
          </p>
        </header>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
          <div className="group w-full min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
            <ProfileIdentity
              {...args}
              accessory={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 group-hover:text-[var(--color-foreground)]"
                >
                  <ChevronRightIcon className="size-4" aria-hidden />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  ),
})
