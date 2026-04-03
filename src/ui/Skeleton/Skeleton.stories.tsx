import preview from '#.storybook/preview'
import { Skeleton } from './Skeleton'
import { CardSkeleton } from './CardSkeleton'

const meta = preview.meta({
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [375, 768, 1280] },
  },
})

export default meta

/**
 * Один экран: базовый `Skeleton`, варианты размеров и три размера `CardSkeleton`.
 */
export const Showcase = meta.story({
  render: () => (
    <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-foreground)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="max-w-2xl space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            UI / Skeleton
          </p>
          <h1 className="text-2xl font-semibold">Loading placeholders</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Pulse blocks for text and avatars, optional width/height props, and
            the composed card layout used for catalog-style surfaces.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">
            Primitives
          </h2>
          <div className="flex flex-wrap items-end gap-8">
            <div className="space-y-2">
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Line
              </p>
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Circular
              </p>
              <Skeleton circular className="size-16" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">
            Width / height props
          </h2>
          <div className="space-y-3">
            <Skeleton width={200} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={20} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">
            CardSkeleton
          </h2>
          <p className="max-w-2xl text-sm text-[var(--color-muted-foreground)]">
            Horizontal card with image rail and content rails;{' '}
            <code className="text-[0.9em]">maxWidth</code> maps to{' '}
            <code className="text-[0.9em]">sm</code> / <code>md</code> /{' '}
            <code>lg</code> (and <code>xl</code>, <code>2xl</code>,{' '}
            <code>full</code> in the component API).
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-center text-xs font-medium text-[var(--color-muted-foreground)]">
                maxWidth=&quot;sm&quot;
              </p>
              <CardSkeleton maxWidth="sm" />
            </div>
            <div className="space-y-2">
              <p className="text-center text-xs font-medium text-[var(--color-muted-foreground)]">
                maxWidth=&quot;md&quot;
              </p>
              <CardSkeleton maxWidth="md" />
            </div>
            <div className="space-y-2">
              <p className="text-center text-xs font-medium text-[var(--color-muted-foreground)]">
                maxWidth=&quot;lg&quot;
              </p>
              <CardSkeleton maxWidth="lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
})
